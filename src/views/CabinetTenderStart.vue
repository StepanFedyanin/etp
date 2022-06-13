<template>
    <div class="app__main">
        <Breadcrumbs />
        <div class="tender-start">
            <div class="container">
                <div class="tender-start__title h1">
                    Создание тендера
                </div>
                <FormKit
                    v-model="tenderStartForm"
                    name="tender-start"
                    preserve
                    type="form"
                    data-loading="showLoaderSending"
                    form-class="$reset tender-start__form tender-form"
                    :disabled="showLoaderSending"
                    :loading="showLoaderSending ? true : undefined"
                    :actions="false"
                    @submit="submitTenderStart"
                >
                    <div class="tender-form__title">
                        Общие параметры тендера
                    </div>
                    <div class="tender-form__fieldgroup">
                        <FormKitSchema
                            :schema="tenderMainInfoSchema"
                            :data="content"
                        />
                    </div>

                    <div class="tender-form__title">
                        Дата и время проведения тендера
                        <div class="tender-form__prefix">
                            При публикации начинается прием документов и регистрация новых участников.
                        </div>
                    </div>
                    <div class="tender-form__fieldgroup">
                        <FormKitSchema :schema="tenderTimeSchema" />
                    </div>

                    <div v-if="false">
                        <div class="tender-form__title">
                            Документация
                        </div>
                        <div class="tender-form__block">
                            <div
                                class="tenders-form__docs lots m--docs"
                            >
                                <div class="lots__header">
                                    <div class="lots__header-cell m--filename">
                                        Имя файла
                                    </div>
                                    <div class="lots__header-cell m--name">
                                        Описание
                                    </div>
                                </div>
                                <div class="lots__list">
                                    <div
                                        v-for="(file, idx) in uploadedFiles"
                                        :key="idx"
                                        class="lots__item"
                                    >
                                        <div class="lots__item-cell m--filename">
                                            {{ file.name }}
                                        </div>
                                        <div class="lots__item-cell">
                                            {{ file.name }}
                                        </div>
                                        <div class="lots__item-cell m--edit">
                                            <div
                                                class="lots__item-edit"
                                                :target-id="file.id"
                                                @click="fileEdit"
                                            />
                                        </div>
                                        <div class="lots__item-cell m--delete">
                                            <div
                                                class="lots__item-delete"
                                                :target-id="file.id"
                                                @click="fileDelete"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <button
                                type="button"
                                class="button button-outline-green"
                                @click="fileUploadStart"
                            >
                                Добавить документ
                            </button>
                        </div>
                    </div>

                    <div v-if="false">
                        <div class="tender-form__title">
                            Лоты
                        </div>
                        <div class="tender-form__block">
                            <div class="tender-form__lots lots m--tender-start">
                                <div class="lots__header">
                                    <div class="lots__header-cell m--name">
                                        Название
                                    </div>
                                    <div class="lots__header-cell m--nums">
                                        Кол/во
                                    </div>
                                    <div class="lots__header-cell m--unit">
                                        Ед.изм
                                    </div>
                                    <div class="lots__header-cell m--vat">
                                        Ставка НДС
                                    </div>
                                    <div class="lots__header-cell m--price">
                                        Цена
                                    </div>
                                    <div class="lots__header-cell m--sum">
                                        Сумма
                                    </div>
                                    <div class="lots__item-cell m--edit" />
                                    <div class="lots__item-cell m--delete" />
                                </div>
                                <div class="lots__list">
                                    <div class="lots__item">
                                        <div class="lots__item-cell">
                                            Двигатель Д-245, ЗИЛ-131 ( 12v, 136 л. с. ) ЕВРО-2
                                        </div>
                                        <div class="lots__item-cell">
                                            20
                                        </div>
                                        <div class="lots__item-cell">
                                            кг.
                                        </div>
                                        <div class="lots__item-cell">
                                            20%
                                        </div>
                                        <div class="lots__item-cell">
                                            600,55 ₽
                                        </div>
                                        <div class="lots__item-cell">
                                            12 600,55 ₽
                                        </div>
                                        <div class="lots__item-cell m--edit">
                                            <div class="lots__item-edit" />
                                        </div>
                                        <div class="lots__item-cell m--delete">
                                            <div class="lots__item-delete" />
                                        </div>
                                    </div>
                                    <div class="lots__item">
                                        <div class="lots__item-cell">
                                            Двигатель Д-245, ЗИЛ-131 ( 12v, 136 л. с. ) ЕВРО-2
                                        </div>
                                        <div class="lots__item-cell">
                                            20
                                        </div>
                                        <div class="lots__item-cell">
                                            кг.
                                        </div>
                                        <div class="lots__item-cell">
                                            20%
                                        </div>
                                        <div class="lots__item-cell">
                                            600,55 ₽
                                        </div>
                                        <div class="lots__item-cell">
                                            12 600,55 ₽
                                        </div>
                                        <div class="lots__item-cell m--edit">
                                            <div class="lots__item-edit" />
                                        </div>
                                        <div class="lots__item-cell m--delete">
                                            <div class="lots__item-delete" />
                                        </div>
                                    </div>
                                    <div class="lots__item">
                                        <div class="lots__item-cell">
                                            Двигатель Д-245, ЗИЛ-131 ( 12v, 136 л. с. ) ЕВРО-2
                                        </div>
                                        <div class="lots__item-cell">
                                            20
                                        </div>
                                        <div class="lots__item-cell">
                                            кг.
                                        </div>
                                        <div class="lots__item-cell">
                                            20%
                                        </div>
                                        <div class="lots__item-cell">
                                            600,55 ₽
                                        </div>
                                        <div class="lots__item-cell">
                                            12 600,55 ₽
                                        </div>
                                        <div class="lots__item-cell m--edit">
                                            <div class="lots__item-edit" />
                                        </div>
                                        <div class="lots__item-cell m--delete">
                                            <div class="lots__item-delete" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="tender-form__block-actions">
                                <button
                                    type="button"
                                    class="button button-outline-green"
                                >
                                    Добавить лот
                                </button>
                                <button
                                    type="button"
                                    class="button button-outline-green"
                                >
                                    Загрузить из файла
                                </button>
                            </div>
                        </div>
                    </div>

                    <div class="tender-form__actions">
                        <button
                            type="submit"
                            class="button button-green"
                        >
                            Опубликовать
                        </button>
                        <button
                            type="button"
                            class="button button-green"
                        >
                            Сохранить
                        </button>
                        <button
                            type="button"
                            class="button button-red"
                        >
                            Отменить
                        </button>
                    </div>
                </FormKit>
            </div>
        </div>
    </div>
