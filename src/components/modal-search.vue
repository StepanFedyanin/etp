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
                form-class="$reset search-form"
                :disabled="showLoaderSending"
                :loading="showLoaderSending ? true : undefined"
                :actions="false"
                @submit="submitSearchForm"
            >
                <div class="search-form__fields">
                    <FormKitSchema
                        :schema="searchFormSchema"
                        :data="content"
                    />
                </div>
                <div class="search-form__actions">
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
    export default {
        props: {
            showModal: {
                type: Boolean,
                default() { return false; }
            },
        },
        data() {
            return {
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
                        inputClass: 'search-form__select',
                        labelClass: '$reset search-form__label',
                        outerClass: '$reset search-form__field',
                    }, {
                        $formkit: 'text',
                        name: 'priceFrom',
                        value: "",
                        label: 'Сумма (от) тендера',
                        placeholder: "",
                        // validation: 'required',
                        inputClass: 'search-form__input',
                        labelClass: '$reset search-form__label',
                        outerClass: '$reset search-form__field',
                    }, {
                        $formkit: 'text',
                        name: 'priceTo',
                        value: "",
                        label: 'Сумма (до) тендера',
                        placeholder: "",
                        // validation: 'required',
                        inputClass: 'search-form__input',
                        labelClass: '$reset search-form__label',
                        outerClass: '$reset search-form__field',
                    }, {
                        $formkit: 'datetime-local',
                        name: 'date_start',
                        value: "2021-11-11T11:11",
                        label: 'Дата начала тендера',
                        placeholder: "",
                        // validation: 'required',
                        inputClass: 'search-form__input',
                        labelClass: '$reset search-form__label',
                        outerClass: '$reset search-form__field',
                    }, {
                        $formkit: 'datetime-local',
                        name: 'date_end',
                        value: "2022-11-11T11:11",
                        label: 'Дата окончания тендера',
                        placeholder: "",
                        // validation: 'required',
                        inputClass: 'search-form__input',
                        labelClass: '$reset search-form__label',
                        outerClass: '$reset search-form__field',
                    }, {
                        $formkit: 'select',
                        name: 'category',
                        label: 'Выбор категории',
                        // multiple: true,
                        options: '$category',
                        inputClass: 'search-form__select',
                        labelClass: '$reset search-form__label',
                        outerClass: '$reset search-form__field m--category',
                    }, {
                        $formkit: 'select',
                        name: 'region',
                        label: 'Выбор региона',
                        // multiple: true,
                        options: '$region',
                        inputClass: 'search-form__select',
                        labelClass: '$reset search-form__label',
                        outerClass: '$reset search-form__field m--region',
                    }, {
                        $formkit: 'text',
                        name: 'name',
                        value: "",
                        label: 'Организатор закупки',
                        placeholder: "Введите название, ИНН",
                        // validation: 'required',
                        inputClass: 'search-form__input',
                        labelClass: '$reset search-form__label',
                        outerClass: '$reset search-form__field m--inn',
                    },
                ],
            };
        },
        computed: {
            show() {
                return this.showModal;
            },
        },
        methods: {
            submitSearchForm(formData) {
                console.log(formData)
            }
        }
    };
</script>
