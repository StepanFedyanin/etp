<template>
    <mask-input
        :value="val"
        mask="+7 999 999 99 99"
        @change="change($event)"
    />
</template>

<script>
    import maskInput from './mask-input.vue';

    export default {
        components: {
            maskInput
        },
        model: {
            prop: 'value',
            event: 'change'
        },
        props: {
            value: {
                type: String,
                default: ''
            }
        },
        data() {
            return {
                val: this.encode(this.value)
            };
        },
        watch: {
            value(value) {
                this.val = this.encode(value);
            }
        },
        methods: {
            change(value) {
                this.$emit('change', value);
            },
            encode(value) {
                if (/^[+]*[(]?[0-9]{1,3}[)]?[-\s./0-9]*$/g.test(value)) {
                    return value.replace(/(\d)(\d{1,3})(\d{1,3})(\d{1,2})(\d{1,2})/g, '+$1 $2 $3 $4 $5');
                }
                return value;
            },
            decode(value) {
                if (/^[+]*[(]?[0-9]{1,3}[)]?[-\s./0-9]*$/g.test(value)) {
                    return value.replace(/[^\d]+/g, '');
                }
                return value;
            }
        }
    };
</script>
