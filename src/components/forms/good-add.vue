<template>
    <div class="profile__form">
        <div class="profile__title h1">
            {{ slug ? `Редактирование товара: ${formData.name || ''}` : 'Добавление товара' }}
        </div>
        <template v-if="showLoaderSending">
            <div class="profile__loader loader">
                <div class="spinner" /> Загрузка данных
            </div>
        </template>
        <template v-else>
            <FormKit
                id="addGoodForm"
                v-model="formData"
                name="add-good-form"
                preserve
                type="form"
                data-loading="loading"
                form-class="$reset form profile__form"
                :actions="false"
                :disabled="busyForm"
                :loading="busyForm ? true : undefined"
                @submit="submitAddGoodForm"
            >
                <div 
                    data-type="submit"
                    class="form__submit profile__form-submit"
                >
                    <button
                        type="submit"
                        class="button button-green button-width-auto"
                        :disabled="busyForm"
                        @click="formData.typeSubmit = 'back'"
                    >
                        Сохранить товар
                    </button>
                    <button
                        v-if="!slug"
                        type="submit"
                        class="button button-outline-green button-width-auto"
                        :disabled="busyForm"
                        @click="formData.typeSubmit = 'repeat'"
                    >
                        Сохранить и добавить еще
                    </button>
                </div>
                <div class="h2">Товар</div>
                <div class="profile__form-main m--mb-2">
                    <FormKitSchema :schema="mainGoodSchema" />
                </div>
                <template v-if="showExtended">
                    <div class="h2">Оплата</div>
                    <div class="profile__form-main m--mb-2 form m--flex">
                        <FormKitSchema :schema="paymentGoodSchema" />
                    </div>
                    <div class="h2">Доставка</div>
                    <div class="profile__form-main m--mb-2 form m--flex">
                        <FormKitSchema :schema="deliveryGoodSchema" />
                    </div>
                </template>
                <div class="h2">Фотографии</div>
                <div class="field">
                    <div class="field__text">Загрузите до 8 фотографий. Рекомендуемый размер: 600x600px, формат: jpg, png, svg. Первое загруженное фото будет основным.</div>
                </div>
                <div class="profile__form-photolist">
                    <div class="profile__form-logo">
                        <div class="field__input m--hidden">
                            <input
                                id="photo"
                                ref="photoInput" 
                                accept=".jpg,.png,.svg" 
                                class="input" 
                                type="file" 
                                name="photo"
                            >
                        </div>
                        <div class="profile__form-logo-block">
                            <div class="profile__form-logo-inner">
                                <button
                                    v-if="!formData.small_photo"
                                    href="#"
                                    class="button button-outline-green button-width-auto m--small"
                                    @click.prevent="onClickUploadPhoto"
                                >
                                    Загрузить фото
                                </button>
                                <img 
                                    v-else
                                    :src="formData.small_photo"
                                />
                            </div>
                        </div>
                        <div 
                            v-if="formData.small_photo"
                            class="profile__form-logo-links" 
                        >
                            <a
                                href="#"
                                class="profile__form-logo-link"
                                @click.prevent="onClickUploadPhoto"
                            >
                                Изменить фото
                            </a>
                            <a
                                href="#"
                                class="profile__form-logo-link m--color-red"
                                @click.prevent="onClickDeletePhoto"
                            >
                                Удалить
                            </a>
                        </div>
                    </div>

                    <!--div class="field">
                        <div class="field__inner">
                            <label 
                                class="field__label" 
                                for="photo"
                            >
                                Фотография
                            </label>
                            <div class="field__input m--hidden">
                                <input
                                    id="photo"
                                    ref="photoInput"
                                    accept=".jpg,.png,.svg" 
                                    class="input" 
                                    type="file" 
                                    name="photo" 
                                >
                            </div>
                        </div>
                        <div 
                            class="form__submit edit__form-submit m--start" 
                        >
                            <button
                                :disabled="loading || busyForm"
                                class="button button-outline-green button-width-auto"
                                @click.prevent="onClickUploadPhoto"
                            >
                                Загрузить новую
                            </button>
                            <button
                                v-if="formData.small_photo"
                                :disabled="loading || busyForm"
                                class="button button-outline-red button-width-auto"
                                @click.prevent="onClickDeletePhoto"
                            >
                                Удалить
                            </button>
                        </div>
                        <div 
                            v-if="formData.small_photo"
                            class="field__text m--color-green"
                        >
                            Загружен файл: {{ formData.small_photo.split('/').at(-1) }}
                        </div>
                    </div>
                    <div class="goods__form-photo-pic">
                        <img
                            v-if="formData.small_photo"
                            :src="formData.small_photo" 
                            alt="" 
                        >
                    </div-->
                </div>
                <template v-if="showExtended">
                    <div class="h2">Отображение товара</div>
                    <div class="profile__form-main m--mb-2">
                        <FormKitSchema :schema="showGoodSchema" />
                    </div>
                </template>
                <div 
                    data-type="submit"
                    class="form__submit profile__form-submit"
                >
                    <button
                        type="submit"
                        class="button button-green button-width-auto"
                        :disabled="busyForm"
                        @click="formData.typeSubmit = 'back'"
                    >
                        Сохранить товар
                    </button>
                    <button
                        v-if="!slug"
                        type="submit"
                        class="button button-outline-green button-width-auto"
                        :disabled="busyForm"
                        @click="formData.typeSubmit = 'repeat'"
                    >
                        Сохранить и добавить еще
                    </button>
                </div>
            </FormKit>
        </template>
    </div>
