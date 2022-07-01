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
                <FormKitSchema :schema="addLotSchema" />
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
                        value: "test",
                        label: 'Название лота',
                        placeholder: "Введите название",
                        validation: 'required',
                        inputClass: 'modal-form__input',
                        labelClass: '$reset modal-form__label',
                        outerClass: '$reset modal-form__field',
                    }, {
                        $formkit: 'number',
                        name: 'quantity',
                        value: "10",
                        label: 'Количество',
                        placeholder: "Введите количество",
                        validation: 'required',
                        inputClass: 'modal-form__input',
                        labelClass: '$reset modal-form__label',
                        outerClass: '$reset modal-form__field',
                    }, {
                        $formkit: 'text',
                        name: 'unit',
                        value: "шт",
                        label: 'Единица измерения (например: кг,шт.)',
                        placeholder: "Введите единицу измерения",
                        // validation: 'required',
                        inputClass: 'modal-form__input',
                        labelClass: '$reset modal-form__label',
                        outerClass: '$reset modal-form__field',
                    }, {
                        $formkit: 'number',
                        name: 'nds',
                        value: "10",
                        label: 'Ставка НДС',
                        placeholder: "Установите НДС",
                        validation: 'required',
                        inputClass: 'modal-form__input',
                        labelClass: '$reset modal-form__label',
                        outerClass: '$reset modal-form__field',
                    }, {
                        $formkit: 'number',
                        name: 'price',
                        value: "11",
                        label: 'Цена за единицу, руб',
                        placeholder: "Введите цену за единицу",
                        validation: 'required',
                        inputClass: 'modal-form__input',
                        labelClass: '$reset modal-form__label',
                        outerClass: '$reset modal-form__field',
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
