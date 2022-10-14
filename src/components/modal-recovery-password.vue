<template>
    <vue-final-modal 
        v-model="show"
        classes="modal__container" 
        content-class="modal__block"
        @click-outside="$emit('hideModal', updateData)"
    >
        <button 
            class="modal__close" 
            @click="$emit('hideModal', updateData)"
        >
            <span />
        </button>
        <span class="modal__title">Восстановить пароль</span>
        <div
            v-if="passwordSended"
            class="modal__content"
        >
            Новый пароль отправлен на e-mail: {{ formValues.email }}.
        </div>
        <div 
            v-else
            class="modal__content"
        >
            <div class="offers m--no-padding m--no-background m--no-shadow m--modal">
                <div class="offers__list">
                    <FormKit
                        v-model="formValues"
                        preserve
                        type="form"
                        data-loading="loading"
                        form-class="$reset auth__form form"
                        :actions="false"
                        :disabled="loading"
                        :loading="loading ? true : undefined"
                        @submit="submitHandler"
                    >
                        <div class="auth__form-block">
                            <FormKitSchema 
                                :schema="passwordSchema" 
                            />
                        </div>
                        <div 
                            class="auth__form-submit m--recovery" 
                            data-type="submit"
                        >
                            <button
                                type="submit"
                                :disabled="showLoaderSending"
                                class="button button-green"
                            >
                                Отправить
                            </button>
                        </div>
                    </FormKit>
                </div>
            </div>
        </div>
    </vue-final-modal>
</template>

<script>
    import { user as userApi } from "@/services"
    export default {
        props: {
            showModal: {
                type: Boolean,
                default() { return false; }
            },
        },
        data() {
            return {
                formValues: {},
                loading: false,
                showLoaderSending: false,
                passwordSended: false,
                passwordSchema: [
                    {
                        $formkit: 'text',
                        name: 'email',
                        label: 'Ваш E-mail',
                        placeholder: 'Выберите нового победителя',
                        validation: 'required',
                    }
                ]
            };
        },
        computed: {
            show() {
                return this.showModal;
            },
        },
        mounted() {
            this.formValues = {};
            this.passwordSended = false;
        },
        methods: {
            submitHandler(data, node) {
                this.showLoaderSending = true;
                this.loading = true;
                let params = this.formValues;
                console.log(params);
                userApi.recoveryPassword(params).then(res => {
                    this.showLoaderSending = false;
                    this.loading = false;
                    this.passwordSended = true;
                    console.log(res);
                }).catch(err => {
                    node.setErrors(
                        {
                            email: err.detail,
                        }
                    );
                    this.showLoaderSending = false;
                    this.loading = false;
                    //this.$store.dispatch('showError', err);
                    console.error(err);
                });
            },
        }
    };
</script>
