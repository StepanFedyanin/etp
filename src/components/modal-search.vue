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
    import { category as categoryApi, geo as geoApi } from "@/services"
    // import { async } from "q";

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
                searchFormSchema: [
                    {
                        $formkit: 'multiselect',
                        mode: 'multiple',
                        name: 'status',
                        label: 'Статус тендера',
                        closeOnSelect: false,
                        options: [
                            {
                                label: 'Прием заявок',
                                value: '1'
                            }, {
                                label: 'Этап ставок',
                                value: '2'
                            }, {
                                label: 'Подведение итогов',
                                value: '3'
                            }, {
                                label: 'Тендер завршен',
                                value: '4'
                            }, {
                                label: 'Есть победитель',
                                value: '5'
                            }, {
                                label: 'Нет победителя',
                                value: '6'
                            }
                        ],
                        inputClass: 'modal-form__select',
                        labelClass: '$reset modal-form__label',
                        outerClass: '$reset modal-form__field',
                    }, {
                        $formkit: 'text',
                        name: 'price_from',
                        value: "",
                        label: 'Сумма (от) тендера',
                        placeholder: "",
                        // validation: 'required',
                        inputClass: 'modal-form__input',
                        labelClass: '$reset modal-form__label',
                        outerClass: '$reset modal-form__field',
                    }, {
                        $formkit: 'text',
                        name: 'price_to',
                        value: "",
                        label: 'Сумма (до) тендера',
                        placeholder: "",
                        // validation: 'required',
                        inputClass: 'modal-form__input',
                        labelClass: '$reset modal-form__label',
                        outerClass: '$reset modal-form__field',
                    }, {
                        $formkit: 'date',
                        name: 'date_from',
                        // value: "2021-11-11T11:11",
                        label: 'Дата начала тендера',
                        // validation: 'required',
                        inputClass: 'modal-form__input',
                        labelClass: '$reset modal-form__label',
                        outerClass: '$reset modal-form__field',
                    }, {
                        $formkit: 'date',
                        name: 'date_to',
                        // value: "2022-11-11T11:11",
                        label: 'Дата окончания тендера',
                        // validation: 'required',
                        inputClass: 'modal-form__input',
                        labelClass: '$reset modal-form__label',
                        outerClass: '$reset modal-form__field',
                    }, {
                        $formkit: 'multiselect',
                        mode: 'multiple',
                        name: 'category',
                        label: 'Выбор категории',
                        groups: true,
                        closeOnSelect: false,
                        options: async () => {
                            return await categoryApi.getCategoryList({ limit: 100 }).then(groups => {
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
                        inputClass: 'modal-form__select',
                        labelClass: '$reset modal-form__label',
                        outerClass: '$reset modal-form__field m--category',
                    }, {
                        $formkit: 'multiselect',
                        name: 'region',
                        label: 'Выбор региона',
                        options: async () => {
                            return await geoApi.getRegions({ limit: 100 })
                                .then(regions => {
                                    if (regions) {
                                        let options = regions.map( region => {
                                            return { label: region.name, value: region.id }
                                        })
                                        return options
                                    } else {
                                        console.log('No getRegions data')
                                    }
                                }).catch(err => {
                                    console.error(err)
                                })
                        },
                        inputClass: 'modal-form__select',
                        labelClass: '$reset modal-form__label',
                        outerClass: '$reset modal-form__field m--region',
                    }, {
                        $formkit: 'multiselect',
                        searchable: true,
                        "search-change": this.onINNChange,
                        minChars: 3,
                        options: async () => {
                            return await geoApi.getRegions({ limit: 100 })
                                .then(regions => {
                                    if (regions) {
                                        let options = regions.map( region => {
                                            return { label: region.name, value: region.id }
                                        })
                                        return options
                                    } else {
                                        console.log('No getRegions data')
                                    }
                                }).catch(err => {
                                    console.error(err)
                                })
                        },
                        noOptionsText: '',
                        name: 'inn',
                        label: 'Организатор закупки',
                        placeholder: "Введите название, ИНН",
                        // validation: 'required',
                        innerClass: 'modal-form__input',
                        labelClass: '$reset modal-form__label',
                        outerClass: '$reset modal-form__field m--inn',
                    }, {
                        $formkit: 'checkbox',
                        name: 'type',
                        value: ["all"],
                        help: 'Показать тендера',
                        onInput: this.checkType,
                        options: [
                            {
                                label: 'Все',
                                value: 'all'
                            }, {
                                label: 'Избранные',
                                value: 'favorite'
                            }, {
                                label: 'Я - организатор',
                                value: 'organisation'
                            }, {
                                label: 'Я - исполнитель',
                                value: 'participation'
                            }, 
                        ],
                        // inputClass: 'modal-form__input',
                        // labelClass: 'modal-form__label',
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
        watch: {
            // searchForm: {
            //     handler(a,b,c) {
            //         console.log('handler')
            //         console.log(a,b,c)
            //     }
            // }
        },
        mounted() {
        },
        methods: {
            submitSearchForm(formData) {
                if (formData.category) {
                    formData.category = formData.category.map(cat => cat.value)
                }
                this.$emit('advSearch', formData)
                this.$emit('hideModal')
            },
            onINNChange(query, select$) {
                // select$.refreshOptions()
            },
            checkType(values, node) {
                console.log(values)
                console.log(node.input)
            }
        }
    };
</script>
