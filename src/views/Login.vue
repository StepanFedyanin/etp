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
                        <!--
                        <FormKit
                            type="text"
                            name="email"
                            label="Ваш E-mail"
                            placeholder="jane@example.com"
                            validation="required|email"
                            outerClass="field--inline"
                        />
                        <FormKit
                            type="password"
                            name="password"
                            label="Пароль"
                            validation="required|length:5"
                            :validation-messages="{
                                length: 'Минимальная длинна пароля 5 символов',
                            }"
                            placeholder="Введите пароль"
                            outerClass="field--inline"
                        />
                        -->
                    </div>
                </FormKit>
            </div>
        </div>
    </div>
</template>

<script>
    import { user as api } from "@/services";
    //import { TextField, EmailField } from '@asigloo/vue-dynamic-forms';
    //import Field from "@/components/field";
    import InputMask from "inputmask";

    export default {
        components: {
            //Field
        },
        data() {
            return {
                formData: {},
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
            this.bind();
        },
        beforeDestroy() {
            this.unbind();
        },
        created() {
            this.$store.dispatch('deathUser');
        },
        methods: {
            change(value) {
                console.log(value);
            },
            bind() {
                // 9 - допустимо ввести произвольный символ цифры;
                // # - допустимо ввести произвольный символ цифры или - (знак минус) или + (знак плюс) или пробел;
                // N - допустимо ввести любые алфавитно-цифровые символы (буквы или цифры);
                // U - допустимо ввести любые алфавитно-цифровые символы (буквы или цифры) и любой введенный символ преобразуется в верхний регистр;
                // h - допустим ввод символов обозначения шестнадцатеричных цифр;
                // currency,
                InputMask({
                    mask: '99.99.9999',
                    alias: 'datetime',
                    inputFormat: 'dd.mm.yyyy',
                    placeholder: this.maskPlaceholder,
                    showMaskOnFocus: false,  // default = true
                    showMaskOnHover: false,  // default = true
                    definitions: {
                        '#': {
                            validator: "[0-9 \\-+]",
                            definitionSymbol: "*"
                        },
                        'N': {
                            validator: "[A-Za-z\u0410-\u044F\u0401\u04510-9]",
                            definitionSymbol: "*"
                        },
                        'U': {
                            validator: "[A-Za-z\u0410-\u044F\u0401\u04510-9]",
                            casing: "upper"
                        },
                        'h': {
                            validator: "[A-Fa-f0-9]",
                            definitionSymbol: "*"
                        }
                    }
                }).mask(this.$refs.input);
            },
            unbind() {
                InputMask.remove([this.$refs.input]);
            },
            submitHandler(data, node) {
                console.log(this.formData);
                let params = this.formData;
                this.showLoaderSending = true;
                api.obtainToken(params).then(res => {
                    console.log(res);
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
            next() {
                this.$router.push({ name: 'cabinet' });
            }
        }
    };
</script>
