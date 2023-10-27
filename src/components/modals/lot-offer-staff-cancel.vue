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
                {{ !betSended ? 'Отменить ставку' : successSended ? 'Ставка была отменена' : 'Ставка не была отменена' }}
            </span>
            <div 
                class="modal__content"
            >
                <div class="offers m--no-padding m--no-background m--no-shadow m--modal">
                    <div class="offers__list">
                        <div class="offers__item">
                            <div class="offers__item-param m--block">
                                <span>Лот:</span> {{ lot.name }}
                            </div>
                            <div class="offers__item-param m--block">
                                <span>Текущий победитель:</span> {{ lot.last_bet.organization.name }}
                            </div>
                            <div class="offers__item-param m--block">
                                <span>Предложение текущего победителя:</span> {{ $helpers.toPrice(lot.last_bet.price, { sign: tender.currency_detail, pointer: ',' }) }}
                            </div>
                        </div>
                        <div
                            v-if="betSended"
                            class="form"
                        >
                            <div class="form__block m--flex">
                                <div 
                                    v-if="successSended"
                                    class="form__block-info"
                                >
                                    Ставка участника была отменена. Предварительным победителем теперь считается участник, совершивший предыдущую ставку.
                                </div>
                                <div 
                                    v-else
                                    class="form__block-info"
                                >
                                    Один из участников совершил новую ставку.<br>Чтобы отменить данную ставку, закройте это окно и совершите отмену повторно.
                                </div>
                            </div>
                            <div 
                                class="form__submit offers__form-submit" 
                                data-type="submit"
                            >
                                <button
                                    type="submit"
                                    :disabled="showLoaderSending"
                                    class="button button-width-auto"
                                    :class="successSended ? 'button-green' : 'button-red'"
                                    @click.prevent="$emit('hideModal', updateData)"
                                >
                                    Закрыть окно
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
                            form-class="$reset form"
                            :actions="false"
                            :disabled="loading"
                            :loading="loading ? true : undefined"
                            @submit="submitHandler"
                        >
                            <div class="form__block m--flex">
                                <div 
                                    class="form__block-info"
                                >
                                    Вы действительно хотите отменить ставку?<br>Это может существенно повлиять на ход тендера.
                                </div>
                            </div>
                            <div 
                                class="form__submit" 
                                data-type="submit"
                            >
                                <button
                                    type="submit"
                                    :disabled="showLoaderSending"
                                    class="button button-red button-width-auto"
                                    @click="submitForm"
                                >
                                    Отменить ставку
                                </button>
                                <button
                                    :disabled="showLoaderSending"
                                    class="button button-green button-width-auto"
                                    @click.prevent="$emit('hideModal', updateData)"
                                >
                                    Закрыть окно
                                </button>
                            </div>
                        </FormKit>
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
                successSended: true,
                updateData: false,
            };
        },
        computed: {
            show() {
                return this.showModal;
            },
        },
        methods: {
            submitHandler() {
                this.showLoaderSending = true;
                this.loading = true;
                let params = {};
                console.log(params);
                tenderApi.cancelTenderLotBetByStaff(this.tender.id, this.lot.id, this.lot.last_bet.id, params).then(res => {
                    this.showLoaderSending = false;
                    this.loading = false;
                    this.betSended = true;
                    this.updateData = true;
                    console.log(res);
                }).catch(err => {
                    this.showLoaderSending = false;
                    this.loading = false;
                    this.betSended = true;
                    this.updateData = true;
                    this.successSended = false,
                    //this.$store.dispatch('showError', err);
                    console.error(err);
                });
            }
        }
    };
</script>
