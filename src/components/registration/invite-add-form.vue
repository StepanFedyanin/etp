<script>
    import abstractForm from '@/components/abstract-form.vue';

    const fields = [
        { name: 'person', type: 'text', label: 'ФИО', required: true },
        { name: 'email', type: 'email', label: 'Email', required: true },
    ];

    const fieldsets = [
        //{ names: ['last_name', 'first_name', 'patronymic', 'gender'] },
        //{ names: ['birthDate', 'birthPlace', 'nationality', 'inn', 'snils'] },
        //{ names: ['phoneNum', 'email'] }
    ];

    const checks = {
        person: { required: true, name: true },
        email: { required: true, email: true },
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
    };
</script>
