<template>
    <q-no-ssr>
        <vue-final-modal 
            v-model="show"
            class="modal__container" 
            content-class="modal__block m--middle"
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
                {{ requestSended ? 'Заявка отправлена' : 'Заявка на товар' }}
            </span>
            <div
                v-if="requestSended"
                class="modal__content"
            >
                <div class="good__request">
                    <div class="good__request-content text">
                        <p><strong class="m--color-green">{{ good.marketplace_user.name }}</strong> ответит вам на контактную почту или телефон.</p>
                        <p>Если через некоторое время ответа не будет, попробуйте связаться с контрагентом самостоятельно:</p>
                    </div>
                    <div class="good__request-organization">
                        <div 
                            v-if="good.marketplace_user.website"
                            class="good__request-organization-item"
                        >
                            <span>Сайт</span> <a
                                :href="good.marketplace_user.website"
                                target="_blank"
                            >{{ good.marketplace_user.website }}</a>
                        </div>
                        <div 
                            v-if="good.marketplace_user.contact_phone"
                            class="good__request-organization-item"
                        >
                            <span>Контактный телефон</span> {{ good.marketplace_user.contact_phone }}
                        </div>
                        <div 
                            v-if="good.marketplace_user.contact_email"
                            class="good__request-organization-item"
                        >
                            <span>Контактный email</span> {{ good.marketplace_user.contact_email }}
                        </div>
                    </div>
                </div>
                <div 
                    class="modal-form__actions" 
                >
                    <button
                        class="button button-green"
                        @click.prevent="$emit('hideModal', updateData)"
                    >
                        Спасибо!
                    </button>
                </div>
            </div>
            <div 
                v-else
                class="modal__content"
            >
                <div class="text">
                    <p>
                        Организация <router-link :to="{ name: 'contragent', params: { id: good.marketplace_user.id } }">
                            {{ good.marketplace_user.name }}
                        </router-link> получит уведомление о том, что вам интересен товар <strong>{{ good.name }}</strong>.
                    </p>
                    <p>Также вы можете оставить комментарий — например, какой объем товара вам нужен, или как вам будет удобнее связаться для дальнейшего сотрудничества.</p>
                </div>

                <FormKit
                    id="requestGoodForm"
                    v-model="formValues"
                    name="request-good-form"
                    preserve
                    type="form"
                    data-loading="loading"
                    form-class="$reset form modal-form good__form"
                    :disabled="showLoaderSending"
                    :loading="showLoaderSending ? true : undefined"
                    :actions="false"
                    @submit="submitRequestGoodForm"
                >
                    <div class="modal-form__block">
                        <FormKitSchema :schema="requestGoodSchema" />
                    </div>
                    <div 
                        class="modal-form__actions" 
                        data-type="submit"
                    >
                        <button
                            type="submit"
                            :disabled="showLoaderSending"
                            class="button button-green"
                        >
                            Отправить заявку
                        </button>
                    </div>
                </FormKit>
            </div>
        </vue-final-modal>
    </q-no-ssr>
</template>

<script>
    import { urlPath } from '@/settings';
    import { cabinet } from "@/services";
    export default {
        props: {
            showModal: {
                type: Boolean,
                default() { return false; }
            },
            good: {
                type: Object,
                default() { return {}; }
            },
        },
        data() {
            return {
                urlPath,
                user: this.$store.state.user,
                formValues: {},
                showLoaderSending: false,
                requestSended: false,
                busyForm: false,
                loading: false,
                requestGoodSchema: [
                    {
                        $formkit: 'text',
                        name: 'name',
                        label: 'Имя',
                        placeholder: '',
                        validation: 'required',
                        inputClass: 'modal-form__input',
                        labelClass: '$reset field__label',
                        outerClass: '$reset modal-form__field m--width-100',
                    }, {
                        $formkit: 'text',
                        name: 'contact_phone',
                        label: 'Контактный телефон',
                        placeholder: '',
                        validation: 'required',
                        inputClass: 'modal-form__input',
                        labelClass: '$reset field__label',
                        outerClass: '$reset modal-form__field m--width-100',
                    }, {
                        $formkit: 'text',
                        name: 'contact_email',
                        label: 'Контактный email',
                        placeholder: '',
                        validation: 'required',
                        inputClass: 'modal-form__input',
                        labelClass: '$reset field__label',
                        outerClass: '$reset modal-form__field m--width-100',
                    }, {
                        $formkit: 'textarea',
                        name: 'comment',
                        label: 'Комментарий',
                        placeholder: '',
                        // validation: 'required',
                        inputClass: 'modal-form__input',
                        labelClass: '$reset field__label',
                        outerClass: '$reset modal-form__field m--width-100',
                    },
                ],
            };
        },
        computed: {
            show() {
                return this.showModal;
            },
        },
        created() {
            console.log('Created modal');
            this.requestSended = false;
            if (this.user && this.user.id) {
                this.formValues = {
                    name: this.user.first_name,
                    contact_phone: this.user.phone,
                    contact_email: this.user.email
                };
            } else {
                this.formValues = {};
            }
            console.log(this.formValues);
        },
        methods: {
            submitRequestGoodForm(formData, node) {
                console.log(formData);
                this.showLoaderSending = true;
                //this.loading = true;
                let params = Object.assign({}, this.formValues, { product: this.good.id });
                cabinet.createProductOrder(params).then(res => {
                    this.showLoaderSending = false;
                    this.loading = false;
                    this.requestSended = true;
                    this.formValues = {};
                    console.log(res);
                }).catch(err => {
                    node.setErrors(
                        err.response.data
                    );
                    this.showLoaderSending = false;
                    this.loading = false;
                    //this.$store.dispatch('showError', err);
                    console.error(err);
                });
            },
        },
    };
</script>
