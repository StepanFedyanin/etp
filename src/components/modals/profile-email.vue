<template>
    <vue-final-modal 
        v-model="show"
        classes="modal__container" 
        content-class="modal__block m--small"
        @click-outside="$emit('hideModal', false)"
    >
        <button 
            class="modal__close" 
            @click="$emit('hideModal', false)"
        >
            <span />
        </button>
        <span class="modal__title">Новый email аккаунта</span>
        <div class="modal__content">
            <div class="text">
                <p class="m--mb-1">
                    <strong>{{ user.full_name }}</strong>
                </p>
            </div>
            <FormKit
                v-model="formData"
                name="form-email"
                preserve
                type="form"
                data-loading="loading"
                form-class="$reset form m--width-100 m--no--comments"
                :actions="false"
                :disabled="showLoaderSending"
                :loading="showLoaderSending ? true : undefined"
                @submit="submitHandler"
            >
                <div
                    v-if="changedSended" 
                    class="text"
                >
                    <p class="m--mb-1">
                        <strong>Ваш email аккаунта изменен!</strong>
                    </p>
                </div>
                <FormKitSchema 
                    v-else
                    :schema="schema" 
                />
                <div 
                    class="form__submit" 
                    data-type="submit"
                >
                    <button
                        v-if="changedSended"
                        :disabled="showLoaderSending"
                        class="button button-green button-center"
                        @click.prevent="$emit('hideModal', false)"
                    >
                        Закрыть окно
                    </button>
                    <button
                        v-else
                        type="submit"
                        :disabled="showLoaderSending"
                        class="button button-green button-center"
                    >
                        Изменить Email
                    </button>
                </div>
            </FormKit>
        </div>
    </vue-final-modal>
</template>

<script>
    import { cabinet } from "@/services"
    export default {
        props: {
            showModal: {
                type: Boolean,
                default() { return false; }
            },
        },
        data() {
            return {
                formData: {},
                schema: [
                    {
                        $formkit: 'text',
                        name: 'email',
                        label: 'Электронная почта',
                        placeholder: "mail@domain.ru",
                        validation: 'required',
                        outerClass: 'field--required'
                    }
                ],
                showLoaderSending: false,
                changedSended: false,
            };
        },
        computed: {
            show() {
                return this.showModal;
            },
            user() {
                return this.$store.state.user;
            },
        },
        mounted() {
        },
        methods: {
            submitHandler(data, node) {
                this.showLoaderSending = true;
                let params = Object.assign({}, this.formData);
                params.id = this.user.id;
                cabinet.updateMyProfilePartial(params).then(res => {
                    cabinet.getMyProfile().then(res => {
                        this.showLoaderSending = false;
                        this.$store.dispatch('setUser', res);
                        this.changedSended = true;
                    }).catch(err => {
                        this.showLoaderSending = false;
                        this.$store.dispatch('showError', err);
                        console.error(err);
                    });
                }).catch(err => {
                    node.setErrors(
                        err.response.data
                    );
                    this.showLoaderSending = false;
                });
            },
        }
    };
</script>
