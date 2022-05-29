<script>
    import abstractForm from '@/components/abstract-form.vue';

    const fields = [
        { name: 'login', type: 'email', label: 'Email (Логин)', required: true },
        { name: 'password', type: 'password', label: 'Пароль', required: true },
        { name: 'password_re', type: 'password', label: 'Повтор пароля', required: true },
        { name: 'last_name', type: 'text', label: 'Фамилия', required: true },
        { name: 'first_name', type: 'text', label: 'Имя', required: true },
        { name: 'middle_name', type: 'text', label: 'Отчество', required: true },
        { name: 'post', type: 'text', label: 'Должность', required: true },
        { name: 'email', type: 'email', label: 'Email (контактный)' },
        { name: 'phone', type: 'tel', label: 'Телефон (контактный)' },
    ];

    const fieldsets = [
        //{ names: ['last_name', 'first_name', 'patronymic', 'gender'] },
        //{ names: ['birthDate', 'birthPlace', 'nationality', 'inn', 'snils'] },
        //{ names: ['phoneNum', 'email'] }
    ];

    const checks = {
        login: { email: true },
        last_name: { required: true, name: true },
        first_name: { required: true, name: true },
        middle_name: { required: true, name: true },
        post: { required: true, name: true },
        email: { email: true },
        phone: { tel: true },
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
