<template>
    <div class="market__form">
        <template v-if="showLoaderSending">
            <div class="market__loader loader">
                <div class="spinner" /> Загрузка данных
            </div>
        </template>
        <template v-else>
            {{ formData }}
            <FormKit
                id="marketSettingsForm"
                v-model="formData"
                name="add-good-form"
                preserve
                type="form"
                data-loading="loading"
                form-class="$reset form"
                :actions="false"
                :disabled="busyForm"
                :loading="busyForm ? true : undefined"
                @submit="submitHandler"
            >
                <div class="h2">Товар</div>
                <div class="market__form-main m--mb-2 form m--flex">
                    <FormKitSchema :schema="mainGoodSchema" />
                </div>
                <template v-if="showExtended">
                    <div class="h2">Оплата</div>
                    <div class="market__form-main m--mb-2 form m--flex">
                        <FormKitSchema :schema="paymentGoodSchema" />
                    </div>
                    <div class="h2">Доставка</div>
                    <div class="market__form-main m--mb-2 form m--flex">
                        <FormKitSchema :schema="deliveryGoodSchema" />
                    </div>
                </template>
                <template v-if="showExtended">
                    <div class="h2">Отображение товара</div>
                    <div class="market__form-main m--mb-2">
                        <FormKitSchema :schema="showGoodSchema" />
                    </div>
                </template>
                <div 
                    data-type="submit"
                    class="form__submit market__form-submit"
                >
                    <button
                        type="submit"
                        class="button button-green button-width-auto"
                        :disabled="busyForm"
                    >
                        Сохранить настройки
                    </button>
                </div>
            </FormKit>
        </template>
    </div>
</template>

