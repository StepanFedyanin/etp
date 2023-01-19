<template>
    <vue-final-modal 
        v-model="show"
        classes="modal__container" 
        content-class="modal__block m--middle"
        @click-outside="$emit('hideModal', updateData)"
    >
        <button 
            class="modal__close" 
            @click="$emit('hideModal', updateData)"
        >
            <span />
        </button>
        <span class="modal__title">
            Заявка на товар
        </span>
        <div
            v-if="productSended"
            class="modal__content"
        >
            {{ slug ? 'Товар успешно обновлен' : 'Товар Успешно добавлен.' }}
        </div>
        <div 
            v-else
            class="modal__content"
        >
            <div class="text">
                <p>Организация <router-link :to="{ name: 'contragent', params: { id: good.organization.id } }">{{ good.organization.name }}</router-link> получит уведомление о том, что вам интересен товар <strong>{{ good.name }}</strong>.</p>
                <p>Также вы можете оставить комментарий — например, какой объем товара вам нужен, или как вам будет удобнее связаться для дальнейшего сотрудничества.</p>
            </div>

            <FormKit
                id="requestGoodForm"
                v-model="formValues"
                name="request-good-form"
                preserve
                type="form"
                data-loading="showLoaderSending"
                form-class="$reset modal-form goods__form"
                :disabled="showLoaderSending"
                :loading="showLoaderSending ? true : undefined"
                :actions="false"
                @submit="submitRequestGoodForm"
            >
                <div class="modal-form__block">
                    <FormKitSchema :schema="requestGoodSchema" />
                </div>
                <div class="modal-form__actions">
                    <button
                        type="submit"
                        class="button button-green"
                    >
                        Отправить заявку
                    </button>
                </div>
            </FormKit>
        </div>
    </vue-final-modal>
</template>

<script>
    import { urlPath } from '@/settings';
    import { product as productApi } from "@/services";
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
                //good: {},
                urlPath,
                formValues: {},
                showLoaderSending: false,
                productSended: false,
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
                        name: 'phone',
                        label: 'Контактный телефон',
                        placeholder: '',
                        validation: 'required',
                        inputClass: 'modal-form__input',
                        labelClass: '$reset field__label',
                        outerClass: '$reset modal-form__field m--width-100',
                    }, {
                        $formkit: 'text',
                        name: 'email',
                        label: 'Контактный email',
                        placeholder: '',
                        validation: 'required',
                        inputClass: 'modal-form__input',
                        labelClass: '$reset field__label',
                        outerClass: '$reset modal-form__field m--width-100',
                    }, {
                        $formkit: 'textarea',
                        name: 'description',
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
        watch: {
        },
        mounted() {
            console.log('mounted modal');
            this.productSended = false;
            this.formValues = {};
        },
        methods: {
            submitRequestGoodForm(formData, node) {
                console.log(formData);
                /*
                const data = new FormData();
                Object.keys(this.formValues).forEach(key => {
                    data.append(key, this.formValues[key]);
                });
                //data.append('photo', file);
                this.showLoaderSending = true;
                //this.loading = true;
                let params = Object.assign({}, this.formValues);
                productApi.updateProduct(this.slug, data).then(res => {
                    this.showLoaderSending = false;
                    this.loading = false;
                    this.productSended = true;
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
                */
            },
        },
    };
</script>
