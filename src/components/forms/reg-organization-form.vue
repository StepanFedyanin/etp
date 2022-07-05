<template>
    <FormKit
        v-model="formValues"
        name="form-organization"
        preserve
        type="form"
        data-loading="loading"
        form-class="$reset registration__form form"
        :actions="false"
        :disabled="loading || readonly"
        :loading="loading ? true : undefined"
        @submit="submitHandler"
    >
        <div class="form__block">
            <FormKitSchema 
                :schema="schema" 
            />
        </div>
        <div 
            class="form__submit auth__form-submit" 
            data-type="submit"
        >
            <button
                :disabled="loading"
                class="button button-red"
                @click.prevent="backHandler"
            >
                Назад
            </button>
            <button
                type="submit"
                :disabled="loading"
                class="button button-green"
            >
                Далее
            </button>
        </div> 
    </FormKit>
</template>
<script>
    export default {
        props: {
            loading: {
                type: Boolean,
                default() { return false; }
            },
            readonly: {
                type: Boolean,
                default() { return false; }
            },
            formData: {
                type: Object,
                default() { return {}; }
            },
        },
        data() {
            return {
                formValues: this.formData,
                schema: [
                    {
                        $formkit: 'text',
                        name: 'inn',
                        readonly: true,
                        label: 'ИНН',
                        placeholder: 'Ваш ИНН',
                        validation: 'required',
                        outerClass: 'field--inline field--required'
                    }, {
                        $formkit: 'text',
                        name: 'kpp',
                        readonly: true,
                        label: 'КПП',
                        placeholder: 'Ваш КПП',
                        validation: 'required',
                        outerClass: 'field--inline field--required'
                    }, {
                        $formkit: 'text',
                        name: 'ogrn',
                        label: 'ОГРН',
                        placeholder: 'ОГРН организации',
                        validation: [['required'], ['matches', /^\d{13}$/]],
                        outerClass: 'field--inline field--required'
                    }, {
                        $formkit: 'text',
                        name: 'name',
                        label: 'Название организации',
                        validation: 'required',
                        outerClass: 'field--inline field--required'
                    }, {
                        $formkit: 'text',
                        name: 'full_name',
                        label: 'Полное название организации',
                        validation: 'required',
                        outerClass: 'field--inline field--required'
                    }, {
                        $formkit: 'date',
                        name: 'date_registration',
                        label: 'Дата регистрации организации',
                        validation: 'required',
                        outerClass: 'field--inline field--required'
                    }, {
                        $formkit: 'text',
                        name: 'head_name',
                        label: 'ФИО руководителя организации',
                        validation: 'required',
                        outerClass: 'field--inline field--required'
                    }, {
                        $formkit: 'text',
                        name: 'head_post',
                        label: 'Должность руководителя организации',
                        validation: 'required',
                        outerClass: 'field--inline field--required'
                    }, {
                        $formkit: 'text',
                        name: 'accountant_name',
                        label: 'ФИО бухгалтера организации',
                        outerClass: 'field--inline'
                    }, {
                        $formkit: 'text',
                        name: 'legal_address',
                        label: 'Юридический адрес организации',
                        validation: 'required',
                        outerClass: 'field--inline field--required'
                    }, {
                        $formkit: 'text',
                        name: 'actual_address',
                        label: 'Фактический адрес организации',
                        validation: 'required',
                        outerClass: 'field--inline field--required'
                    }, {
                        $formkit: 'text',
                        name: 'okpo',
                        label: 'ОКПО',
                        validation: 'required',
                        outerClass: 'field--inline field--required'
                    }, {
                        $formkit: 'text',
                        name: 'capital',
                        label: 'Сумма уставного капитала',
                        validation: 'required|number',
                        outerClass: 'field--inline field--required'
                    }, {
                        $formkit: 'text',
                        name: 'principal_activity',
                        label: 'Основной виде деятельности (ОКВЭД)',
                        validation: 'required',
                        outerClass: 'field--inline field--required'
                    }
                ],
            }
        },
        methods: {
            backHandler(data, node) {
                this.$emit('prevStep');
            },
            submitHandler(data, node) {
                this.$emit('submitOrganizationHandler', this.formValues, node);
            },
        }
    };
</script>
