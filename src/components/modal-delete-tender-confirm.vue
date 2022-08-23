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
        <span class="modal__title">Удаление тендера</span>
        <div 
            class="modal__content"
        >
            <div class="tender m--no-padding m--no-background m--no-shadow m--modal">
                <div class="tender__info">
                    <div class="tender__info-title">
                        Аукцион №{{ tender.id }}. {{ tender.name }}
                    </div>
                    <div
                        v-if="deleteSended"
                        class="form m--width-100"
                    >
                        <div class="form__block m--flex">
                            <div class="form__block-title m--center m--with-icon">
                                <span class="m--ok">Ваш тендер успешно удален!</span>
                            </div>
                        </div>
                        <div 
                            class="form__submit" 
                            data-type="submit"
                        >
                            <button
                                type="submit"
                                :disabled="showLoaderSending"
                                class="button button-green"
                                @click="$emit('hideModal')"
                            >
                                Закрыть
                            </button>
                        </div>
                    </div>
                    <FormKit
                        v-else
                        v-model="formValues"
                        name="form-tender"
                        preserve
                        type="form"
                        data-loading="loading"
                        form-class="$reset form m--width-100"
                        :actions="false"
                        :disabled="loading"
                        :loading="loading ? true : undefined"
                        @submit="submitHandler"
                    >
                        <div class="form__block m--flex">
                            <div class="form__block-title m--center">
                                Вы действительно хотите удалить тендер?
                            </div>
                        </div>
                        <div 
                            class="form__submit" 
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
        },
        data() {
            return {
                formValues: {
                    price: null,
                    min_bid: null
                },
                loading: false,
                showLoaderSending: false,
                deleteSended: false,
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
                this.deleteSended = true;
                /*
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
                */
            }
        }
    };
</script>
