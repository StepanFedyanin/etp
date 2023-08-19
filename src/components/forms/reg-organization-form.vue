<template>
    <FormKit
        id="form-organization"
        v-model="formValues"
        name="form-organization"
        type="form"
        data-loading="loading"
        form-class="$reset registration__form form"
        :actions="false"
        :disabled="loading"
        :loading="loading ? true : undefined"
        @submit="submitHandler"
    >
        <div class="form__block">
            <FormKitSchema 
                :schema="schema" 
            />
        </div>
        <div 
            class="form__submit" 
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
            disabled: {
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
                addressMatches: false,
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
                        outerClass: 'field--inline'
                    }, {
                        $formkit: "hidden",
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
                        outerClass: 'field--inline'
                    }, {
                        $formkit: 'text',
                        name: 'head_post',
                        disabled: true,
                        label: 'Должность руководителя организации',
                        outerClass: 'field--inline'
                    }, {
                        $formkit: 'text',
                        name: 'accountant_name',
                        disabled: this.formData.created ? false : true,
                        label: 'ФИО бухгалтера организации',
                        outerClass: 'field--inline'
                    }, {
                        $formkit: 'textarea',
                        name: 'legal_address',
                        disabled: true,
                        label: 'Юридический адрес организации',
                        outerClass: 'field--inline'
                    }, {
                        $formkit: 'textarea',
                        id: 'address',
                        name: 'actual_address',
                        //disabled: this.addressMatches,
                        disabled: !this.addressMatches && this.formData.created ? false : true,
                        label: 'Фактический адрес организации',
                        outerClass: 'field--inline',
                    }, {
                        $formkit: 'checkbox',
                        id: 'address_matches',
                        name: 'address_matches',
                        disabled: this.formData.created ? false : true,
                        label: 'Совпадает с юридическим',
                        outerClass: 'm--offset'
                    }, {
                        $formkit: "hidden",
                        name: 'city',
                        disabled: true,
                        label: 'Город',
                    }, {
                        $formkit: 'text',
                        name: 'okpo',
                        label: 'ОКПО',
                        disabled: true,
                        outerClass: 'field--inline'
                    }, {
                        $formkit: "hidden",
                        name: 'status',
                        disabled: true,
                        label: 'Статус',
                    }, {
                        $formkit: this.formData.owner_type == "ip" ? "hidden" : "text",
                        name: 'capital',
                        label: 'Сумма уставного капитала, ₽',
                        disabled: true,
                        outerClass: 'field--inline'
                    }, {
                        $formkit: 'text',
                        name: 'principal_activity',
                        disabled: true,
                        label: 'Основной вид деятельности (ОКВЭД)',
                        outerClass: 'field--inline'
                    }, {
                        $formkit: "hidden",
                        name: 'color_status',
                        disabled: true,
                        label: 'Статус цвета',
                    }, {
                        $formkit: "hidden",
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
                                name: "manufacturer",
                                disabled: this.formData.created ? false : true,
                            },{
                                $formkit: "checkbox",
                                label: "Дилер / дистрибьютор",
                                name: 'dealer',
                                disabled: this.formData.created ? false : true,
                            },{
                                $formkit: "checkbox",
                                label: "Генподрядчик",
                                name: 'gen_contractor',
                                disabled: this.formData.created ? false : true,
                            },{
                                $formkit: "checkbox",
                                label: "Подрядчик",
                                name: 'contractor',
                                disabled: this.formData.created ? false : true,
                            },
                        ],
                    }, 
                ],
            }
        },
        watch: {
            'formValues.address_matches': {
                handler() {
                    this.addressMatches = this.formValues.address_matches;
                    const node = this.$formkit.get('address');
                    node.props.disabled = this.addressMatches;
                    this.formValues.actual_address = this.formValues.legal_address;
                },
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
