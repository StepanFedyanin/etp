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
                {{ slug ? 'Редактирование товара' : 'Добавление товара' }}
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
                <FormKit
                    id="addGoodForm"
                    v-model="formValues"
                    name="add-good-form"
                    preserve
                    type="form"
                    data-loading="showLoaderSending"
                    form-class="$reset modal-form goods__form"
                    :disabled="showLoaderSending"
                    :loading="showLoaderSending ? true : undefined"
                    :actions="false"
                    @submit="submitAddGoodForm"
                >
                    <div class="modal-form__block">
                        <div class="goods__form-photo">
                            <div class="field">
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
                                        v-if="formValues.small_photo"
                                        :disabled="loading || busyForm"
                                        class="button button-outline-red button-width-auto"
                                        @click.prevent="onClickDeletePhoto"
                                    >
                                        Удалить
                                    </button>
                                </div>
                                <div 
                                    v-if="formValues.small_photo"
                                    class="field__text m--color-green"
                                >
                                    Загружен файл: {{ formValues.small_photo.split('/').at(-1) }}
                                </div>
                                <div class="field__text">
                                    Рекомендуемый размер: 600х600px. jpg, png, svg
                                </div>
                            </div>
                            <div class="goods__form-photo-pic">
                                <img
                                    v-if="formValues.small_photo"
                                    :src="formValues.small_photo" 
                                    alt="" 
                                >
                            </div>
                        </div>

                        <FormKitSchema :schema="addGoodSchema" />
                    </div>
                    <div class="modal-form__actions">
                        <button
                            type="submit"
                            class="button button-green"
                        >
                            Сохранить
                        </button>
                    </div>
                </FormKit>
            </div>
        </vue-final-modal>
    </q-no-ssr>
</template>

<script>
    import { urlPath } from '@/settings';
    import { category as categoryApi, common as commonApi, product as productApi } from "@/services";
    export default {
        props: {
            showModal: {
                type: Boolean,
                default() { return false; }
            },
            slug: {
                type: String,
                default() { return null; }
            },
        },
        data() {
            return {
                urlPath,
                formValues: {},
                showLoaderSending: false,
                productSended: false,
                busyForm: false,
                loading: false,
                addGoodSchema: [
                    {
                        $formkit: 'multiselect',
                        mode: 'single',
                        name: 'category',
                        //groups: true,
                        closeOnSelect: true,
                        label: 'Категория',
                        placeholder: 'Выберите категорию товара',
                        searchable: true,
                        minChars: 1,
                        validation: 'required',
                        options: async () => {
                            return await categoryApi.getCategoryPlainListProduct({ limit: 9999 }).then(groups => {
                                if (groups.results) {
                                    /*
                                    let options = []
                                    groups.results.map( (group) => {
                                        options.push({
                                            label: group.name,
                                            options: group.categories.map( (cat) => {
                                                return { label: cat.name, value: cat.id }
                                            })
                                        })
                                    })
                                    */
                                    return this.prepareCategoryTree(groups.results);
                                } else {
                                    console.log('No getCategoryList data')
                                }
                            }).catch(err => {
                                console.error(err)
                            })
                        },
                        inputClass: 'modal-form__input',
                        labelClass: '$reset field__label',
                        outerClass: '$reset modal-form__field m--width-100',
                    }, {
                        $formkit: 'text',
                        name: 'name',
                        label: 'Название товара',
                        placeholder: 'Например: Мука пшеничная, высший сорт',
                        validation: 'required',
                        inputClass: 'modal-form__input',
                        labelClass: '$reset field__label',
                        outerClass: '$reset modal-form__field m--width-100',
                    }, {
                        $formkit: 'text',
                        name: 'unit',
                        label: 'Единица измерения',
                        placeholder: 'За что назначается цена? Например: шт; м; час; мешок 50кг',
                        validation: 'required',
                        inputClass: 'modal-form__input',
                        labelClass: '$reset field__label',
                        outerClass: '$reset modal-form__field m--width-100',
                    }, {
                        $formkit: 'multiselect',
                        mode: 'single',
                        name: 'currency',
                        closeOnSelect: true,
                        label: 'Валюта',
                        placeholder: 'Выберите валюту стоимости',
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
                        inputClass: 'modal-form__input',
                        labelClass: '$reset field__label',
                        outerClass: '$reset modal-form__field m--width-100',
                    }, {
                        $formkit: 'maska',
                        name: 'price',
                        maska: { mask: '0.99', tokens: '0:\\d:multiple|9:\\d:optional' },
                        label: 'Цена за единицу',
                        placeholder: 'Цена, соответствующая единице измерения, с учетом НДС',
                        //validation: 'required',
                        inputClass: 'modal-form__input',
                        labelClass: '$reset field__label',
                        outerClass: '$reset modal-form__field m--width-100',
                    }, {
                        $formkit: 'textarea',
                        name: 'description',
                        label: 'Краткое описание',
                        placeholder: 'Расскажите о своем товаре: где применяется, характеристики, состав, выгодные особенности и прочее',
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
            slug() {
                this.productSended = false;
                this.formValues = {};
                if (this.slug) {
                    this.getProduct();
                }
            }
        },
        mounted() {
            console.log('mounted modal');
            this.productSended = false;
            this.formValues = {};
            if (this.slug) {
                this.getProduct();
            }
        },
        methods: {
            getProduct() {
                this.showLoaderSending = true;
                this.busyForm = true;
                productApi.getProduct(this.slug, {}).then(res => {
                    this.formValues = {
                        category: res.category,
                        name: res.name,
                        price: res.price,
                        currency: res.currency,
                        unit: res.unit,
                        description: res.description,
                        //photo: res.photo,
                        small_photo: res.small_photo ? `${urlPath}${res.small_photo}` : null,
                    };
                    this.formValues.category = {
                        fromParent: true,
                        value: this.formValues.category
                    };
                    this.formValues.currency = {
                        fromParent: true,
                        value: this.formValues.currency
                    };
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
                        delete this.formValues.photo;
                        delete this.formValues.small_photo;
                        this.busyForm = false;
                    }).catch(err => {
                        this.busyForm = false;
                        this.$store.dispatch('showError', err);
                        console.error(err);
                    });
                } else {
                    delete this.formValues.photo;
                    delete this.formValues.small_photo;
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
                    this.formValues.photo = file;
                    this.formValues.small_photo = URL.createObjectURL(file);
                }
            },
            submitAddGoodForm(formData, node) {
                console.log(formData);
                const data = new FormData();
                Object.keys(this.formValues).forEach(key => {
                    if (this.formValues[key]) {
                        data.append(key, this.formValues[key]);
                    }
                });
                this.showLoaderSending = true;
                //this.loading = true;
                let params = Object.assign({}, this.formValues);
                if (this.slug) {
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
                } else {
                    productApi.addProduct(data).then(res => {
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
                }
            },
        },
    };
</script>
