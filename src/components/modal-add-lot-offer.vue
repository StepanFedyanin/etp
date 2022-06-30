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
            <span/>
        </button>
        <span class="modal__title">Сделать ставку</span>
        <div class="modal__content">
            <div class="offers m--no-padding m--no-background m--no-shadow m--modal">
                <div class="offers__list">
                    <div class="offers__item">
                        <div class="offers__item-number">
                            Лот №1
                        </div>
                        <div class="offers__item-name">
                            Длинное название запчасти на автомобиль КамАЗ, УАЗ, ЗИЛ, Газель, удлинненное название лота, состоящее из большого числа символов, но все символы помещаются
                        </div>
                        <div class="offers__item-info">
                            <div class="offers__item-param">
                                Начальная цена <span>22 000,00 ₽</span>
                            </div>
                            <div class="offers__item-param">
                                Лучшая ставка <span>17 900,00 ₽</span>
                            </div>
                            <div class="offers__item-param">
                                Текущее снижение <span>20.1 %</span>
                            </div>
                        </div>
                        <div class="offers__item-form form">
                            <div class="form__block m--flex">
                                <div class="form__block-title offers__item-form-title">
                                    Ваше предложение
                                </div>
                                <div class="offers__item-form-info">
                                    Минимальная ставка: <span>17 774,7 ₽</span> (шаг цены - <span>0,7 %</span>)
                                </div>
                                <FormKit
                                    v-model="formData.price"
                                    type="text"
                                    name="price"
                                    label=""
                                    placeholder="Ваша ставка"
                                    validation="required|number"
                                    validation-visibility="dirty"
                                    validation-label="ставка"
                                    @input="calcLotSum"
                                />
                                <FormKit
                                    v-model="formData.min_bid"
                                    type="checkbox"
                                    name="min_bid"
                                    label=""
                                    :options="{'1': 'Минимальная ставка'}"
                                    outerClass="field--inline"
                                    @change="calcLotSum"
                                />
                            </div>
                            <div class="form__submit">
                                <button
                                    type="reset"
                                    :disabled="showLoaderSending"
                                    class="button button-red"
                                    @click="$emit('hideModal')"
                                >
                                    Отменить
                                </button>
                                <button
                                    type="submit"
                                    :disabled="showLoaderSending"
                                    class="button button-green"
                                    @click="submitForm"
                                >
                                    Сделать ставку
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
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
        computed: {
            show() {
                return this.showModal;
            },
        },
        data() {
            return {
                formData: {
                    nums: 0,
                    price: 0,
                    sum: 0
                },
                showLoaderSending: false
            };
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
