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
        <span class="modal__title">Сделать ставку</span>
        <div class="modal__content">
            <div class="offers m--no-padding m--no-background m--no-shadow m--modal">
                <div class="offers__list">
                    <div class="offers__item">
                        <div class="offers__item-name">
                            Запчасть №1
                        </div>
                        <div class="offers__item-info">
                            <div class="offers__item-param">
                                Начальная цена <span>22 000,00 ₽</span>
                            </div>
                            <div class="offers__item-param m--color-red">
                                Текущая цена <span>17 900,00 ₽</span>
                            </div>
                            <div class="offers__item-param">
                                Текущее снижение <span>20.1 %</span>
                            </div>
                            <div class="offers__item-param">
                                Цена за ед. без НДС <span>500,00 ₽</span>
                            </div>
                            <div class="offers__item-param">
                                Цена за ед. с НДС <span>600,00 ₽</span>
                            </div>
                            <div class="offers__item-param">
                                Количество <span>50</span>
                            </div>
                        </div>
                        <div class="offers__item-form form">
                            <div class="form__block m--flex">
                                <div class="form__block-title">
                                    Ваше предложение
                                </div>
                                <FormKit
                                    v-model="formData.nums"
                                    type="text"
                                    name="nums"
                                    label=""
                                    placeholder="Количество"
                                    validation="required|number"
                                    validation-visibility="dirty"
                                    validation-label="Кол-во"
                                    @input="calcLotSum"
                                />
                                <FormKit
                                    v-model="formData.price"
                                    type="text"
                                    name="price"
                                    label=""
                                    placeholder="Цена за ед, ₽"
                                    validation="required|number"
                                    validation-visibility="dirty"
                                    validation-label="Цена"
                                    @input="calcLotSum"
                                />
                            </div>
                            <div class="form__submit">
                                <div class="offers__item-price">
                                    Стоимость лота: {{ $helpers.toPrice(formData.sum, { pointer: ',', sign: '₽' }) }}
                                </div>
                                <button
                                    type="submit"
                                    :disabled="showLoaderSending"
                                    class="button button-green m--right"
                                    @click="submitForm"
                                >
                                    Сделать ставку
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <button
                type="submit"
                :disabled="showLoaderSending"
                class="button button-outline-green"
                @click="submitForm"
            >
                Добавить еще 1 лот
            </button>
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
            tender: {
                type: Object,
                default() { return {}; }
            },
        },
        data() {
            return {
                formData: {
                    nums: 0,
                    price: 0,
                    sum: 0
                },
            };
        },
        computed: {
            show() {
                return this.showModal;
            },
        },
        methods: {
            calcLotSum(data, node) {
                console.log(this.formData);
                this.formData.sum = this.formData.nums * this.formData.price;
                console.log(node.props.errors);
            }
        }
    };
</script>
