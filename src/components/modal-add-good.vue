<template>
    <vue-final-modal 
        v-model="show"
        classes="modal__container" 
        content-class="modal__block"
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
            <template
                v-if="showLoaderSending"
            >
                <div class="tenders__loader loader">
                    <div class="spinner" /> Загрузка данных
                </div>
            </template>
            <template
                v-else
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
                                    <label class="field__label" for="photo">Фотография</label>
                                    <div class="field__input m--hidden">
                                        <input
                                            ref="logoInput"
                                            accept=".jpg,.png,.svg" 
                                            class="input" 
                                            type="file" 
                                            name="photo" 
                                            id="photo"
                                        >
                                    </div>
                                </div>
                                <div 
                                    class="form__submit edit__form-submit m--start" 
                                >
                                    <button
                                        :disabled="loading || busyForm"
                                        class="button button-outline-green button-width-auto"
                                        @click.prevent="onClickUploadLogo"
                                    >
                                        Загрузить новую
                                    </button>
                                    <button
                                        v-if="formValues.photo"
                                        :disabled="loading || busyForm"
                                        class="button button-outline-red button-width-auto"
                                        @click.prevent="onClickDeleteLogo"
                                    >
                                        Удалить
                                    </button>
                                </div>
                                <div 
                                    v-if="formValues.photo"
                                    class="field__text m--color-green"
                                >
                                    Загружен файл: {{ formValues.photo.split('/').at(-1) }}
                                </div>
                                <div class="field__text">
                                    Рекомендуемый размер: 600х600px. jpg, png, svg
                                </div>
                            </div>
                            <div class="goods__form-photo-pic">
                                <img
                                    v-if="formValues.photo"
                                    :src="formValues.photo" 
                                    alt="" 
                                />
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
            </template>
        </div>
    </vue-final-modal>
</template>

<script>
    import { category as categoryApi, product as productApi } from "@/services"
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
                //good: {},
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
                        groups: true,
                        closeOnSelect: true,
                        label: 'Категория',
                        placeholder: 'Выберите категорию из списка собственных видов деятельности',
                        searchable: true,
                        minChars: 1,
                        validation: 'required',
                        options: async () => {
                            return await categoryApi.getCategoryList({ limit: 9999 }).then(groups => {
                                if (groups.results) {
                                    let options = []
                                    groups.results.map( (group) => {
                                        options.push({
                                            label: group.name,
                                            options: group.categories.map( (cat) => {
                                                return { label: cat.name, value: cat.id }
                                            })
                                        })
                                    })
                                    return options
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
                        placeholder: 'Например: Портландцемент ПЦТ I-100 ГОСТ 1581-96',
                        validation: 'required',
                        inputClass: 'modal-form__input',
                        labelClass: '$reset field__label',
                        outerClass: '$reset modal-form__field m--width-100',
                    }, {
                        $formkit: 'text',
                        name: 'unit',
                        label: 'Единица измерения',
                        placeholder: 'За что назначается цена? Например: шт; м; час; мешок 50кг',
                        // validation: 'required',
                        inputClass: 'modal-form__input',
                        labelClass: '$reset field__label',
                        outerClass: '$reset modal-form__field m--width-100',
                    }, {
                        $formkit: 'maska',
                        name: 'price',
                        maska: { mask: '#*D##', tokens: { 'D': { pattern: /\./ }}},
                        label: 'Цена за единицу, руб',
                        placeholder: 'Цена, соответствующая единице измерения, с учетом НДС',
                        validation: 'required',
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
                if (this.slug) {
                    this.getProduct();
                }
            }
        },
        mounted() {
        },
        methods: {
            getProduct() {
                //this.showLoaderSending = true;
                let params = {
                };
                productApi.getProduct(this.slug, params).then(res => {
                    console.log(res);
                    //this.formValues = res;
                    this.formValues = {
                        category: res.category,
                        name: res.name,
                        price: res.price,
                        unit: res.unit,
                        description: res.description,
                    };

                    console.log('BLA', this.formValues.category);
                    this.formValues.category = {
                        fromParent: true,
                        value: this.formValues.category
                    };
                    this.showLoaderSending = false;
                }).catch(err => {
                    this.showLoaderSending = false;
                    this.loading = false;
                    this.$store.dispatch('showError', err);
                    console.error(err);
                });
            },
            submitAddGoodForm(formData, node) {
                this.showLoaderSending = true;
                //this.loading = true;
                let params = Object.assign({}, this.formValues);
                if (this.slug) {
                    productApi.updateProduct(this.slug, params).then(res => {
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
                    productApi.addProduct(params).then(res => {
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
