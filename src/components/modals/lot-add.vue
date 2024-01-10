<template>
    <q-no-ssr>
        <vue-final-modal 
            v-model="show"
            class="modal__container" 
            content-class="modal__block"
            content-transition="vfm-fade"
            overlay-transition="vfm-fade"
            :clickToClose="false"
            @click-outside="$emit('hideModal')"
        >
            <button 
                class="modal__close" 
                @click="$emit('hideModal')"
            >
                <span />
            </button>
            <span class="modal__title">Добавить лот вручную</span>
            <div class="modal__content">
                <template
                    v-if="showLoaderSending"
                >
                    <div class="tenders__loader loader">
                        <div class="spinner" /> Загрузка данных
                    </div>
                </template>
                <template
                    v-else
                >
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
                            <FormKitSchema 
                                :schema="addLotSchema" 
                            />
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
                </template>
            </div>
        </vue-final-modal>
    </q-no-ssr>
</template>

<script>
    import { tender as tenderApi } from "@/services"
    export default {
        props: {
            showModal: {
                type: Boolean,
                default() { return false; }
            },
            lotId: {
                type: [Number, String],
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
                        maska: { mask: '0.99', tokens: '0:\\d:multiple|9:\\d:optional' },
                        label: `Цена за единицу, ${this.tender.currency_detail}`,
                        placeholder: "Введите цену за единицу",
                        validation: (this.tender.kind === 'tender') ? 'required' : null,
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
            /*
            lotId() {
                console.log('lotId')
                console.log(this.lotId)
                //this.addLotForm = this.data || {}
                if (this.lotId) {
                    this.addLotForm.nds = {
                        fromParent: true,
                        value: this.addLotForm.nds
                    }
                } else {
                    this.addLotForm.nds = {
                        fromParent: true,
                        value: null
                    }
                }
            }
            */
        },
        mounted() {
            if (this.lotId) {
                this.getLot();
            }
        },
        methods: {
            getLot() {
                this.showLoaderSending = true;
                tenderApi.getTenderLot(this.tender.id, this.lotId).then(res => {
                    console.log(res);
                    this.addLotForm = res;
                    if (this.lotId) {
                        this.addLotForm.nds = {
                            fromParent: true,
                            value: this.addLotForm.nds
                        }
                    } else {
                        this.addLotForm.nds = {
                            fromParent: true,
                            value: null
                        }
                    }
                    this.showLoaderSending = false;
                }).catch(err => {
                    this.showLoaderSending = false;
                    this.$store.dispatch('showError', err);
                    console.error(err);
                });
            },
            submitAddLotForm(formData) {
                this.$emit('addLot', formData)
                this.$emit('hideModal')
                this.$formkit.reset('addLotForm')
            }
        },
    };
</script>
