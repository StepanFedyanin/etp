<template>
    <input
        ref="input"
        :value="value"
        @change="change($event.target.value)"
    >
</template>

<script>
    // https://github.com/RobinHerbots/Inputmask
    // добавить alias (дата + деняк)
    import InputMask from "inputmask";

    export default {
        model: {
            prop: 'value',
            event: 'change'
        },
        props: {
            mask: {
                type: [ String, Object ],
                default: '',
            },
            value: {
                type: String,
                default: ''
            },
            maskPlaceholder: {
                type: String,
                default: '*'
            }
        },
        watch: {
            mask() {
                this.unbind();
                this.bind();
            }
        },
        mounted() {
            this.bind();
        },
        beforeDestroy() {
            this.unbind();
        },
        methods: {
            change(value) {
                this.$emit('change', value);
            },
            bind() {
                // 9 - допустимо ввести произвольный символ цифры;
                // # - допустимо ввести произвольный символ цифры или - (знак минус) или + (знак плюс) или пробел;
                // N - допустимо ввести любые алфавитно-цифровые символы (буквы или цифры);
                // U - допустимо ввести любые алфавитно-цифровые символы (буквы или цифры) и любой введенный символ преобразуется в верхний регистр;
                // h - допустим ввод символов обозначения шестнадцатеричных цифр;
                InputMask({
                    mask: this.mask,
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
