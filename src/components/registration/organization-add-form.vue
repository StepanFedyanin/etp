<script>
    import abstractForm from '@/components/abstract-form.vue';

    const fields = [
        { name: 'inn', type: 'text', label: 'ИНН', required: true }, // mask
        { name: 'kpp', type: 'text', label: 'КПП', required: true }, // mask
        { name: 'orgn', type: 'text', label: 'ОГРН', required: true }, // mask
        { name: 'name', type: 'text', label: 'Название организации', required: true },
        { name: 'head_name', type: 'text', label: 'ФИО руководителя организации', required: true },
        { name: 'head_post', type: 'text', label: 'Должность  руководителя организации', required: true },
        { name: 'accountant_name', type: 'text', label: 'ФИО бухгалтера организации' },
        { name: 'legal_address', type: 'text', label: 'Юридический адрес организации', required: true },
        { name: 'actual_address', type: 'text', label: 'Фактический адрес организации', required: true },
        { name: 'okpo', type: 'text', label: 'ОКПО', required: true },
        { name: 'capital', type: 'text', label: 'Сумма уставного капитала', required: true },
        { name: 'principal_activity', type: 'text', label: 'Основной виде деятельности (ОКВЭД)' },
    ];

    const fieldsets = [
        //{ names: ['last_name', 'first_name', 'patronymic', 'gender'] },
        //{ names: ['birthDate', 'birthPlace', 'nationality', 'inn', 'snils'] },
        //{ names: ['phoneNum', 'email'] }
    ];

    const checks = {
        inn: { required: true, number: true },
        kpp: { required: true, number: true },
        orgn: { required: true, number: true },
        okpo: { required: true, number: true },
        name: { required: true, name: true },
        head_name: { required: true, name: true },
        head_post: { required: true, name: true },
        accountant_name: { required: true, name: true },
        legal_address: { required: true, name: true },
        actual_address: { required: true, name: true },
        capital: { required: true, number: true },
        principal_activity: { required: true, name: true },
    };

    export default {
        extends: abstractForm,
        data() {
            return {
                fields,
                fieldsets,
                checks,
                inline: true
            };
        },
        computed: {},
    };
</script>
