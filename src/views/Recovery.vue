<template>
    <div class="app__main">
        <div class="auth">
            <div 
                :class="['container', user?.id ? '' : 'm--1460']"
            >
                <div class="auth__block">
                    <div class="auth__tabs tabs-buttons m--50">
                        <a 
                            v-for="item in recoveryTabs"
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
                        :submit-label="passwordSended ? 'Войти' : 'Отправить новый пароль'"
                        :disabled="showLoaderSending"
                        :loading="showLoaderSending ? true : undefined"
                        :submit-attrs="{
                            inputClass: '$reset button button-green m--w-100',
                            wrapperClass: '$reset auth__form-submit form__submit',
                            outerClass: '$reset',
                        }"
                        @submit="submitHandler"
                    >
                        <div
                            v-if="passwordSended"
                            class="auth__form-content content"
                        >
                            <p>Ваш пароль изменен и отправлен на почту!</p>
                            <p>Теперь можно войти на площадку <br>с новым паролем.</p>
                        </div>
                        <template
                            v-else
                        >
                            <div class="auth__form-content content">
                                <p>Введите адрес электронной почты, указанный при регистрации.</p>
                                <p>Мы сгенерируем новый пароль и отправим на вашу почту. <br>Затем его можно сменить в личном кабинете.</p>
                            </div>
                            <FormKitSchema :schema="recoveryForm" />
                        </template>
                    </FormKit>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { user as api } from "@/services";
    //import ModalRecoveryPassword from '@/components/modal-recovery-password.vue'

    export default {
        components: {
            //ModalRecoveryPassword
        },
        data() {
            return {
                formData: {},
                passwordSended: false,
                showLoaderSending: false,
                recoveryTabs: [
                    {
                        name: 'recovery',
                        title: 'Сброс пароля'
                    }, {
                        name: 'auth',
                        title: 'Вход'
                    }
                ],
                recoveryForm: [
                    {
                        $formkit: 'text',
                        name: 'email',
                        //label: 'Электронная почта',
                        placeholder: 'Введите ваш e-mail',
                        validation: 'required|email',
                        outerClass: 'field--required'
                    }
                ]
            }
        },
        mounted() {
            this.$store.dispatch('deathUser');
        },
        methods: {
            submitHandler(data, node) {
                if (this.passwordSended) this.$router.push({ name: 'auth' })
                this.showLoaderSending = true;
                this.loading = true;
                let params = this.formData;
                console.log(params);
                api.recoveryPassword(params).then(res => {
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
            next(name) {
                this.$router.push({ name: name });
            }
        }
    };
</script>
