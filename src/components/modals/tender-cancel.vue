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
            <span class="modal__title">Отмена тендера</span>
            <div 
                class="modal__content"
            >
                <div class="tender m--no-padding m--no-margin m--no-background m--no-shadow m--modal">
                    <div class="tender__info">
                        <div class="tender__info-title">
                            {{ tender.kind_detail }} №{{ tender.id }}. {{ tender.name }}
                        </div>
                        <div
                            v-if="cancelSended"
                            class="form m--width-100"
                        >
                            <div class="form__block m--flex">
                                <div class="form__block-title m--center m--with-icon">
                                    <span class="m--ok">Ваш тендер успешно отменен!</span>
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
                                    @click="$emit('hideModal', updateData)"
                                >
                                    Закрыть
                                </button>
                            </div>
                        </div>
                        <FormKit
                            v-else
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
                                <div class="form__block-content text content m--center">
                                    <p>Вы точно хотите отменить тендер?</p>
                                    <p>Тендер будет считаться завершенным, все заявки участников будут отклонены.</p>
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
        },
        data() {
            return {
                loading: false,
                showLoaderSending: false,
                cancelSended: false,
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
                tenderApi.closeTender(this.tender.id, { set_winner: false }).then(res => {
                    this.showLoaderSending = false;
                    this.loading = false;
                    this.cancelSended = true;
                    this.updateData = true;
                    console.log(res);
                }).catch(err => {
                    this.showLoaderSending = false;
                    this.loading = false;
                    this.$store.dispatch('showError', err);
                    console.error(err);
                });
            }
        }
    };
</script>
