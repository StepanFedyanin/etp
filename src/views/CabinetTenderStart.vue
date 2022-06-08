<template>
    <div class="app__main">
        <Breadcrumbs />
        <div class="tender-start">
            <div class="container">
                <div class="tender-start__title h1">
                    Создание тендера
                </div>
                <FormKit
                    v-model="tenderStart"
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
                        <FormKitSchema :schema="tenderStartForm" />
                    </div>

                    <div class="tender-form__title">
                        Дата и время проведения тендера
                        <div class="tender-form__prefix">
                            При публикации начинается прием документов и регистрация новых участников.
                        </div>
                    </div>
                    <div class="tender-form__fieldgroup">
                        <FormKitSchema :schema="tenderTimeForm" />
                    </div>

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
    import Breadcrumbs from '@/components/app-breadcrumbs';

    export default {
        components: {
            Breadcrumbs
        },
        data() {
            return {
                tenderStart: {},
                showLoaderSending: false,
                tenderStartForm: [
                    {
                        $formkit: 'text',
                        name: 'name',
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
                        name: 'category',
                        label: 'Выбор категории',
                        help: 'Выберите категорию к которой относятся закупаемые товары или услуги',
                        validation: 'required',
                        options: ['Автомобильные запчасти'],
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
                        name: 'type',
                        label: 'Тип тендера',
                        help: 'Выберите тип проводимого тендера',
                        validation: 'required',
                        options: ['Открытый'],
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
                        validation: 'required',
                        options: ['Челябинская область'],
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
                        name: 'person',
                        label: 'Контактное лицо',
                        help: 'Выберите из списка зарегистрированных пользователей ответственного за тендер',
                        validation: 'required',
                        options: ['Петров Иван Иванович'],
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
                tenderTimeForm: [
                    {
                        $formkit: 'datetime-local',
                        name: 'timeStart',
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
                        name: 'timeEnd',
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
        },
        beforeDestroy() {
        },
        created() {
        },
        methods: {
            submitTenderStart(event) {
                console.log(event)
            },
            fileUploadStart(event) {
                let countElement = document.getElementsByClassName('tender-form__file').length + 1
                let click = new MouseEvent("click")
                let newInput = document.createElement('input')

                newInput.id = `file_${countElement}`
                newInput.name = `file_${countElement}`
                newInput.type = 'file'
                // newInput.multiple = true
                newInput.onchange = this.fileUploadComplete
                newInput.classList.add('tender-form__file')

                event.target.before(newInput)
                newInput.dispatchEvent(click)
            },
            fileUploadComplete(event) {
                for (let file of event.target.files) {
                    let updated = false
                    file.id = event.target.id
                    
                    for (let i = 0; i < this.uploadedFiles.length; i++) {
                        if (this.uploadedFiles[i].id === file.id) {
                            this.uploadedFiles[i] = file
                            updated = true
                            break
                        }
                    }

                    if (!updated)
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

                for (let i = 0; i < this.uploadedFiles.length; i++) {
                    if (this.uploadedFiles[i].id === inputId) {
                        this.uploadedFiles.splice(i, 1)
                        break
                    }
                }
            }
        }
    };
</script>
