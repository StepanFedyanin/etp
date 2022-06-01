<template>
    <div class="app__main">
        <div class="auth">
            <div class="container">
                <div class="auth__title h2">Укажите ваши данные для авторизации</div>
                <form
                    class="auth__form form"
                    @submit.prevent="onSubmit"
                >
                    <div class="form__block">
                        <Field
                            id="login"
                            v-model="form.login"
                            type="text"
                            name="login"
                            label="Ваша имя"
                            placeholder="логин"
                            class="form__field auth__form-field"
                            :inline="true"
                            :required="true"
                        />
                        <Field
                            id="password"
                            v-model="form.password"
                            type="password"
                            name="password"
                            label="Ваша пароль"
                            placeholder="пароль"
                            class="form__field auth__form-field"
                            :inline="true"
                            :required="true"
                        />
                    </div>
                    <!--
                    <input
                        ref="input"
                        :value="value"
                        @change="change($event.target.value)"
                    >
                    -->
                    <div class="form__submit auth__form-submit">
                        <button
                            type="submit"
                            class="button button-green"
                        >
                            Войти
                        </button>
                    </div>                    
                </form>
            </div>
        </div>
    </div>
</template>

<script>
    import Field from "@/components/field";
    import InputMask from "inputmask";

    export default {
        components: {
            Field
        },
        data() {
            return {
                form: {}
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
            onSubmit() {
                this.next();
            },
            next() {
                this.$store.dispatch('setUser', { id: 1 });
                this.$router.push({ name: 'cabinet' });
            }
        }
    };
</script>