</template>

<script>
    import { urlPath } from '@/settings';
    import { category as categoryApi, common as commonApi, product as productApi } from "@/services";
    export default {
        props: {
            slug: {
                type: String,
                default() { return null; }
            },
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
                        $formkit: 'text',
                        name: 'name',
                        label: 'Название товара',
                        placeholder: 'Например: Мука пшеничная, высший сорт',
                        validation: 'required',
                        outerClass: 'field--required',
                    }, {
                        $formkit: 'multiselect',
                        mode: 'single',
                        name: 'category',
                        //groups: true,
                        closeOnSelect: true,
                        label: 'Категория',
                        placeholder: 'Выберите категорию товара',
                        searchable: true,
                        minChars: 1,
                        //validation: 'required',
                        options: async () => {
                            return await categoryApi.getCategoryListProduct({ limit: 9999 }).then(groups => {
                                if (groups.results) {
                                    return this.prepareCategoryTree(groups.results);
                                } else {
                                    console.log('No getCategoryList data')
                                }
                            }).catch(err => {
                                console.error(err)
                            })
                        },
                        //outerClass: 'field--required',
                    }, {
                        $formkit: 'textarea',
                        name: 'description',
                        label: 'Описание товара',
                        placeholder: 'Расскажите о своем товаре: где применяется, характеристики, состав, выгодные особенности и прочее',
                        // validation: 'required',
                    }, {
                        $formkit: 'text',
                        name: 'brand',
                        label: 'Бренд / Производитель',
                        placeholder: '',
                        // validation: 'required',
                        // outerClass: 'field--required',
                    }, {
                        $formkit: 'text',
                        name: 'article',
                        label: 'Артикул',
                        placeholder: '',
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
                        validation: 'required',
                        outerClass: 'field--required m--width-33',
                    }, {
                        $formkit: 'maska',
                        name: 'price',
                        maska: { mask: '0.99', tokens: '0:\\d:multiple|9:\\d:optional' },
                        label: 'Цена за 1 ед.',
                        placeholder: '',
                        // validation: 'required',
                        // outerClass: 'field--required',
                        outerClass: 'm--width-33',
                    }, {
                        $formkit: 'multiselect',
                        mode: 'single',
                        name: 'currency',
                        closeOnSelect: true,
                        label: 'Валюта',
                        placeholder: '',
                        searchable: true,
                        minChars: 1,
                        validation: 'required',
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
                        outerClass: 'field--required m--width-33',
                    }, {
                        $formkit: 'multiselect',
                        mode: 'single',
                        name: 'nds',
                        //groups: true,
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
                        $formkit: 'text',
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
                        $formkit: 'multiselect',
                        mode: 'single',
                        name: 'participant_type',
                        //groups: true,
                        closeOnSelect: true,
                        label: 'Кто может заказать товар?',
                        validation: 'required',
                        canClear: false,
                        disabled: true,
                        options: [
                            { label: 'Организация', value: 'organization' },
                            { label: 'Физ. лицо', value: 'person', disabled: true }
                        ],
                        outerClass: 'field--required',
                    }, {
                        $formkit: 'maska',
                        name: 'ordering',
                        maska: { mask: '0', tokens: '0:\\d:multiple' },
                        label: 'Сортировка',
                        help: 'Чем меньше число, тем выше расположится товар в вашем прайс-листе',
                        //validation: 'required',
                        //outerClass: 'field--required',
                    }, {
                        $formkit: 'checkbox',
                        name: 'publication',
                        label: 'Опубликовать товар',
                        outerClass: 'm--inline',
                    }
                ]
            };
        },
        computed: {
        },
        watch: {
            slug() {
                this.productSended = false;
                this.formData = {
                    nds: -1,
                    min_count: 1,
                    participant_type: 'organization',
                    ordering: 10
                };
                if (this.slug) {
                    this.getProduct();
                }
            }
        },
        mounted() {
            this.productSended = false;
            this.formData = {
                nds: -1,
                min_count: 1,
                participant_type: 'organization',
                ordering: 10
            };
            if (this.slug) {
                this.getProduct();
            }
        },
        methods: {
            getProduct() {
                this.showLoaderSending = true;
                this.busyForm = true;
                productApi.getProduct(this.slug, {}).then(res => {
                    this.formData = res; 
                    /*
                    {
                        category: res.category,
                        name: res.name,
                        price: res.price,
                        currency: res.currency,
                        unit: res.unit,
                        description: res.description,
                        //photo: res.photo,
                        small_photo: res.small_photo ? `${urlPath}${res.small_photo}` : null,
                    };
                    */
                    /*
                    this.formData.category = {
                        fromParent: true,
                        value: this.formData.category
                    };
                    this.formData.currency = {
                        fromParent: true,
                        value: this.formData.currency
                    };
                    */
                    this.showLoaderSending = false;
                    this.busyForm = false;
                }).catch(err => {
                    this.showLoaderSending = false;
                    this.busyForm = false;
                    this.$store.dispatch('showError', err);
                    console.error(err);
                });
            },
            onClickUploadPhoto() {
                let photoInput = this.$refs.photoInput;
                let click = new MouseEvent('click');

                photoInput.onchange = this.uploaPhotoComplete;
                photoInput.dispatchEvent(click);
            },
            onClickDeletePhoto() {
                console.log('onClickDeletePhoto');
                this.busyForm = true;
                if (this.slug) {
                    productApi.deleteProductPhoto(this.slug).then(res => {
                        delete this.formData.photo;
                        delete this.formData.small_photo;
                        this.busyForm = false;
                    }).catch(err => {
                        this.busyForm = false;
                        this.$store.dispatch('showError', err);
                        console.error(err);
                    });
                } else {
                    delete this.formData.photo;
                    delete this.formData.small_photo;
                }
            },
            prepareCategoryTree(list, parent = null, level = 0) {
                let categoryList = [];
                list.filter(el => { return el.parent === parent }).forEach(item => {
                    item.name = '\xa0'.repeat(level * 4) + item.name;
                    categoryList.push({ 
                        label: item.name,
                        value: item.id
                    });
                    let childs = list.filter(el => { return el.parent !== parent; });
                    if (childs.length) categoryList = categoryList.concat(this.prepareCategoryTree(childs, item.id, level + 1));
                });
                return categoryList;
            },
            uploaPhotoComplete(event) {
                let file = event.target.files ? event.target.files[0] : null
                if (file) {
                    this.formData.photo = file;
                    this.formData.small_photo = URL.createObjectURL(file);
                }
            },
            submitAddGoodForm(data, node) {
                let params = new FormData();
                Object.keys(this.formData).forEach(key => {
                    if (this.formData[key] && key !== 'small_photo' && key !== 'photo') {
                        params.append(key, this.formData[key]);
                    }
                });
                this.busyForm = true;
                //let params = Object.assign({}, this.formData);
                if (this.slug) {
                    productApi.updateProduct(this.slug, params).then(res => {
                        this.busyForm = false;
                        this.productSended = true;
                        this.updateData = true;
                        this.$router.go(-1);
                        console.log(res);
                    }).catch(err => {
                        node.setErrors(
                            err.response.data
                        );
                        this.busyForm = false;
                        this.$store.dispatch('showError', err);
                        console.error(err);
                    });
                } else {
                    productApi.addProduct(params).then(res => {
                        this.busyForm = false;
                        this.productSended = true;
                        this.updateData = true;
                        if (this.formData.typeSubmit === 'back') {
                            this.$router.go(-1);
                        } else {
                            this.$router.go(0);
                            /*
                            this.$nextTick(() => {
                                this.formData = {};
                            });
                            */
                        }
                        console.log(res);
                    }).catch(err => {
                        node.setErrors(
                            err.response.data
                        );
                        this.busyForm = false;
                        this.$store.dispatch('showError', err);
                        console.error(err);
                    });
                }
            },
        },
    };
</script>