</template>

<script>
    import { tender, category, geo } from "@/services";
    import Breadcrumbs from '@/components/app-breadcrumbs';
    import { reactive } from 'vue'
    let content = reactive({
        category: [],
        region: [],
    })

    export default {
        components: {
            Breadcrumbs
        },
        data() {
            return {
                content,
                tenderStartForm: null,
                showLoaderSending: false,
                tenderMainInfoSchema: [
                    {
                        $formkit: 'text',
                        name: 'name',
                        value: "Тестовый тендер",
                        label: 'Название тендера',
                        help: 'Напишите краткое описание закупаемых товаров или услуг',
                        validation: 'required',
                        __raw__sectionsSchema: {
                            prefix: {
                                $el: 'div',
                                attrs: {
                                    class: 'tender-form__prefix',
                                },
                                children: '$help',
                            },
                        },
                        inputClass: 'tender-form__input',
                        helpClass: 'tender-form__hidden',
                        labelClass: 'tender-form__label',
                        outerClass: 'tender-form__field',
                        messageClass: 'tender-form__message',
                    }, {
                        $formkit: 'select',
                        type: 'select',
                        name: 'category',
                        label: 'Выбор категории',
                        help: 'Выберите категорию к которой относятся закупаемые товары или услуги',
                        // validation: 'required',
                        multiple: true,
                        options: '$category',
                        __raw__sectionsSchema: {
                            prefix: {
                                $el: 'div',
                                attrs: {
                                    class: 'tender-form__prefix',
                                },
                                children: '$help',
                            },
                        },
                        inputClass: 'tender-form__multselect',
                        helpClass: 'tender-form__hidden',
                        labelClass: 'tender-form__label',
                        outerClass: 'tender-form__field m--half',
                        optionClass: '$reset tender-form__option',
                    }, {
                        $formkit: 'select',
                        name: 'type',
                        label: 'Тип тендера',
                        help: 'Выберите тип проводимого тендера',
                        validation: 'required',
                        options: [
                            { label: 'Открытый на понижение', value: 'reduction_opened' },
                            { label: 'Закрытый на понижение', value: 'reduction_closed' },
                        ],
                        __raw__sectionsSchema: {
                            prefix: {
                                $el: 'div',
                                attrs: {
                                    class: 'tender-form__prefix',
                                },
                                children: '$help',
                            },
                        },
                        inputClass: 'tender-form__select',
                        helpClass: 'tender-form__hidden',
                        labelClass: 'tender-form__label',
                        outerClass: 'tender-form__field m--half',
                    }, {
                        $formkit: 'select',
                        name: 'region',
                        label: 'Выбор региона',
                        help: 'Выберите регион исполнения заказа',
                        // validation: 'required',
                        options: '$region',
                        __raw__sectionsSchema: {
                            prefix: {
                                $el: 'div',
                                attrs: {
                                    class: 'tender-form__prefix',
                                },
                                children: '$help',
                            },
                        },
                        inputClass: 'tender-form__select',
                        helpClass: 'tender-form__hidden',
                        labelClass: 'tender-form__label',
                        outerClass: 'tender-form__field m--half',
                    }, {
                        $formkit: 'select',
                        name: 'supervisor',
                        label: 'Контактное лицо',
                        help: 'Выберите из списка зарегистрированных пользователей ответственного за тендер',
                        validation: 'required',
                        options: [1],
                        __raw__sectionsSchema: {
                            prefix: {
                                $el: 'div',
                                attrs: {
                                    class: 'tender-form__prefix',
                                },
                                children: '$help',
                            },
                        },
                        inputClass: 'tender-form__select',
                        helpClass: 'tender-form__hidden',
                        labelClass: 'tender-form__label',
                        outerClass: 'tender-form__field m--half',
                    },
                ],
                tenderTimeSchema: [
                    {
                        $formkit: 'datetime-local',
                        name: 'date_start',
                        value: "2021-11-11T11:11",
                        label: 'Дата начала этапа торгов',
                        help: 'Укажите дату и время начала начала торгов (новые участники не регистрируются)',
                        validation: 'required',
                        __raw__sectionsSchema: {
                            prefix: {
                                $el: 'div',
                                attrs: {
                                    class: 'tender-form__prefix',
                                },
                                children: '$help',
                            },
                        },
                        inputClass: 'tender-form__input',
                        helpClass: 'tender-form__hidden',
                        labelClass: 'tender-form__label',
                        outerClass: 'tender-form__field m--half',
                        messageClass: 'tender-form__message',
                    }, {
                        $formkit: 'datetime-local',
                        name: 'date_end',
                        value: "2022-11-11T11:11",
                        label: 'Дата завершения торгов и выбор победителя',
                        help: 'Укажите дату и время начала окончания тендера и объявления победителя',
                        validation: 'required',
                        __raw__sectionsSchema: {
                            prefix: {
                                $el: 'div',
                                attrs: {
                                    class: 'tender-form__prefix',
                                },
                                children: '$help',
                            },
                        },
                        inputClass: 'tender-form__input',
                        helpClass: 'tender-form__hidden',
                        labelClass: 'tender-form__label',
                        outerClass: 'tender-form__field m--half',
                        messageClass: 'tender-form__message',
                    },
                ],
                uploadedFiles: []
            }
        },
        mounted() {
            category.getCategoryList().then(res => {
                content.category = res.results.map( (cat) => {
                    return { label: cat.name, value: cat.id }
                })
            }).catch(err => {
                console.error(err)
            })

            geo.getRegions().then(res => {
                content.region = res.results.map( region => {
                    return { label: region.name, value: region.id }
                })
            }).catch(err => {
                console.error(err)
            })
        },
        beforeDestroy() {
        },
        created() {
        },
        methods: {
            submitTenderStart(formData) {
                let params = Object.assign({min_step: 1}, formData);
                console.log(params)
                
                tender.createTender(params).then(res => {
                    console.log(res)
                }).catch(err => {
                    console.error(err)
                })
            },
            fileUploadStart(event) {
                let nextElNumber = document.getElementsByClassName('tender-form__file').length + 1
                let click = new MouseEvent("click")
                let newInput = document.createElement('input')

                newInput.id = `file_${nextElNumber}`
                newInput.name = `file_${nextElNumber}`
                newInput.type = 'file'
                // newInput.multiple = true
                newInput.onchange = this.fileUploadComplete
                newInput.classList.add('tender-form__file')

                event.target.before(newInput)
                newInput.dispatchEvent(click)
            },
            fileUploadComplete(event) {
                for (let file of event.target.files) {
                    file.id = event.target.id
                    let update = this.uploadedFiles.findIndex(f => f.id === file.id)

                    if (update >= 0)
                        this.uploadedFiles[update] = file
                    else
                        this.uploadedFiles.push(file)                    
                }
            },
            fileEdit(event) {
                let click = new MouseEvent("click")
                let inputId = event.target.getAttribute('target-id')
                let input = document.getElementById(inputId)

                input.dispatchEvent(click)
            },
            fileDelete(event) {
                let inputId = event.target.getAttribute('target-id')
                let input = document.getElementById(inputId)
                input.remove()

                let del = this.uploadedFiles.findIndex(f => f.id === inputId)

                if (del >= 0)
                    this.uploadedFiles.splice(del, 1)
            }
        }
    };
</script>