<script>
    import { urlPath } from '@/settings';
    import { common as commonApi, cabinet } from "@/services";
    export default {
        components: {
        },
        props: {
            //goodId: {
            //    type: String,
            //    default() { return null; }
            //},
        },
        data() {
            return {
                showExtended: true,
                urlPath,
                formData: {},
                showLoaderSending: false,
                productSended: false,
                busyForm: false,
                mainGoodSchema: [
                    {
                        $formkit: 'textarea',
                        name: 'description',
                        label: 'Описание товара',
                        placeholder: 'Расскажите о своем товаре: где применяется, характеристики, состав, выгодные особенности и прочее',
                        // validation: 'required',
                        outerClass: 'm--width-100',
                    }, {
                        $formkit: 'text',
                        name: 'brand',
                        label: 'Бренд / Производитель',
                        placeholder: '',
                        // validation: 'required',
                        outerClass: 'm--width-100',
                    }, {
                        $formkit: 'multiselect',
                        mode: 'single',
                        name: 'in_stock',
                        canClear: false,
                        closeOnSelect: true,
                        label: 'Наличие',
                        // validation: 'required',
                        options: [
                            { label: 'В наличии', value: 'in_stock' },
                            { label: 'Под заказ', value: 'under_order' },
                        ],
                        outerClass: 'm--width-50',
                    }, {
                        $formkit: 'maska',
                        name: 'production_time',
                        maska: { mask: '0', tokens: '0:\\d:multiple' },
                        label: 'Срок до отгрузки, дн.',
                        placeholder: '',
                        outerClass: 'm--width-50'
                        // validation: 'required',
                        // outerClass: 'field--required',
                    },
                ],
                paymentGoodSchema: [
                    {
                        $formkit: 'text',
                        name: 'unit',
                        label: 'Единица измерения',
                        placeholder: 'Например: шт; м; час; мешок 50кг',
                        //validation: 'required',
                        outerClass: 'm--width-50',
                    }, {
                        $formkit: 'multiselect',
                        mode: 'single',
                        name: 'currency',
                        canClear: false,
                        closeOnSelect: true,
                        label: 'Валюта',
                        placeholder: '',
                        searchable: true,
                        minChars: 1,
                        //validation: 'required',
                        options: async () => {
                            return await commonApi.getCurrenciesList().then(res => {
                                if (res) {
                                    let options = res.map((currency) => {
                                        return { label: currency.name, value: currency.iso_name };
                                    })
                                    return options;
                                } else {
                                    console.log('No getCurrenciesList data');
                                }
                            }).catch(err => {
                                console.error(err);
                            })
                        },
                        outerClass: 'm--width-50',
                    }, {
                        $formkit: 'multiselect',
                        mode: 'single',
                        name: 'nds',
                        canClear: false,
                        closeOnSelect: true,
                        label: 'В том числе, НДС',
                        // validation: 'required',
                        options: [
                            { label: 'Нет НДС', value: -1 },
                            { label: '0%', value: 0 },
                            { label: '10%', value: 10 },
                            { label: '20%', value: 20 },
                        ],
                        outerClass: 'm--width-50',
                    }, {
                        $formkit: 'maska',
                        name: 'min_count',
                        maska: { mask: '0', tokens: '0:\\d:multiple' },
                        label: 'Минимальный заказ, ед.',
                        //placeholder: 'Мин. сумма для доставки, ₽',
                        // validation: 'required',
                        outerClass: 'm--width-50',
                    }, {
                        $formkit: 'textarea',
                        name: 'payment_terms',
                        label: 'Условия оплаты',
                        //validation: 'required',
                        outerClass: 'm--width-100',
                    }
                ],
                deliveryGoodSchema: [
                    {
                        $formkit: 'maska',
                        name: 'delivery_min_cost',
                        maska: { mask: '0.99', tokens: '0:\\d:multiple|9:\\d:optional' },
                        label: 'Мин. стоимость доставки, ₽',
                        //placeholder: 'Мин. сумма для доставки, ₽',
                        //validation: 'required',
                        outerClass: 'm--width-50',
                    }, {
                        $formkit: 'text',
                        name: 'delivery_time',
                        label: 'Сроки доставки по РФ, дн.',
                        //validation: 'required',
                        outerClass: 'm--width-50',
                    }, {
                        $formkit: 'textarea',
                        name: 'delivery_terms',
                        label: 'Условия доставки',
                        //placeholder: 'Расскажите о своем товаре: где применяется, характеристики, состав, выгодные особенности и прочее',
                        // validation: 'required',
                        outerClass: 'm--width-100'
                    }
                ],
                showGoodSchema: [
                    {
                        $formkit: 'checkbox',
                        name: 'publication',
                        label: 'Опубликовать товар',
                        outerClass: 'm--inline',
                    }
                ]
            };
        },
        computed: {
            marketUser() {
                return this.$store.state.user.marketplace_user || {};
            },
            user() {
                return this.$store.state.user || {};
            },
        },
        created() {
            this.getMarketProfile();
        },
        methods: {
            getMarketProfile() {
                this.showLoaderSending = true;
                if (this.marketUser?.type === 'organization') {
                    cabinet.getMarketOrganizationProfile().then(res => {
                        this.formData = res.settings || {};
                        this.showLoaderSending = false;
                    }).catch(err => {
                        this.showLoaderSending = false;
                        console.error(err);
                    });
                } else {
                    cabinet.getMarketProfile().then(res => {
                        this.formData = res.settings || {};
                        this.showLoaderSending = false;
                    }).catch(err => {
                        this.showLoaderSending = false;
                        console.error(err);
                    });
                }
            },
            submitHandler(formData, node) {
                this.busyForm = true;
                let params = {
                    settings: Object.assign({}, this.formData)
                };
                if (this.marketUser?.type === 'organization') {
                    cabinet.updateMarketOrganizationProfilePartial(this.marketUser?.id, params).then(res => {
                        cabinet.getMyProfile().then(res => {
                            this.busyForm = false;
                            this.$store.dispatch('setUser', res);
                            this.$emit('updateData', res);
                        }).catch(err => {
                            this.busyForm = false;
                            this.$store.dispatch('showError', err);
                            console.error(err);
                        });
                    }).catch(err => {
                        node.setErrors(
                            err.response.data,
                        );
                        this.busyForm = false;
                    });
                } else {
                    cabinet.updateMarketProfilePartial(this.marketUser?.id, params).then(res => {
                        cabinet.getMyProfile().then(res => {
                            this.busyForm = false;
                            this.$store.dispatch('setUser', res);
                            this.$emit('updateData', res);
                        }).catch(err => {
                            this.busyForm = false;
                            this.$store.dispatch('showError', err);
                            console.error(err);
                        });
                    }).catch(err => {
                        node.setErrors(
                            err.response.data,
                        );
                        this.busyForm = false;
                    });
                }
            },
        }
    };
</script>
