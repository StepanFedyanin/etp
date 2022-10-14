<template>
    <vue-final-modal 
        v-model="show"
        classes="modal__container" 
        content-class="modal__block modal__block--wide"
        @click-outside="$emit('hideModal')"
    >
        <button 
            class="modal__close" 
            @click="$emit('hideModal')"
        >
            <span />
        </button>
        <span class="modal__title" />
        <div
            v-if="loaded"
            class="modal__content"
        >
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
    import { category as categoryApi, geo as geoApi, user as userApi } from "@/services"
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
                loaded: false,
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
                                value: 'bid_accept'
                            }, {
                                label: 'Этап ставок',
                                value: 'bidding_process'
                            }, {
                                label: 'Подведение итогов',
                                value: 'bidding_completed'
                            }, {
                                label: 'Тендер завершен',
                                value: 'closed'
                            /*
                            }, {
                                label: 'Есть победитель',
                                value: 'closed'
                            }, {
                                label: 'Нет победителя',
                                value: 'closed'
                            */
                            }
                        ],
                        inputClass: 'modal-form__select',
                        labelClass: '$reset modal-form__label',
                        outerClass: '$reset modal-form__field',
                        multiselectClass: '$reset m--checkbox'
                    }, {
                        $formkit: 'text',
                        name: 'price_from',
                        value: "",
                        label: 'Сумма (от) тендера, ₽',
                        placeholder: "",
                        // validation: 'required',
                        inputClass: 'modal-form__input',
                        labelClass: '$reset modal-form__label',
                        outerClass: '$reset modal-form__field',
                    }, {
                        $formkit: 'text',
                        name: 'price_to',
                        value: "",
                        label: 'Сумма (до) тендера, ₽',
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
                        mode: 'single',
                        name: 'kind',
                        label: 'Тип тендера',
                        closeOnSelect: false,
                        options: [
                            { label: 'Тендер на понижение', value: 'tender' },
                            { label: 'Запрос цен', value: 'price_request' },
                        ],
                        inputClass: 'modal-form__select',
                        labelClass: '$reset modal-form__label',
                        outerClass: '$reset modal-form__field m--type',
                    }, {
                        $formkit: 'multiselect',
                        name: 'creator',
                        searchable: true,
                        inn: true,
                        minChars: 3,
                        options: async () => {
                            return await userApi.getOrganizations().then(orgs => {
                                console.log(orgs)
                                return orgs.results.map((org) => {
                                    return {
                                        label: org.inn,
                                        kpp: org.kpp,
                                        name: org.name,
                                        city: 'Город',
                                        principal_activity: org.principal_activity,
                                        value: org.id,
                                    }
                                })
                            }).catch(err => {
                                console.error(err);
                            })
                        },
                        noOptionsText: '',
                        label: 'Организатор закупки',
                        placeholder: "Введите название, ИНН",
                        // validation: 'required',
                        innerClass: 'modal-form__input',
                        labelClass: '$reset modal-form__label',
                        outerClass: '$reset modal-form__field m--inn',
                    }, {
                        $formkit: 'multiselect',
                        mode: 'single',
                        name: 'type',
                        label: 'Доступ к тендеру',
                        closeOnSelect: false,
                        options: [
                            { label: 'Открытый', value: 'reduction_opened' },
                            { label: 'Закрытый', value: 'reduction_closed' },
                        ],
                        inputClass: 'modal-form__select',
                        labelClass: '$reset modal-form__label',
                        outerClass: '$reset modal-form__field m--type',
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
                        $formkit: 'checkbox',
                        name: 'owner_type',
                        value: ["all"],
                        help: 'Показать тендеры',
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
                        optionClass: 'modal-form__option',
                        helpClass: '$reset modal-form__label',
                        wrapperClass: 'modal-form__radio',
                        outerClass: '$reset modal-form__field m--owner',
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
            'showModal': {
                immediate: true,
                handler() {
                    if (!this.loaded) {
                        this.loaded = this.showModal;
                    }
                }
            }
        },
        mounted() {
        },
        methods: {
            submitSearchForm(formData) {
                // С данным переопределением не ищет.
                /*
                if (formData.category) {
                    formData.category = formData.category.map(cat => cat.value)
                }
                */
                formData.owner_type.map(type => {
                    formData[type] = true
                })

                if (formData.region)
                    formData.region = [ formData.region ]
                delete formData.owner_type
                this.$emit('advSearch', formData)
                this.$emit('hideModal')
            },
            checkType(values, node) {
                if (values.length > 1) {
                    if (values.at(-1) === 'all') {
                        node.input(['all'])
                    } else {
                        node.input( values.filter(value => value !== 'all') )
                    }
                }
            }
        }
    }
</script>
