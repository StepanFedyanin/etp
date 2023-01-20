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
        <span class="modal__title">Сменить победителя</span>
        <div
            v-if="betSended"
            class="modal__content"
        >
            Ставка победителя изменена.
        </div>
        <div 
            v-else
            class="modal__content"
        >
            <div class="offers m--no-padding m--no-background m--no-shadow m--modal">
                <div class="offers__list">
                    <div 
                        v-if="lot.winner_bet"
                        class="offers__item m--no-border"
                    >
                        <div class="offers__item-title">
                            Текущий победитель
                        </div>
                        <div 
                            v-if="lot.winner_bet && lot.winner_bet.organization"
                            class="offers__item-winner"
                        >
                            <div class="offers__item-winner-block">
                                <div class="offers__item-param m--winner">
                                    <span>{{ lot.winner_bet.organization.name }}</span>
                                </div>
                                <div class="offers__item-param m--winner">
                                    <span>ИНН:</span> {{ lot.winner_bet.organization.inn }}
                                </div>
                                <div class="offers__item-param m--winner">
                                    <span>КПП:</span> {{ lot.winner_bet.organization.kpp }}
                                </div>
                            </div>
                            <div class="offers__item-winner-block">
                                <div class="offers__item-param m--winner">
                                    <span>Менеджер:</span> {{ lot.winner_bet.user.full_name }}
                                </div>
                                <div class="offers__item-param m--winner">
                                    <span>Телефон:</span> {{ lot.winner_bet.user.phone }}
                                </div>
                                <div class="offers__item-param m--winner">
                                    <span>Email:</span> {{ lot.winner_bet.user.email }}
                                </div>
                            </div>
                        </div>
                        <div
                            v-else
                            class="offers__item-winner"
                        >
                            —
                        </div>
                        <div class="offers__item-title">
                            Текущая ставка
                        </div>
                        <div class="offers__item-winner">
                            <div class="offers__item-winner-block m--width-100">
                                <div class="offers__item-param m--winner">
                                    <span>Лот:</span> {{ lot.name }}
                                </div>
                                <div class="offers__item-param m--winner">
                                    <span>Начальная цена:</span> {{ $helpers.toPrice(lot.price * lot.quantity || 0, { sign: tender.currency_detail, pointer: ',' }) }}
                                </div>
                                <div 
                                    v-if="lot.winner_bet && lot.winner_bet.price"
                                    class="offers__item-param m--winner"
                                >
                                    <span>Ставка текущего победителя:</span> {{ $helpers.toPrice(lot.winner_bet.price || 0, { sign: tender.currency_detail, pointer: ',' }) }}
                                </div>
                                <div 
                                    v-else
                                    class="offers__item-param m--winner"
                                >
                                    <span>Ставка текущего победителя:</span> —
                                </div>
                            </div>
                        </div>
                        <FormKit
                            v-if="show"
                            :id="`form-offer-${lot.id}`"
                            v-model="formValues"
                            preserve
                            type="form"
                            data-loading="loading"
                            form-class="$reset offers__item-form form"
                            :actions="false"
                            :disabled="loading"
                            :loading="loading ? true : undefined"
                            @submit="submitHandler"
                        >
                            <div class="offers__item-form-block">
                                <FormKitSchema 
                                    :schema="winnerSchema" 
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
                                    @click="$emit('hideModal', updateData)"
                                >
                                    Отменить
                                </button>
                                <button
                                    type="submit"
                                    :disabled="showLoaderSending"
                                    class="button button-green"
                                    @click="submitForm"
                                >
                                    Сменить победителя
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
                formValues: {},
                loading: false,
                showLoaderSending: false,
                betSended: false,
                updateData: false,
                //bets: [],
                winnerSchema: [
                    {
                        $formkit: 'multiselect',
                        id: `bet-${this.lot.id}`,
                        //mode: 'single',
                        name: 'bet',
                        label: 'Новый победитель',
                        searchable: true,
                        bet: true,
                        minChars: 1,
                        placeholder: 'Выберите нового победителя',
                        validation: 'required',
                        options: async () => {
                            return await tenderApi.getTenderLotUsers(this.tender.id, this.lot.id).then(res => {
                                console.log(res);
                                return res.map((bet) => {
                                    return { label: bet.organization.name, price: bet.price, currency_detail: this.tender.currency_detail, value: { bet: bet.id, winner: bet.user.id } }
                                });
                            }).catch(err => {
                                console.error(err);
                                return [];
                            });
                        },
                        labelClass: 'offers__item-title',
                    }, {
                        $formkit: 'textarea',
                        name: 'comment',
                        label: 'Комментарий',
                        placeholder: 'Укажите причину смены победителя',
                        labelClass: 'offers__item-title',
                    }
                ]
            };
        },
        computed: {
            show() {
                return this.showModal;
            },
        },
        /*
        watch: {
            'lot': {
                immediate: true,
                handler() {
                    this.formValues = {};
                }
            }
        },
        */
        mounted() {
            this.formValues = {};
        },
        methods: {
            submitHandler(data, node) {
                this.showLoaderSending = true;
                this.loading = true;
                let params = this.formValues.bet;
                params.comment = this.formValues.comment;
                console.log(params);
                tenderApi.changeTenderLotWinner(this.tender.id, this.lot.id, params).then(res => {
                    this.showLoaderSending = false;
                    this.loading = false;
                    this.betSended = true;
                    this.updateData = true;
                    console.log(res);
                    this.$formkit.reset(`form-offer-${this.lot.id}`);
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
