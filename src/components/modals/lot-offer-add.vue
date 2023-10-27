<template>
    <q-no-ssr>
        <vue-final-modal 
            v-model="show"
            class="modal__container" 
            content-class="modal__block"
            content-transition="vfm-fade"
            overlay-transition="vfm-fade"
            :clickToClose="false"
            @click-outside="$emit('hideModal', updateData)"
        >
            <button 
                class="modal__close" 
                @click="$emit('hideModal', updateData)"
            >
                <span />
            </button>
            <span class="modal__title">
                {{ tender.kind === 'tender' ? 'Сделать ставку' : lot.user_price ? 'Изменить предложение' : 'Сделать предложение' }}
            </span>
            <div
                v-if="betSended"
                class="modal__content"
            >
                {{ tender.kind === 'tender' ? 'Ваша ставка отправлена.' : 'Ваше предложение отправлено.' }}
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
                                        Начальная цена <span>{{ $helpers.toPrice(lot.price * lot.quantity || 0, { sign: tender.currency_detail, pointer: ',' }) }}</span>
                                    </div>
                                    <template
                                        v-if="tender.kind === 'tender'"
                                    >
                                        <div class="offers__item-param">
                                            Лучшая ставка 
                                            <span
                                                v-if="lot.last_price"
                                            >
                                                {{ $helpers.toPrice(lot.last_price || 0, { sign: tender.currency_detail, pointer: ',' }) }}
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
                                    </template>
                                    <template
                                        v-else
                                    >
                                        <div class="offers__item-param">
                                            Ваше предложение
                                            <span
                                                v-if="lot.user_price"
                                            >
                                                {{ $helpers.toPrice(lot.user_price || 0, { sign: tender.currency_detail, pointer: ',' }) }}
                                            </span>
                                            <span
                                                v-else
                                            >
                                                —
                                            </span>
                                        </div>
                                    </template>
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
                                        <div 
                                            class="offers__item-form-info"
                                        >
                                            <template
                                                v-if="tender.kind === 'tender'"
                                            >
                                                Минимальная ставка: <span>{{ $helpers.toPrice(lot.min_price || 0, { sign: tender.currency_detail, pointer: ',' }) }}</span> (шаг цены - <span>{{ tender.min_step }} %</span>)
                                            </template>
                                        </div>
                                        <FormKit
                                            v-if="!refreshInput"
                                            id="price"
                                            v-model="formValues.price"
                                            :maska="{ mask: '#*D##', tokens: { 'D': { pattern: /\./ }}}"
                                            :disabled="loading || formValues.min_bid.length ? true : false"
                                            type="maska"
                                            name="price"
                                            label=""
                                            placeholder="Ваша ставка"
                                            :validation="`required|number|not:0|between:0,${tender.kind === 'tender' ? lot.min_price : '999999999999'}`"
                                            validation-visibility="submit"
                                            validation-label="ставка"
                                            outerClass="m--100"
                                        />
                                        <FormKit
                                            v-if="tender.kind === 'tender'"
                                            v-model="formValues.min_bid"
                                            type="checkbox"
                                            name="min_bid"
                                            :disabled="loading"
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
                                            :disabled="loading"
                                            class="button button-red"
                                            @click="$emit('hideModal')"
                                        >
                                            Отменить
                                        </button>
                                        <button
                                            type="submit"
                                            :disabled="loading"
                                            class="button button-green"
                                            @click="submitForm"
                                        >
                                            {{ tender.kind === 'tender' ? 'Сделать ставку' : lot.user_price ? 'Изменить предложение' : 'сделать предложение' }}
                                        </button>
                                    </div>
                                </FormKit>
                            </template>
                        </div>
                    </div>
                </div>
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
                //this.showLoaderSending = true;
                this.loading = true;
                let params = Object.assign({}, this.formValues);
                tenderApi.addTenderLotBet(this.tender.id, this.lot.id, params).then(res => {
                    //this.showLoaderSending = false;
                    this.loading = false;
                    this.betSended = true;
                    this.updateData = true;
                    console.log(res);
                }).catch(err => {
                    node.setErrors(
                        err.response.data
                    );
                    //this.showLoaderSending = false;
                    this.loading = false;
                    //this.$store.dispatch('showError', err);
                    //console.error(err.response.data);
                    tenderApi.getTenderLot(this.tender.id, this.lotId).then(res => {
                        console.log(res);
                        this.lot = res;
                        this.loading = false;
                    }).catch(err => {
                        node.setErrors(
                            err.response.data
                        );
                        this.loading = false;
                    });

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
