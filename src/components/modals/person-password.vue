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
        <span class="modal__title">Новый пароль сотрудника</span>
        <div class="modal__content">
            <div class="text">
                <p class="m--mb-2">
                    <strong>{{ person.full_name }}</strong>
                </p>
            </div>
            <FormKit
                v-model="formData"
                name="form-password"
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
                    Пароль сотрудника изменен!
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
                    >
                        Закрыть окно
                    </button>
                    <button
                        v-else
                        type="submit"
                        :disabled="showLoaderSending"
                        class="button button-green button-center"
                    >
                        Изменить пароль
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
            organization: {
                type: Object,
                default() { return {}; }
            },
            person: {
                type: Object,
                default() { return {}; }
            },
        },
        data() {
            return {
                formData: {},
                schema: [
                    {
                        $formkit: 'password',
                        name: 'password',
                        label: 'Новый пароль',
                        placeholder: "Введите пароль",
                        validation: 'required|confirm',
                        outerClass: 'field--required'
                    }, {
                        $formkit: 'password',
                        name: 'password_confirm',
                        label: 'Подтверждение пароля',
                        placeholder: "Введите пароль",
                        validation: 'required|confirm',
                        outerClass: 'field--required'
                    }
                ],
                showLoaderSending: false,
                changedSended: false,
                updateData: false,
            };
        },
        computed: {
            show() {
                return this.showModal;
            },
        },
        methods: {
            submitHandler(data, node) {
                this.showLoaderSending = true;
                let params = {
                    id: this.person.id,
                    password: !this.formData.password
                };
                cabinet.updateMyOrganizationMemberPartial(params).then(res => {
                    console.log(res);
                    this.showLoaderSending = false;
                    this.$emit('hideModal', true);
                }).catch(err => {
                    console.error(err);
                    node.setErrors(
                        err.response.data
                    );
                    this.showLoaderSending = false;
                });
            }
        }
    };
</script>
