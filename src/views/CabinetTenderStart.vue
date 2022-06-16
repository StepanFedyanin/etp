<template>
    <div class="app__main">
        <Breadcrumbs />
        <div class="tender-start">
            <div class="container">
                <div class="tender-start__title h1">
                    Создание тендера
                </div>
                <FormKit
                    id="tenderStartForm"
                    v-model="tenderStartForm"
                    name="tender-start"
                    type="form"
                    data-loading="showLoaderSending"
                    form-class="$reset tender-start__form tender-form"
                    :disabled="showLoaderSending"
                    :loading="showLoaderSending ? true : undefined"
                    :actions="false"
                    @submit="submitTenderSave"
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

                    <div class="tender-form__title">
                        Дополнительая информация
                    </div>
                    <div class="tender-form__fieldgroup">
                        <FormKitSchema :schema="tenderAdditionalSchema" />
                    </div>

                    <div
                        v-if="!tender"
                        class="tender-form__prepare"
                    >
                        <button
                            type="submit"
                            class="button button-outline-green"
                        >
                            Сохранить параметры
                        </button>
                        <div class="tender-form__prepare-info">
                            Сохраните параметры тендера, чтобы перейти 
                            <br>
                            к добавлению лотов и документов
                        </div>
                    </div>

                    <div>
                        <div class="tender-form__title">
                            Документация
                        </div>
                        <div class="tender-form__block">
                            <div
                                v-if="tender"
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
                                <div
                                    ref="docs"
                                    class="lots__list"
                                >
                                    <div
                                        v-for="(file, idx) in uploadedFiles"
                                        :key="idx"
                                        class="lots__item"
                                    >
                                        <div class="lots__item-cell m--filename">
                                            {{ file.name }}
                                        </div>
                                        <div class="lots__item-cell">
                                            <FormKitSchema
                                                :schema="tenderDocInputSchema"
                                                :data="{
                                                    fileId: `description_${idx}`
                                                }"
                                            />
                                        </div>
                                        <div class="lots__item-cell m--edit">
                                            <div
                                                class="lots__item-edit"
                                                @click="onClickUploadFile(file.id)"
                                            />
                                        </div>
                                        <div class="lots__item-cell m--delete">
                                            <div
                                                class="lots__item-delete"
                                                @click="onClickRemoveFile(file.id)"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <button
                                type="button"
                                class="button button-outline-green"
                                :disabled="tender === null"
                                @click="onClickUploadFile(null)"
                            >
                                Добавить документ
                            </button>
                        </div>
                    </div>

                    <div>
                        <div class="tender-form__title">
                            Лоты
                        </div>
                        <div class="tender-form__block">
                            <div
                                v-if="tender"
                                class="tender-form__lots lots m--tender-start"
                            >
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
                                <div
                                    class="lots__list"
                                >
                                    <div
                                        v-for="(lot, idx) in lots"
                                        :key="idx"
                                        class="lots__item"
                                    >
                                        <div class="lots__item-cell">
                                            {{ lot.name }}
                                        </div>
                                        <div class="lots__item-cell">
                                            {{ lot.amount }}
                                        </div>
                                        <div class="lots__item-cell">
                                            {{ lot.unit }}
                                        </div>
                                        <div class="lots__item-cell">
                                            {{ lot.vat }}
                                        </div>
                                        <div class="lots__item-cell">
                                            {{ $helpers.toPrice(lot.price, { pointer: ',', sign: '₽' }) }}
                                        </div>
                                        <div class="lots__item-cell">
                                            {{ $helpers.toPrice(lot.price * lot.amount, { pointer: ',', sign: '₽' }) }}
                                        </div>
                                        <div class="lots__item-cell m--edit">
                                            <div
                                                class="lots__item-edit"
                                                @click="onClickAddLotModal(lot.id)"
                                            />
                                        </div>
                                        <div class="lots__item-cell m--delete">
                                            <div
                                                class="lots__item-delete"
                                                @click="onClickRemoveLot(lot.id)"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="tender-form__block-actions">
                                <button
                                    type="button"
                                    :disabled="tender === null"
                                    class="button button-outline-green"
                                    @click="onClickAddLotModal(null)"
                                >
                                    Добавить лот
                                </button>
                                <button
                                    type="button"
                                    :disabled="tender === null"
                                    class="button button-outline-green"
                                    @click="onClickShowFileLotModal"
                                >
                                    Загрузить из файла
                                </button>
                            </div>
                        </div>
                    </div>
                    <div class="tender-form__actions">
                        <button
                            type="button"
                            class="button button-red"
                            @click="submitTenderStop"
                        >
                            Отменить
                        </button>
                        <button
                            type="submit"
                            class="button button-green"
                        >
                            Сохранить как черновик
                        </button>
                        <button
                            type="button"
                            class="button button-green"
                            :disabled="tender === null"
                            @click="submitTenderPublication"
                        >
                            Опубликовать
                        </button>
                    </div>
                </FormKit>
            </div>
        </div>

        <ModalAddLot
            :showModal="showAddLotModal"
            :data="lotModalData"
            @hideModal="hideAddLotModal"
            @addLot="addLot"
        />
        <ModalAddLotFile
            :showModal="showFileLotModal"
            @hideModal="hideFileLotModal"
            @uploadFileLot="uploadFileLot"
        />
    </div>
