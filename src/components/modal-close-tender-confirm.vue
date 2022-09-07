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
        <span class="modal__title">Завершение тендера с текущими победителями</span>
        <div 
            class="modal__content"
        >
            <div class="tender m--no-padding m--no-background m--no-shadow m--modal">
                <div class="tender__info">
                    <div class="tender__info-title">
                        Аукцион №{{ tender.id }}. {{ tender.name }}
                    </div>
                    <div
                        v-if="closeSended"
                        class="form m--width-100"
                    >
                        <div class="form__block m--flex">
                            <div class="form__block-title m--center m--with-icon">
                                <span class="m--ok">Ваш тендер успешно закрыт!</span>
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
                                Вы действительно хотите завершить тендер?
                            </div>
                            <div class="form__block-content text content m--center">
                                <p>Вы можете проверить список победителей и в случае необходимости изменить победителя по каждому лоту.</p>
                                <p>После завершения тендера смена победителей будет невозможна.</p>
                            </div>
                        </div>
                        <div 
                            class="form__submit" 
                            data-type="submit"
                        >
                            <button
                                type="reset"
                                :disabled="showLoaderSending"
                                class="button button-red m--small"
                                @click="$emit('hideModal', false)"
                            >
                                Вернуться и изменить победителей
                            </button>
                            <button
                                type="submit"
                                :disabled="showLoaderSending"
                                class="button button-green m--small"
                                @click="submitForm"
                            >
                                Завершить тендер
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
            submitHandler() {
                this.showLoaderSending = true;
                this.loading = true;
                tenderApi.closeWithAcceptWinnersTender(this.tender.id).then(res => {
                    this.showLoaderSending = false;
                    this.loading = false;
                    this.closeSended = true;
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
