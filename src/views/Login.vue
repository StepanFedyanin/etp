<template>
    <input
        ref="input"
        :value="value"
        @change="change($event.target.value)"
    >
</template>

<script>
    import InputMask from "inputmask";

    export default {
        mounted() {
            this.bind();
        },
        beforeDestroy() {
            this.unbind();
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
            }
        }
    };
</script>
