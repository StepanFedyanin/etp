<template>
    <vue-final-modal 
        v-model="show"
        classes="modal__container" 
        content-class="modal__block modal__block--wide"
    >
        <button 
            class="modal__close" 
            @click="$emit('hideModal')"
        >
            <span />
        </button>
        <span class="modal__title" />
        <div class="modal__content">
            <FormKit
                v-model="searchForm"
                name="search-form"
                preserve
                type="form"
                data-loading="showLoaderSending"
                form-class="$reset modal-form"
                :disabled="showLoaderSending"
                :loading="showLoaderSending ? true : undefined"
                :actions="false"
                @submit="submitSearchForm"
            >
                <div class="modal-form__fields">
                    <FormKitSchema
                        :schema="searchFormSchema"
                        :data="content"
                    />
                </div>
                <div class="modal-form__actions">
                    <button
                        type="button"
                        class="button button-red"
                        @click="$emit('hideModal')"
                    >
                        Отменить
                    </button>
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
</template>

<script>
    import { category, geo } from "@/services"

    export default {
        props: {
            showModal: {
                type: Boolean,
                default() { return false; }
            },
        },
        data() {
            return {
                searchForm: null,
                showLoaderSending: false,
                content: {
                    status: [],
                    category: [],
                    region: [],
                },
                searchFormSchema: [
                    {
                        $formkit: 'select',
                        name: 'status',
                        label: 'Статус тендера',
                        options: '$status',
                        inputClass: 'modal-form__select',
                        labelClass: '$reset modal-form__label',
                        outerClass: '$reset modal-form__field',
                    }, {
                        $formkit: 'text',
                        name: 'priceFrom',
                        value: "",
                        label: 'Сумма (от) тендера',
                        placeholder: "",
                        // validation: 'required',
                        inputClass: 'modal-form__input',
                        labelClass: '$reset modal-form__label',
                        outerClass: '$reset modal-form__field',
                    }, {
                        $formkit: 'text',
                        name: 'priceTo',
                        value: "",
                        label: 'Сумма (до) тендера',
                        placeholder: "",
                        // validation: 'required',
                        inputClass: 'modal-form__input',
                        labelClass: '$reset modal-form__label',
                        outerClass: '$reset modal-form__field',
                    }, {
                        $formkit: 'date',
                        name: 'date_start',
                        // value: "2021-11-11T11:11",
                        label: 'Дата начала тендера',
                        placeholder: "",
                        // validation: 'required',
                        inputClass: 'modal-form__input',
                        labelClass: '$reset modal-form__label',
                        outerClass: '$reset modal-form__field',
                    }, {
                        $formkit: 'date',
                        name: 'date_end',
                        // value: "2022-11-11T11:11",
                        label: 'Дата окончания тендера',
                        placeholder: "",
                        // validation: 'required',
                        inputClass: 'modal-form__input',
                        labelClass: '$reset modal-form__label',
                        outerClass: '$reset modal-form__field',
                    }, {
                        $formkit: 'select',
                        name: 'category',
                        label: 'Выбор категории',
                        // multiple: true,
                        options: '$category',
                        inputClass: 'modal-form__select',
                        labelClass: '$reset modal-form__label',
                        outerClass: '$reset modal-form__field m--category',
                    }, {
                        $formkit: 'select',
                        name: 'region',
                        label: 'Выбор региона',
                        // multiple: true,
                        options: '$region',
                        inputClass: 'modal-form__select',
                        labelClass: '$reset modal-form__label',
                        outerClass: '$reset modal-form__field m--region',
                    }, {
                        $formkit: 'text',
                        name: 'name',
                        value: "",
                        label: 'Организатор закупки',
                        placeholder: "Введите название, ИНН",
                        // validation: 'required',
                        inputClass: 'modal-form__input',
                        labelClass: '$reset modal-form__label',
                        outerClass: '$reset modal-form__field m--inn',
                    }, {
                        $formkit: 'radio',
                        name: 'type',
                        value: "all",
                        help: 'Показать тендера',
                        options: [
                            {
                                label: 'Все',
                                value: 'all'
                            }, {
                                label: 'Избранные',
                                value: 'favorite'
                            }, {
                                label: 'Я - организатор',
                                value: 'asAuthor'
                            }, {
                                label: 'Я - исполнитель',
                                value: 'asPerformer'
                            }, 
                        ],
                        // inputClass: 'modal-form__input',
                        // labelClass: '$reset modal-form__label',
                        optionClass: 'modal-form__option',
                        helpClass: '$reset modal-form__label',
                        wrapperClass: 'modal-form__radio',
                        outerClass: '$reset modal-form__field m--type',
                    },
                ],
            };
        },
        computed: {
            show() {
                return this.showModal;
            },
        },
        mounted() {
            let params = {
                limit: 100
            }
            category.getCategoryList(params).then(res => {
                if (res.results)
                    this.content.category = res.results.map( (cat) => {
                        return { label: cat.name, value: cat.id }
                    })
                else
                    console.log('No getCategoryList data')
            }).catch(err => {
                console.error(err)
            })

            geo.getRegions(params).then(res => {
                if (res.results)
                    this.content.region = res.results.map( region => {
                        return { label: region.name, value: region.id }
                    })
                else
                    console.log('No getRegions data')
            }).catch(err => {
                console.error(err)
            })
        },
        methods: {
            submitSearchForm(formData) {
                this.$emit('advSearch', formData)
                this.$emit('hideModal')
            }
        }
    };
</script>
