<template>
    <vue-final-modal 
        v-model="show"
        classes="modal__container" 
        content-class="modal__block"
        @click-outside="$emit('hideModal', updateData)"
    >
        <button 
            class="modal__close" 
            @click="$emit('hideModal', updateData)"
        >
            <span />
        </button>
        <span class="modal__title">
            {{ tender.kind === 'tender' ? 'Отмена ставки' : 'Отмена предложения' }}
        </span>
        <div 
            class="modal__content"
        >
            <div class="offers m--no-padding m--no-background m--no-shadow m--modal">
                <div class="offers__list">
                    <div class="offers__item m--no-border">
                        <div class="offers__item-number">
                            Лот №{{ lot.num }}
                        </div>
                        <div class="offers__item-name">
                            {{ lot.name }}
                        </div>
                        <div class="offers__item-info">
                            <div class="offers__item-param">
                                Начальная цена <span>{{ $helpers.toPrice(lot.price * lot.quantity || 0, { sign: '₽', pointer: ',' }) }}</span>
                            </div>
                            <template
                                v-if="tender.kind === 'tender'"
                            >
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
                            </template>
                            <template
                                v-else
                            >
                                <div class="offers__item-param">
                                    Ваше предложение
                                    <span
                                        v-if="lot.user_price"
                                    >
                                        {{ $helpers.toPrice(lot.user_price || 0, { sign: '₽', pointer: ',' }) }}
                                    </span>
                                    <span
                                        v-else
                                    >
                                        —
                                    </span>
                                </div>
                            </template>
                        </div>
                        <div
                            v-if="betSended"
                            class="offers__item-form form"
                        >
                            <div class="form__block m--flex">
                                <div 
                                    v-if="tender.kind === 'tender'"
                                    class="form__block-title m--center m--with-icon"
                                >
                                    <span class="m--ok">Ваша ставка успешно отменена!</span>
                                </div>
                                <div 
                                    v-else
                                    class="form__block-title m--center m--with-icon"
                                >
                                    <span class="m--ok">Ваше предложение отменено!</span>
                                </div>
                            </div>
                            <div 
                                class="form__submit offers__form-submit" 
                                data-type="submit"
                            >
                                <button
                                    type="submit"
                                    :disabled="showLoaderSending"
                                    class="button button-green"
                                    @click="$emit('hideModal', updateData)"
                                >
                                    Закрыть
                                </button>
                            </div>
                        </div>
                        <FormKit
                            v-else
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
                                <div 
                                    v-if="tender.kind === 'tender'"
                                    class="form__block-title m--center"
                                >
                                    Вы действительно хотите отменить последнюю ставку?
                                </div>
                                <div 
                                    v-else
                                    class="form__block-title m--center"
                                >
                                    Вы действительно хотите отменить предложение?
                                </div>
                            </div>
                            <div 
                                class="form__submit offers__form-submit" 
                                data-type="submit"
                            >
                                <button
                                    type="submit"
                                    :disabled="showLoaderSending"
                                    class="button button-green"
                                    @click="submitForm"
                                >
                                    Подтвердить
                                </button>
                            </div>
                        </FormKit>
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
            lot: {
                type: Object,
                default() { return {}; }
            },
        },
        data() {
            return {
                formValues: {
                    price: null,
                    min_bid: null
                },
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
        methods: {
            submitHandler(data, node) {
                this.showLoaderSending = true;
                this.loading = true;
                let params = {};
                console.log(params);
                tenderApi.cancelTenderLotBet(this.tender.id, this.lot.id, params).then(res => {
                    this.showLoaderSending = false;
                    this.loading = false;
                    this.betSended = true;
                    this.updateData = true;
                    console.log(res);
                }).catch(err => {
                    node.setErrors(
                        [err.detail],
                    );
                    this.showLoaderSending = false;
                    this.loading = false;
                    this.$store.dispatch('showError', err);
                    console.error(err);
                });
            }
        }
    };
</script>
