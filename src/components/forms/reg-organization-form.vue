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
        <!-- {{ formValues }} -->
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
                        disabled: "disabled",
                        label: 'ИНН',
                        placeholder: 'Ваш ИНН',
                        validation: 'required',
                        outerClass: 'field--inline'
                    }, {
                        $formkit: this.formData.owner_type == "ip" ? "hidden" : "text",
                        // $formkit: "text",
                        name: 'kpp',
                        disabled: "disabled",
                        label: 'КПП',
                        placeholder: 'Ваш КПП',
                        outerClass: 'field--inline'
                    }, {
                        $formkit: 'text',
                        name: 'ogrn',
                        disabled: "disabled",
                        label: 'ОГРН',
                        placeholder: 'ОГРН организации',
                        // validation: [['required'], ['matches', /^\d{13}$/]],
                        // maska: { mask: '#############' },
                        outerClass: 'field--inline'
                    }, {
                        $formkit: "hidden",
                        // $formkit: "text",
                        name: 'owner_type',
                        disabled: "disabled",
                        label: 'Форма собственности',
                    }, {
                        $formkit: 'text',
                        name: 'name',
                        disabled: "disabled",
                        label: 'Название организации',
                        outerClass: 'field--inline'
                    }, {
                        $formkit: 'text',
                        name: 'full_name',
                        disabled: "disabled",
                        label: 'Полное название организации',
                        outerClass: 'field--inline'
                    }, {
                        $formkit: 'date',
                        name: 'date_registration',
                        disabled: "disabled",
                        label: 'Дата регистрации организации',
                        outerClass: 'field--inline'
                    }, {
                        $formkit: 'text',
                        name: 'head_name',
                        disabled: "disabled",
                        label: 'ФИО руководителя организации',
                        // validation: 'required',
                        outerClass: 'field--inline'
                    }, {
                        $formkit: 'text',
                        name: 'head_post',
                        disabled: "disabled",
                        label: 'Должность руководителя организации',
                        // validation: 'required',
                        outerClass: 'field--inline'
                    }, {
                        $formkit: 'text',
                        name: 'accountant_name',
                        disabled: this.formData.owner_type ? true : false,
                        label: 'ФИО бухгалтера организации',
                        outerClass: 'field--inline'
                    }, {
                        $formkit: 'text',
                        name: 'legal_address',
                        disabled: "disabled",
                        label: 'Юридический адрес организации',
                        // validation: 'required',
                        outerClass: 'field--inline'
                    }, {
                        $formkit: 'text',
                        name: 'actual_address',
                        disabled: this.formData.owner_type ? "disabled" : false,
                        label: 'Фактический адрес организации',
                        outerClass: 'field--inline'
                    }, {
                        $formkit: "hidden",
                        // $formkit: "text",
                        name: 'city',
                        disabled: "disabled",
                        label: 'Город',
                    }, {
                        $formkit: 'text',
                        name: 'okpo',
                        label: 'ОКПО',
                        disabled: "disabled",
                        // validation: 'required',
                        outerClass: 'field--inline'
                    }, {
                        $formkit: "hidden",
                        // $formkit: "text",
                        name: 'status',
                        disabled: "disabled",
                        label: 'Статус',
                    }, {
                        $formkit: this.formData.owner_type == "ip" ? "hidden" : "text",
                        // $formkit: "text",
                        name: 'capital',
                        label: 'Сумма уставного капитала',
                        disabled: "disabled",
                        // validation: 'required|number',
                        // maska: { mask: '#*' },
                        outerClass: 'field--inline'
                    }, {
                        $formkit: 'text',
                        name: 'principal_activity',
                        disabled: "disabled",
                        label: 'Основной виде деятельности (ОКВЭД)',
                        // validation: 'required',
                        outerClass: 'field--inline'
                    }, {
                        $formkit: "hidden",
                        // $formkit: "text",
                        name: 'color_status',
                        disabled: "disabled",
                        label: 'Статус цвета',
                    }, {
                        $formkit: "hidden",
                        // $formkit: "text",
                        name: 'filial',
                        disabled: "disabled",
                        label: 'Филиал',
                    }, {
                        $formkit: "hidden",
                        // $formkit: "text",
                        name: 'manufacturer',
                        disabled: "disabled",
                    }, {
                        $formkit: "hidden",
                        name: 'dealer',
                        disabled: "disabled",
                    }, {
                        $formkit: "hidden",
                        // $formkit: "text",
                        name: 'gen_contractor',
                        disabled: "disabled",
                    }, {
                        $formkit: "hidden",
                        // $formkit: "text",
                        name: 'contractor',
                        disabled: "disabled",
                    }, {
                        $formkit: "hidden",
                        // $formkit: "text",
                        name: 'id',
                        // disabled: "disabled",
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
