<script>
    import abstractForm from '@/components/abstract-form.vue';

    const fields = [
        { name: 'inn', type: 'text', label: 'ИНН', required: true }, // mask
        { name: 'kpp', type: 'text', label: 'КПП', required: true }, // mask
        { name: 'orgn', type: 'text', label: 'ОГРН', required: true }, // mask
        { name: 'name', type: 'text', label: 'Название организации' },
        { name: 'last_name', type: 'text', label: 'ФИО руководителя организации*', required: true },
        { name: 'first_name', type: 'text', label: 'Должность  руководителя организации*', required: true },
        { name: 'patronymic', type: 'text', label: 'ФИО бухгалтера организации' },
        { name: 'birthDate', type: 'text', label: 'Юридический адрес организации', required: true },
        { name: 'birthPlace', type: 'text', label: 'Фактический адрес организации', required: true },
        { name: 'nationality', type: 'text', label: 'ОКПО', required: true },
        { name: 'phoneNum', type: 'tel', label: 'Сумма уставного капитала', required: true },
        { name: 'phoneNum', type: 'tel', label: 'Основной виде деятельности (ОКВЭД)' },
    ];

    const fieldsets = [
        { names: ['last_name', 'first_name', 'patronymic', 'gender'] },
        { names: ['birthDate', 'birthPlace', 'nationality', 'inn', 'snils'] },
        { names: ['phoneNum', 'email'] }
    ];

    const checks = {
        last_name: { required: true, name: true },
        first_name: { required: true, name: true },
        patronymic: { name: true },
        birth_date: { required: true, date: true },
        birthPlace: { required: true, name: true },
        nationality: { required: true, name: true },
        phoneNum: { required: true, tel: true },
        email: { email: true },
        inn: { number: true },
        snils: { number: true },
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
    };
</script>
