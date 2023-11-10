<template>
    <div class="app__main">
        <div class="auth">
            <div 
                :class="['container']"
            >
                <div class="auth__block">
                    <div class="auth__tabs tabs-buttons m--50">
                        <a 
                            v-for="item in authTabs"
                            :key="`tab-${item.name}`"
                            href="#" 
                            :class="['tabs-buttons__item', item.name === $route.name ? 'is-active' : '']"
                            @click.prevent="next(item.name)"
                        >
                            {{ item.title }}
                        </a>
                    </div>
                    <FormKit
                        v-model="formData"
                        type="form"
                        data-loading="showLoaderSending"
                        form-class="$reset auth__form form"
                        submit-label="Войти"
                        :disabled="showLoaderSending"
                        :loading="showLoaderSending ? true : undefined"
                        :submit-attrs="{
                            inputClass: '$reset button button-green m--w-100',
                            wrapperClass: '$reset auth__form-submit form__submit',
                            outerClass: '$reset',
                        }"
                        @submit="submitHandler"
                    >
                        <FormKitSchema :schema="authForm" />
                    </FormKit>
                    <div class="auth__block-recovery field">
                        <label class="field__inner">
                            <a 
                                href="#"
                                class="auth__block-link"
                                @click.prevent="next('recovery')"
                            >
                                Восстановить пароль
                            </a>
                        </label>
                    </div>
                </div>
            </div>
        </div>
        <ModalPasswordRecovery
            :showModal="showRecoveryPasswordModal"
            @hideModal="hideRecoveryPasswordModal"
        />
    </div>
</template>

<script>
    import { user as api, cabinet } from "@/services";
    import ModalPasswordRecovery from '@/components/modals/password-recovery.vue'

    export default {
        components: {
            ModalPasswordRecovery
        },
        data() {
            return {
                formData: {},
                showRecoveryPasswordModal: false,
                showLoaderSending: false,
                authTabs: [
                    {
                        name: 'auth',
                        title: 'Вход'
                    }, {
                        name: 'registration',
                        title: 'Регистрация'
                    }
                ],
                authForm: [
                    {
                        $formkit: 'text',
                        name: 'email',
                        label: 'Электронная почта',
                        placeholder: 'Введите ваш e-mail',
                        validation: 'required|email',
                        outerClass: 'field--required'
                    }, {
                        $formkit: 'password',
                        name: 'password',
                        label: 'Пароль',
                        placeholder: 'Введите ваш пароль',
                        validation: 'required|length:5',
                        validationMessages: {
                            length: 'Минимальная длинна пароля 8 символов',
                        },
                        outerClass: 'field--required'
                    }
                ]
            }
        },
        computed: {
            user() {
                return this.$store.state.user;
            },
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
                        cabinet.getMyProfile().then(res => {
                            this.showLoaderSending = false;
                            this.$store.dispatch('setUser', res);
                            this.next('cabinet');
                        }).catch(err => {
                            this.showLoaderSending = false;
                            this.$store.dispatch('showError', err);
                            console.error(err);
                        });
                    } else {
                        this.showLoaderSending = false;
                        this.$store.dispatch('showError', 'Ошибка получения токена');
                    }
                    this.next('cabinet');
                }).catch(err => {
                    node.setErrors(
                        ['Не верный логин или пароль'],
                        {
                            email: '',
                            password: ''
                        }
                    )
                    this.showLoaderSending = false;
                });
            },
            onClickRecoveryPasswordModal() {
                this.showRecoveryPasswordModal = true;
            },
            hideRecoveryPasswordModal() {
                this.showRecoveryPasswordModal = false;
            },
            next(name) {
                this.$router.push({ name: name });
            }
        }
    };
</script>
