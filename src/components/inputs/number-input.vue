<template>
    <mask-input
        :value="val"
        :mask="mask"
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
                type: [ Number, String ],
                default: undefined
            },
            precision: {
                type: Number,
                default: 0
            }
        },
        data() {
            return {
                val: this.encode(this.value)
            };
        },
        computed: {
            mask() {
                if (this.precision === undefined) {
                    return '';
                }
                let mask = '9{1,}';
                if (this.precision) {
                    mask += '.|,' + '9'.repeat(this.precision);
                }
                return mask;
            }
        },
        watch: {
            value(value) {
                this.val = this.encode(value);
            }
        },
        methods: {
            change(value) {
                this.$emit('change', this.decode(value));
            },
            encode(value) {
                if (value === undefined || value === '') {
                    return '';
                }
                let val = parseFloat(value);
                if (this.precision !== undefined) {
                    return val.toFixed(this.precision);
                }
                return val.toString();
            },
            decode(value) {
                if (value === '') {
                    return '';
                }
                value = value.toString().replace(/,/g, '.');
                value = value.toString().replace(/_/g, '0');
                value = value.toString().replace(/[^0-9.]/g, '');
                value = parseFloat(value);
                if (this.precision) {
                    const c = Math.pow(10, this.precision)
                    value = Math.round(value * c) / c;
                }
                return value;
            }
        }
    };
</script>
