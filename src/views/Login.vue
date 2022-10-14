<template>
    <div class="app__main">
        <div class="auth">
            <div class="container">
                <div class="auth__title h2">Укажите ваши данные для авторизации</div>
                <FormKit
                    v-model="formData"
                    type="form"
                    data-loading="showLoaderSending"
                    form-class="$reset auth__form form"
                    submit-label="Войти"
                    :disabled="showLoaderSending"
                    :loading="showLoaderSending ? true : undefined"
                    :submit-attrs="{
                        inputClass: '$reset button button-green',
                        wrapperClass: '$reset form__submit',
                        outerClass: '$reset',
                    }"
                    @submit="submitHandler"
                >
                    <div class="form__block">
                        <FormKitSchema :schema="authForm" />
                        <div class="field m--offset m--no-margin">
                            <label class="field__inner">
                                <a 
                                    href="#"
                                    @click.stop="onClickRecoveryPasswordModal"
                                >
                                    Забыли пароль?
                                </a>
                            </label>
                        </div>
                    </div>
                </FormKit>
            </div>
        </div>
        <ModalRecoveryPassword
            :showModal="showRecoveryPasswordModal"
            @hideModal="hideRecoveryPasswordModal"
        />
    </div>
</template>

<script>
    import { user as api } from "@/services";
    import ModalRecoveryPassword from '@/components/modal-recovery-password.vue'

    export default {
        components: {
            ModalRecoveryPassword
        },
        data() {
            return {
                formData: {},
                showRecoveryPasswordModal: false,
                showLoaderSending: false,
                authForm: [
                    {
                        $formkit: 'text',
                        name: 'email',
                        label: 'Ваш E-mail',
                        placeholder: 'Введите ваш e-mail',
                        validation: 'required|email',
                        outerClass: 'field--inline field--required'
                    }, {
                        $formkit: 'password',
                        name: 'password',
                        label: 'Пароль',
                        placeholder: 'Введите ваш пароль',
                        validation: 'required|length:5',
                        validationMessages: {
                            length: 'Минимальная длинна пароля 5 символов',
                        },
                        outerClass: 'field--inline field--required'
                    }
                ]
            }
        },
        mounted() {
            this.$store.dispatch('deathUser');
        },
        methods: {
            submitHandler(data, node) {
                console.log(this.formData);
                let params = this.formData;
                this.showLoaderSending = true;
                api.obtainToken(params).then(res => {
                    if (res.access && res.refresh) {
                        this.$store.dispatch('setToken', res);
                        api.getMyProfile().then(res => {
                            this.showLoaderSending = false;
                            this.$store.dispatch('setUser', res);
                            this.next();
                        }).catch(err => {
                            this.showLoaderSending = false;
                            this.$store.dispatch('showError', err);
                            console.error(err);
                        });
                    } else {
                        this.showLoaderSending = false;
                        this.$store.dispatch('showError', 'Ошибка получения токена');
                    }
                    this.next();
                }).catch(err => {
                    node.setErrors(
                        [err.detail],
                        {
                            email: '',
                            password: ''
                        }
                    )
                    this.showLoaderSending = false;
                    this.$store.dispatch('showError', err);
                    console.error(err);
                });
            },
            onClickRecoveryPasswordModal() {
                this.showRecoveryPasswordModal = true;
            },
            hideRecoveryPasswordModal() {
                this.showRecoveryPasswordModal = false;
            },
            next() {
                this.$router.push({ name: 'cabinet' });
            }
        }
    };
</script>
