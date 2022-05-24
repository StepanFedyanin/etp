<template>
    <mask-input
        :value="val"
        mask="99.99.9999"
        @change="change($event)"
    />
</template>

<script>
    // import { parseDate, formatDate } from '@/utils/helpers';
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
                type: [String, Number],
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
                this.$emit('change', this.decode(value));
            },
            encode(value) {
                if (!value || value === '0001-01-01T00:00' || value === '0001-01-01T00:00:00' || value === '0001-01-01') {
                    return '';
                }
                if (/(0[1-9]|[12]\d|3[01]).(0[1-9]|1[0-2]).([12]\d{3})/g.test(value)) {
                    return value;
                }

                value = new Date(value);
                // return formatDate(parseDate(value.toISOString(), 'isoDateTime'), 'DD.MM.YYYY');
            },
            decode(value) {
                if (!value || value === '0001-01-01T00:00' || value === '0001-01-01T00:00:00' || value === '0001-01-01') {
                    return '';
                }
                if (!/^\d{1,2}.\d{1,2}.\d{4}$/.test(value)) {
                    return '';
                }
                // return formatDate(parseDate(value, 'DD.MM.YYYY'), 'YYYY-MM-DD');
            }
        }
    };
</script>
