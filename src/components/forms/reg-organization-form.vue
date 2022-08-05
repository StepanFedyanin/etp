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
        <!-- {{ readonly }} -->
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
    import { createNode } from '@formkit/core'
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
                        disabled: true,
                        label: 'ИНН',
                        placeholder: 'Ваш ИНН',
                        validation: 'required',
                        outerClass: 'field--inline'
                    }, {
                        $formkit: this.formData.owner_type == "ip" ? "hidden" : "text",
                        // $formkit: "text",
                        name: 'kpp',
                        disabled: true,
                        label: 'КПП',
                        placeholder: 'Ваш КПП',
                        outerClass: 'field--inline'
                    }, {
                        $formkit: 'text',
                        name: 'ogrn',
                        disabled: true,
                        label: 'ОГРН',
                        placeholder: 'ОГРН организации',
                        // validation: [['required'], ['matches', /^\d{13}$/]],
                        // maska: { mask: '#############' },
                        outerClass: 'field--inline'
                    }, {
                        $formkit: "hidden",
                        // $formkit: "text",
                        name: 'owner_type',
                        disabled: true,
                        label: 'Форма собственности',
                    }, {
                        $formkit: 'text',
                        name: 'name',
                        disabled: true,
                        label: 'Название организации',
                        outerClass: 'field--inline'
                    }, {
                        $formkit: 'text',
                        name: 'full_name',
                        disabled: true,
                        label: 'Полное название организации',
                        outerClass: 'field--inline'
                    }, {
                        $formkit: 'date',
                        name: 'date_registration',
                        disabled: true,
                        label: 'Дата регистрации организации',
                        outerClass: 'field--inline'
                    }, {
                        $formkit: 'text',
                        name: 'head_name',
                        disabled: true,
                        label: 'ФИО руководителя организации',
                        // validation: 'required',
                        outerClass: 'field--inline'
                    }, {
                        $formkit: 'text',
                        name: 'head_post',
                        disabled: true,
                        label: 'Должность руководителя организации',
                        // validation: 'required',
                        outerClass: 'field--inline'
                    }, {
                        $formkit: 'text',
                        name: 'accountant_name',
                        disabled: this.formData.created ? true : false,
                        label: 'ФИО бухгалтера организации',
                        outerClass: 'field--inline'
                    }, {
                        $formkit: 'text',
                        name: 'legal_address',
                        disabled: true,
                        label: 'Юридический адрес организации',
                        // validation: 'required',
                        outerClass: 'field--inline'
                    }, {
                        $formkit: 'text',
                        name: 'actual_address',
                        disabled: this.formData.created ? true : false,
                        label: 'Фактический адрес организации',
                        outerClass: 'field--inline'
                    }, {
                        $formkit: "hidden",
                        // $formkit: "text",
                        name: 'city',
                        disabled: true,
                        label: 'Город',
                    }, {
                        $formkit: 'text',
                        name: 'okpo',
                        label: 'ОКПО',
                        disabled: true,
                        // validation: 'required',
                        outerClass: 'field--inline'
                    }, {
                        $formkit: "hidden",
                        // $formkit: "text",
                        name: 'status',
                        disabled: true,
                        label: 'Статус',
                    }, {
                        $formkit: this.formData.owner_type == "ip" ? "hidden" : "text",
                        // $formkit: "text",
                        name: 'capital',
                        label: 'Сумма уставного капитала',
                        disabled: true,
                        // validation: 'required|number',
                        // maska: { mask: '#*' },
                        outerClass: 'field--inline'
                    }, {
                        $formkit: 'text',
                        name: 'principal_activity',
                        disabled: true,
                        label: 'Основной виде деятельности (ОКВЭД)',
                        // validation: 'required',
                        outerClass: 'field--inline'
                    }, {
                        $formkit: "hidden",
                        // $formkit: "text",
                        name: 'color_status',
                        disabled: true,
                        label: 'Статус цвета',
                    }, {
                        $formkit: "hidden",
                        // $formkit: "text",
                        name: 'filial',
                        disabled: true,
                        label: 'Филиал',
                    }, {
                        $formkit: "hidden",
                        name: 'id',
                        disabled: true,
                    }, {         
                        $el: 'div',
                        children: 'Статус предприятия*',
                        attrs: {
                            class: 'registration__title h2'
                        },
                    }, {
                        $el: 'div',
                        attrs: {
                            class: 'registration__type-organization'
                        },
                        children: [
                            {
                                $formkit: "checkbox",
                                label: "Производитель",
                                disabled: this.formData.created ? true : false,
                            },{
                                $formkit: "checkbox",
                                label: "Дилер / дистрибьютор",
                                name: 'dealer',
                                disabled: this.formData.created ? true : false,
                            },{
                                $formkit: "checkbox",
                                label: "Генподрядчик",
                                name: 'gen_contractor',
                                disabled: this.formData.created ? true : false,
                            },{
                                $formkit: "checkbox",
                                label: "Подрядчик",
                                name: 'contractor',
                                disabled: this.formData.created ? true : false,
                            },
                        ],
                    }, 
                    // {
                    //     $formkit: "checkbox",
                    //     label: "Производитель",
                    //     name: 'manufacturer',
                    //     outer: "dwd",
                    //     disabled: this.formData.created ? true : false,
                    //     attrs: {
                    //         class: 'registration__checkbox',
                    //     },
                    // }, {
                    //     $formkit: "checkbox",
                    //     label: "Дилер / дистрибьютор",
                    //     name: 'dealer',
                    //     disabled: this.formData.created ? true : false,
                    // }, {
                    //     $formkit: "checkbox",
                    //     label: "Генподрядчик",
                    //     name: 'gen_contractor',
                    //     disabled: this.formData.created ? true : false,
                    // }, {
                    //     $formkit: "checkbox",
                    //     label: "Подрядчик",
                    //     name: 'contractor',
                    //     disabled: this.formData.created ? true : false,
                    // },
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