</template>

<script>
    import { tender as tenderApi, category as categoryApi, geo as geoApi } from "@/services"
    import Breadcrumbs from '@/components/app-breadcrumbs'
    import ModalAddLot from '@/components/modal-add-lot.vue'
    import ModalAddLotFile from '@/components/modal-add-lot-file.vue'

    export default {
        components: {
            Breadcrumbs,
            ModalAddLot,
            ModalAddLotFile,
        },
        data() {
            return {
                tender: null,
                content: {
                    category: [],
                    region: [],
                },
                lots: [],
                lotModalData: null,
                tenderStartForm: null,
                showLoaderSending: false,
                showAddLotModal: false,
                showFileLotModal: false,
                tenderMainInfoSchema: [
                    {
                        $formkit: 'hidden',
                        name: 'id',
                    }, {
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
                tenderAdditionalSchema: [
                    {
                        $formkit: 'text',
                        name: 'min_step',
                        // value: "",
                        label: 'Минимальный шаг цены',
                        help: 'Установите минимальный шаг торгов от текущей ставки от 0,1% до 2%',
                        placeholder: 'Введите минимальный шаг',
                        // validation: "reqired",
                        // validationMessages: {
                        //     length: 'Минимальный шаг торгов от текущей ставки от 0,1% до 2%',
                        // },
                        __raw__sectionsSchema: {
                            prefix: {
                                $el: 'div',
                                attrs: {
                                    class: 'tender-form__prefix',
                                },
                                children: '$help',
                            },
                        },
                        inputClass: 'tender-form__input m--half',
                        helpClass: 'tender-form__hidden',
                        labelClass: 'tender-form__label',
                        outerClass: 'tender-form__field',
                        messageClass: 'tender-form__message',
                    }, {
                        $formkit: 'textarea',
                        name: 'comment',
                        label: 'Комментарий к тендеру',
                        help: 'Укажите вариант(ы) оплаты и другие особенности сделки (в свободной форме)',
                        placeholder: 'Введите комментарий',
                        __raw__sectionsSchema: {
                            prefix: {
                                $el: 'div',
                                attrs: {
                                    class: 'tender-form__prefix',
                                },
                                children: '$help',
                            },
                        },
                        inputClass: 'tender-form__input m--half',
                        helpClass: 'tender-form__hidden',
                        labelClass: 'tender-form__label',
                        outerClass: 'tender-form__field',
                        messageClass: 'tender-form__message',
                    },
                ],
                tenderDocInputSchema: [
                    {
                        $formkit: 'text',
                        name: '$fileId',
                        placeholder: 'Ввести данные',
                        inputClass: '$reset tender-form__input',
                        helpClass: '$reset tender-form__hidden',
                        labelClass: '$reset tender-form__label',
                        outerClass: '$reset tender-form__field',
                    }
                ],
                uploadedFiles: []
            }
        },
        mounted() {
            let params = {
                limit: 100
            }
            categoryApi.getCategoryList(params).then(res => {
                if (res.results)
                    this.content.category = res.results.map( (cat) => {
                        return { label: cat.name, value: cat.id }
                    })
                else
                    console.log('No getCategoryList data')
            }).catch(err => {
                console.error(err)
            })

            geoApi.getRegions(params).then(res => {
                if (res.results)
                    this.content.region = res.results.map( region => {
                        return { label: region.name, value: region.id }
                    })
                else
                    console.log('No getRegions data')
            }).catch(err => {
                console.error(err)
            })

            // для редактирования тендера
            if (this.tender.id) {
                // let params = {
                //     id: this.id,
                // }

                // tenderApi.getTenderById(params).then(res => {
                //     console.log(res)
                // }).catch(err => {
                //     console.error(err)
                // })
            }
        },
        created() {
        },
        methods: {
            submitTenderPublication() {
            },
            submitTenderSave(formData) {
                // console.log(this.tenderStartForm)
                let params = Object.assign({}, formData)

                tenderApi.createTender(params).then(res => {
                    this.tender = res
                    this.$router.push({ name: 'tender-start-edit', params: { id: this.tender.id } })
                }).catch(err => {
                    console.error(err)
                })
            },
            submitTenderStop() {
                this.$formkit.reset('tenderStartForm')
            },
            onClickUploadFile(fileId) {
                // for file edit
                let input
                let fileClass = 'field--type_hidden'
                if (fileId) {
                    input = document.getElementById(fileId)
                } else {
                    fileId = `file_id_${document.getElementsByClassName(fileClass).length + 1}`
                    input = document.createElement('input')
                    input.id = fileId
                    input.name = fileId
                    input.type = 'file'
                    // newInput.multiple = true
                    input.onchange = this.uploadFileComplete
                    input.classList.add(fileClass)
                    this.$refs.docs.before(input)
                }
                let click = new MouseEvent("click")
                input.dispatchEvent(click)
            },
            uploadFileComplete(event) {
                for (let file of event.target.files) {
                    file.id = event.target.id
                    let idx = this.uploadedFiles.findIndex(f => f.id === file.id)

                    if (idx >= 0)
                        this.uploadedFiles[idx] = file
                    else
                        this.uploadedFiles.push(file)                    
                }
            },
            onClickRemoveFile(id) {
                let input = document.getElementById(id)
                input.remove()

                let idx = this.uploadedFiles.findIndex(f => f.id === id)
                this.uploadedFiles.splice(idx, 1)
            },
            onClickAddLotModal(id) {
                // передать в модалку данные на редакирование лота
                if (id) {
                    let idx = this.lots.findIndex(lot => lot.id === id)
                    this.lotModalData = this.lots[idx]
                } else {
                    this.lotModalData = null
                }

                this.showAddLotModal = true
            },
            hideAddLotModal() {
                this.showAddLotModal = false
                this.lotModalData = null
            },
            addLot(formData) {
                // замена лота
                if (formData.id) {
                    let idx = this.lots.findIndex(lot => lot.id === formData.id)
                    this.lots[idx] = formData
                } else {
                    formData.id = `lot_id_${this.lots.length + 1}`
                    this.lots.push(formData)
                }
            },
            onClickRemoveLot(id) {
                let idx = this.lots.findIndex(lot => lot.id === id)
                this.lots.splice(idx, 1)
            },
            onClickShowFileLotModal() {
                this.showFileLotModal = true
            },
            uploadFileLot(file) {
                console.log(file)
            },
            hideFileLotModal() {
                this.showFileLotModal = false
            },
        }
    }
</script>
