<template>
    <div class="market__form">
        <div class="market__title h1">
            {{ goodId ? `Редактирование товара: ${formData.name || ''}` : 'Добавление товара' }}
        </div>
        <template v-if="showLoaderSending">
            <div class="market__loader loader">
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
                form-class="$reset form"
                :actions="false"
                :disabled="busyForm"
                :loading="busyForm ? true : undefined"
                @submit="submitAddGoodForm"
            >
                <div 
                    data-type="submit"
                    class="form__submit market__form-submit"
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
                        v-if="!goodId"
                        type="submit"
                        class="button button-outline-green button-width-auto"
                        :disabled="busyForm"
                        @click="formData.typeSubmit = 'repeat'"
                    >
                        Сохранить и добавить еще
                    </button>
                </div>
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
                <div class="h2">Фотографии</div>
                <div class="field">
                    <div class="field__text">Загрузите до 8 фотографий. Рекомендуемый размер: 600x600px, формат: jpg, png, svg. Первое загруженное фото будет основным.</div>
                </div>
                <VueDraggableNext
                    class="market__form-photolist" 
                    :list="formData.photos || photoList" 
                    draggable=".m--drag"
                    @change="onChangeOrderingPhoto"
                >
                    <transition-group>
                        <div
                            v-for="(image, index) in (formData.photos || photoList)" 
                            :key="`image-${image.id}`"
                            class="market__form-photo m--drag"
                        >
                            <div class="market__form-photo-block">
                                <div class="market__form-photo-inner">
                                    <img 
                                        :src="image.photo"
                                    />
                                    <div class="market__form-photo-ordering">{{ index + 1 }}</div>
                                </div>
                            </div>
                            <div class="market__form-photo-links">
                                <a
                                    href="#"
                                    class="market__form-photo-link m--color-red"
                                    @click.prevent="onClickDeletePhoto(image.id)"
                                >
                                    Удалить
                                </a>
                            </div>
                        </div>
                    </transition-group>
                    <div v-if="(goodId && formData.photos?.length < 8) || (!goodId && photoList.length < 8)" class="market__form-photo">
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
                        <div class="market__form-photo-block">
                            <div class="market__form-photo-inner">
                                <button
                                    href="#"
                                    class="button button-outline-green button-width-auto m--small"
                                    @click.prevent="onClickUploadPhoto"
                                >
                                    Загрузить фото
                                </button>
                            </div>
                        </div>
                    </div>
                </VueDraggableNext>
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
                        @click="formData.typeSubmit = 'back'"
                    >
                        Сохранить товар
                    </button>
                    <button
                        v-if="!goodId"
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
    import { category as categoryApi, common as commonApi, cabinet as cabinetApi } from "@/services";
    import { VueDraggableNext } from 'vue-draggable-next';
    export default {
        components: {
            VueDraggableNext,
        },
        props: {
            goodId: {
                type: String,
                default() { return null; }
            },
        },
        data() {
            return {
                showExtended: true,
                urlPath,
                formData: {},
                photoList: [],
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
                        outerClass: 'field--required m--width-100',
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
                            return await categoryApi.getCategoryPlainListProduct({ limit: 9999 }).then(groups => {
                                if (groups.results) {
                                    return this.prepareCategoryTree(groups.results);
                                } else {
                                    console.log('No getCategoryList data')
                                }
                            }).catch(err => {
                                console.error(err)
                            })
                        },
                        classes: { multiselect: 'm--long' },
                        outerClass: 'm--width-100',
                    }, {
                        $formkit: 'textarea',
                        name: 'about',
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
                        $formkit: 'text',
                        name: 'article',
                        label: 'Артикул',
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
                        canClear: false,
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
                    /*
                        $formkit: 'multiselect',
                        mode: 'single',
                        name: 'type_of_buyer',
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
                    */
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
            marketUser() {
                return this.$store.state.user.marketplace_user || {};
            },
        },
        watch: {
            goodId() {
                this.productSended = false;
                this.formData = {
                    in_stock: 'in_stock',
                    production_time: 0,
                    nds: -1,
                    min_count: 1,
                    type_of_buyer: 'organization',
                    ordering: 10,
                    publication: true
                };
                if (this.goodId) {
                    this.getProduct();
                }
            }
        },
        mounted() {
            this.productSended = false;
            this.formData = {
                in_stock: 'in_stock',
                production_time: 0,
                nds: -1,
                min_count: 1,
                type_of_buyer: 'organization',
                ordering: 10,
                publication: true
            };
            this.goodId ? this.getProduct() : this.getMarketProfile();
        },
        methods: {
            getMarketProfile() {
                this.showLoaderSending = true;
                if (this.marketUser?.type === 'organization') {
                    cabinetApi.getMarketOrganizationProfile().then(res => {
                        this.formData = Object.assign({}, this.formData, res.settings);
                        this.showLoaderSending = false;
                    }).catch(err => {
                        this.showLoaderSending = false;
                        console.error(err);
                    });
                } else {
                    cabinetApi.getMarketProfile().then(res => {
                        this.formData = Object.assign({}, this.formData, res.settings);
                        this.showLoaderSending = false;
                    }).catch(err => {
                        this.showLoaderSending = false;
                        console.error(err);
                    });
                }
            },
            getProduct() {
                this.showLoaderSending = true;
                this.busyForm = true;
                cabinetApi.getProduct(this.goodId).then(res => {
                    this.formData = res; 
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
                    if (err.response?.status === 404) this.$router.replace({ name: 'page404' });
                    this.showLoaderSending = false;
                    this.busyForm = false;
                });
            },
            onClickUploadPhoto() {
                let photoInput = this.$refs.photoInput;
                let click = new MouseEvent('click');

                photoInput.onchange = this.uploaPhotoComplete;
                photoInput.dispatchEvent(click);
            },
            onClickDeletePhoto(photoId) {
                console.log('onClickDeletePhoto');
                if (photoId) {
                    if (this.goodId) {
                        this.busyForm = true;
                        cabinetApi.deleteProductPhoto(photoId).then(res => {
                            let photos = this.formData.photos.filter(item => { return item.id !== photoId });
                            this.formData.photos = [...photos];
                            /*
                            delete this.formData.photo;
                            delete this.formData.small_photo;
                            */
                            this.busyForm = false;
                        }).catch(err => {
                            this.busyForm = false;
                            this.$store.dispatch('showError', err);
                            console.error(err);
                        });
                    } else {
                        let photos = this.photoList.filter(item => { return item.id !== photoId });
                        this.photoList = [...photos];
                    }
                }
            },
            onChangeOrderingPhoto(event) {
                console.log(event);
                if (this.goodId) {
                    this.formData.photos.forEach((item, index) => {
                        console.log(item);
                        let params = { ordering: index };
                        cabinetApi.updateProductPhotoPartial(item.id, params).catch(err => {
                            this.$store.dispatch('showError', err);
                        });
                    });
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
                    if (this.goodId) {
                        const data = new FormData();
                        data.append('photo', file);
                        data.append('product', this.goodId);
                        let ordering = this.formData.photos.length ? this.formData.photos.at(-1).ordering + 1 : 1;
                        data.append('ordering', ordering);
                        this.busyForm = true;
                        cabinetApi.addProductPhoto(data).then(res => {
                            this.formData.photos.push(res);
                            this.busyForm = false;
                        }).catch(err => {
                            this.busyForm = false;
                            this.$store.dispatch('showError', err);
                            console.error(err);
                        });
                    } else {
                        let self = this;
                        //[...files].forEach(file => {
                            let reader  = new FileReader();
                            reader.onload = function(e)  {
                                //if (self.photoList.length < self.limitPhotos) {
                                    //if (file.size < self.maxPhotoSize) {
                                        self.photoList.push({
                                            id: `image-${Math.floor(Math.random() * 100000)}`,
                                            photo: e.target.result,
                                            file: file
                                        });
                                    //} else {
                                    //    self.maxPhotoSizeAlert = true;
                                    //}
                                //} else {
                                //    self.limitPhotosAlert = true;
                                //}
                            }
                            //if (self.limitPhotosAlert) return;
                            reader.readAsDataURL(file);
                        //});
                    }
                    //this.formData.photo = file;
                    //this.formData.small_photo = URL.createObjectURL(file);
                }
            },
            submitAddGoodForm(data, node) {
                let params = new FormData();
                Object.keys(this.formData).forEach(key => {
                    if (this.formData[key] && key !== 'photo') {
                        params.append(key, this.formData[key]);
                    }
                });
                this.busyForm = true;
                //let params = Object.assign({}, this.formData);
                if (this.goodId) {
                    cabinetApi.updateProduct(this.goodId, params).then(res => {
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
                    this.photoList.forEach((item, index) => {
                        /*
                        images.push({
                            photo: item.file,
                            ordering: index
                        });
                        */
                        params.append(`photos-${index}-photo`, item.file);
                    });
                    cabinetApi.addProduct(params).then(res => {
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
