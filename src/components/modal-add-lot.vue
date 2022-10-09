<template>
    <vue-final-modal 
        v-model="show"
        classes="modal__container" 
        content-class="modal__block"
    >
        <button 
            class="modal__close" 
            @click="$emit('hideModal')"
        >
            <span />
        </button>
        <span class="modal__title">Добавить лот вручную</span>
        <div class="modal__content">
            <FormKit
                id="addLotForm"
                v-model="addLotForm"
                name="add-lot-form"
                preserve
                type="form"
                data-loading="showLoaderSending"
                form-class="$reset modal-form"
                :disabled="showLoaderSending"
                :loading="showLoaderSending ? true : undefined"
                :actions="false"
                @submit="submitAddLotForm"
            >
                <div class="modal-form__block">
                    <FormKitSchema :schema="addLotSchema" />
                </div>
                <div class="modal-form__actions">
                    <button
                        type="button"
                        class="button button-red"
                        @click="$emit('hideModal')"
                    >
                        Отменить
                    </button>
                    <button
                        type="submit"
                        class="button button-green"
                    >
                        Сохранить
                    </button>
                </div>
            </FormKit>
        </div>
    </vue-final-modal>
</template>

<script>
    export default {
        props: {
            showModal: {
                type: Boolean,
                default() { return false; }
            },
            data: {
                type: Object,
                default() { return null; }
            },
            tender: {
                type: Object,
                default() { return {}; }
            },
        },
        data() {
            return {
                addLotForm: null,
                showLoaderSending: false,
                addLotSchema: [
                    {
                        $formkit: 'hidden',
                        name: 'id',
                    }, {
                        $formkit: 'text',
                        name: 'name',
                        label: 'Название лота',
                        placeholder: "Введите название",
                        validation: 'required',
                        inputClass: 'modal-form__input',
                        labelClass: '$reset modal-form__label',
                        outerClass: '$reset modal-form__field m--width-100',
                    }, {
                        $formkit: 'number',
                        name: 'quantity',
                        label: 'Количество',
                        placeholder: "Введите количество",
                        validation: 'required',
                        inputClass: 'modal-form__input',
                        labelClass: '$reset modal-form__label',
                        outerClass: '$reset modal-form__field m--width-100',
                    }, {
                        $formkit: 'text',
                        name: 'unit',
                        label: 'Единица измерения (например: кг,шт.)',
                        placeholder: "Введите единицу измерения",
                        // validation: 'required',
                        inputClass: 'modal-form__input',
                        labelClass: '$reset modal-form__label',
                        outerClass: '$reset modal-form__field m--width-100',
                    }, {
                        $formkit: 'multiselect',
                        name: 'nds',
                        label: 'Ставка НДС',
                        placeholder: "Установите НДС",
                        validation: 'required',
                        options: [{
                            label: 'Нет НДС',
                            value: -1
                        }, {
                            label: '0%',
                            value: 0
                        }, {
                            label: '10%',
                            value: 10
                        /*
                        }, {
                            label: '18%',
                            value: 18
                        */
                        }, {
                            label: '20%',
                            value: 20
                        }],
                        inputClass: 'modal-form__input',
                        labelClass: '$reset modal-form__label',
                        outerClass: '$reset modal-form__field m--width-100',
                    }, {
                        $formkit: 'maska',
                        name: 'price',
                        maska: { mask: '#*D##', tokens: { 'D': { pattern: /\./ }}},
                        label: 'Цена за единицу, руб',
                        placeholder: "Введите цену за единицу",
                        validation: (this.tender.kind === 'tender' || (this.tender.kind === 'price_request' && !this.tender.fulfilment)) ? 'required' : null,
                        inputClass: 'modal-form__input',
                        labelClass: '$reset modal-form__label',
                        outerClass: '$reset modal-form__field m--width-100',
                    },
                ],
            };
        },
        computed: {
            show() {
                return this.showModal;
            },
        },
        watch: {
            data() {
                console.log('data')
                console.log(this.data)
                if (this.data)
                    this.addLotForm = this.data
            }
        },
        mounted() {    
        },
        methods: {
            submitAddLotForm(formData) {
                this.$emit('addLot', formData)
                this.$emit('hideModal')
                this.$formkit.reset('addLotForm')
            }
        },
    };
</script>
