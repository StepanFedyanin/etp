<template>
    <vue-final-modal 
        v-model="show"
        classes="modal__container" 
        content-class="modal__block"
    >
        <button 
            class="modal__close" 
            @click="$emit('hideModal', updateData)"
        >
            <span />
        </button>
        <span class="modal__title">Сделать ставку</span>
        <div
            v-if="betSended"
            class="modal__content"
        >
            Ваша ставка отправлена.
        </div>
        <div 
            v-else
            class="modal__content"
        >
            <div class="offers m--no-padding m--no-background m--no-shadow m--modal">
                <div class="offers__list">
                    <div class="offers__item m--no-border">
                        <div class="offers__item-number">
                            Лот №{{ lot.num }}
                        </div>
                        <template
                            v-if="showLoaderSending"
                        >
                            <div class="modal__loader loader">
                                <div class="spinner" /> Загрузка данных
                            </div>
                        </template>
                        <template
                            v-else-if="lot"
                        >
                            <div class="offers__item-name">
                                {{ lot.name }}
                            </div>
                            <div class="offers__item-info">
                                <div class="offers__item-param">
                                    Начальная цена <span>{{ $helpers.toPrice(lot.price * lot.quantity || 0, { sign: '₽', pointer: ',' }) }}</span>
                                </div>
                                <div class="offers__item-param">
                                    Лучшая ставка 
                                    <span
                                        v-if="lot.last_price"
                                    >
                                        {{ $helpers.toPrice(lot.last_price || 0, { sign: '₽', pointer: ',' }) }}
                                    </span>
                                    <span
                                        v-else
                                    >
                                        —
                                    </span>
                                </div>
                                <div class="offers__item-param">
                                    Текущее снижение <span>{{ $helpers.toPrice((100 - 100 * (lot.last_price || (lot.price * lot.quantity)) / (lot.price * lot.quantity)), { sign: '%', pointer: ',' }) }}</span>
                                </div>
                            </div>
                            <FormKit
                                v-model="formValues"
                                name="form-offer"
                                preserve
                                type="form"
                                data-loading="loading"
                                form-class="$reset offers__item-form form"
                                :actions="false"
                                :disabled="loading"
                                :loading="loading ? true : undefined"
                                @submit="submitHandler"
                            >
                                <div class="form__block m--flex">
                                    <div class="form__block-title offers__item-form-title">
                                        Ваше предложение
                                    </div>
                                    <div class="offers__item-form-info">
                                        Минимальная ставка: <span>{{ $helpers.toPrice(lot.min_price || 0, { sign: '₽', pointer: ',' }) }}</span> (шаг цены - <span>{{ tender.min_step }} %</span>)
                                    </div>
                                    <FormKit
                                        v-if="!refreshInput"
                                        v-model="formValues.price"
                                        id="price"
                                        :maska="{ mask: '#*D##', tokens: { 'D': { pattern: /\./ }}}"
                                        :disabled="this.formValues.min_bid.length ? true : false"
                                        type="maska"
                                        name="price"
                                        label=""
                                        placeholder="Ваша ставка"
                                        :validation="`required|number|not:0|between:0,${lot.min_price}`"
                                        validation-visibility="submit"
                                        validation-label="ставка"
                                    />
                                    <FormKit
                                        v-model="formValues.min_bid"
                                        type="checkbox"
                                        name="min_bid"
                                        :options="['Минимальная ставка']"
                                        outerClass="field--inline"
                                    />
                                </div>
                                <div 
                                    class="form__submit offers__form-submit" 
                                    data-type="submit"
                                >
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
                            </FormKit>
                        </template>
                    </div>
                </div>
            </div>
        </div>
    </vue-final-modal>
</template>

<script>
    import { tender as tenderApi } from "@/services"
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
            lotId: {
                type: [Number, String],
                default() { return null; }
            },
        },
        data() {
            return {
                lot: {},
                formValues: {
                    price: null,
                    min_bid: []
                },
                refreshInput: false,
                loading: false,
                showLoaderSending: false,
                betSended: false,
                updateData: false,
            };
        },
        computed: {
            show() {
                return this.showModal;
            },
        },
        watch: {
            'formValues.min_bid': {
                immediate: true,
                handler() {
                    this.setMinBid();
                }
            }
        },
        mounted() {
            this.getLot();
        },
        methods: {
            setMinBid() {
                if (this.formValues.min_bid.length) {
                    this.formValues.price = this.lot.min_price.toFixed(2);
                }
                this.refreshInput = true;
                this.$nextTick(() => {
                    this.refreshInput = false;
                });
            },
            submitHandler(data, node) {
                this.showLoaderSending = true;
                this.loading = true;
                let params = Object.assign({}, this.formValues);
                tenderApi.addTenderLotBet(this.tender.id, this.lot.id, params).then(res => {
                    this.showLoaderSending = false;
                    this.loading = false;
                    this.betSended = true;
                    this.updateData = true;
                    console.log(res);
                }).catch(err => {
                    node.setErrors(
                        err.response.data
                    );
                    this.showLoaderSending = false;
                    this.loading = false;
                    this.$store.dispatch('showError', err);
                    console.error(err);
                });
            },
            getLot() {
                this.showLoaderSending = true;
                tenderApi.getTenderLot(this.tender.id, this.lotId).then(res => {
                    console.log(res);
                    this.lot = res;
                    this.showLoaderSending = false;
                }).catch(err => {
                    this.showLoaderSending = false;
                    this.$store.dispatch('showError', err);
                    console.error(err);
                });
            }
        }
    };
</script>
