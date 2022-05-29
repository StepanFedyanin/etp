<script>
    import abstractForm from '@/components/abstract-form.vue';

    const fields = [
        { name: 'inn', type: 'number', label: 'ИНН', required: true }, // mask
        { name: 'kpp', type: 'number', label: 'КПП', required: true }, // mask
    ];

    const fieldsets = [
        { names: ['inn', 'kpp'] },
    ];

    const checks = {
        inn: { number: true, name: true },
        kpp: { number: true, name: true },
    };

    export default {
        extends: abstractForm,
        props: {
            verify: {
                type: [Boolean, Number],
                default: undefined
            }
        },
        data() {
            return {
                fields,
                fieldsets,
                checks,
                inline: true
            };
        },
        computed: {
            verified() {
                if (this.verify !== undefined) {
                    return this.verify;
                }
                return this.values.verified;
            },
            control() {
                if (this.verified === false) {
                    return {
                        event: 'verify',
                        color: 'fianit',
                        label: 'Подтвердить'                        
                    };
                }
                return {};
            }
        },
    }
</script>