<template>
    <div class="tender-start">
        <div class="container">
            <div class="tender-start__title h1">
                {{ $route.params.id ? 'Редактирование тендера' : 'Создание тендера' }}
            </div>
            <FormKit
                id="tenderForm"
                v-model="tenderForm"
                name="tender-start"
                type="form"
                data-loading="showLoaderSending"
                form-class="$reset tender-start__form tender-form"
                :disabled="showLoaderSending"
                :loading="showLoaderSending ? true : undefined"
                :actions="false"
                @submit="tender && tender.id ? updateTender() : createTender()"
            >
                <div class="tender-form__title">
                    Общие параметры тендера
                </div>
                <div class="tender-form__fieldgroup">
                    <FormKitSchema
                        :schema="tenderMainInfoSchema"
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
                                ref="documents"
                                class="lots__list"
                            >
                                <FormKit
                                    id="draft_file"
                                    name="draft_file"
                                    type="file"
                                    outerClass="$reset field--type_hidden"
                                    @change="uploadFileComplete"
                                />
                                <div
                                    v-for="(file, idx) in documents"
                                    :key="idx"
                                    class="lots__item"
                                >
                                    <FormKit
                                        v-if="!file.draft"
                                        :id="String(file.id)"
                                        :name="String(file.id)"
                                        type="file"
                                        outerClass="$reset field--type_hidden"
                                        @change="uploadFileComplete"
                                    />
                                    <div class="lots__item-cell m--filename">
                                        <a
                                            :href="urlPath + file.file"
                                        >
                                            {{ file.name || $helpers.getFilename(file.file) }}
                                        </a>
                                    </div>
                                    <div class="lots__item-cell">
                                        <FormKit
                                            class="input"
                                            type="text"
                                            placeholder="Ввести данные"
                                            :name="`description_${file.id}`"
                                            :value="file.description"
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
                                        {{ lot.quantity }}
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
                                        {{ $helpers.toPrice(lot.price * lot.quantity, { pointer: ',', sign: '₽' }) }}
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
                        @click="resetFormTender"
                    >
                        Отменить
                    </button>
                    <button
                        type="button"
                        class="button button-green"
                        @click="tender && tender.id ? updateTender() : createTender()"
                    >
                        Сохранить как черновик
                    </button>
                    <button
                        type="button"
                        class="button button-green"
                        :disabled="tender === null"
                        @click="publishTender"
                    >
                        Опубликовать
                    </button>
                </div>
            </FormKit>
        </div>

        <ModalAddLot
            :showModal="showAddLotModal"
            :data="lotModalData"
            @hideModal="hideAddLotModal"
            @addLot="addLotModal"
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
    import ModalAddLot from '@/components/modal-add-lot.vue'
    import ModalAddLotFile from '@/components/modal-add-lot-file.vue'
    import { urlPath } from '@/settings'

    export default {
        components: {
            ModalAddLot,
            ModalAddLotFile,
        },
        data() {
            return {
                urlPath,
                tender: null,
                lots: [],
                documents: [],
                lotModalData: null,
                tenderForm: null,
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
                        $formkit: 'multiselect',
                        mode: 'multiple',
                        name: 'category',
                        groups: true,
                        closeOnSelect: false,
                        label: 'Выбор категории',
                        help: 'Выберите категорию к которой относятся закупаемые товары или услуги',
                        validation: 'required',
                        setAfterAsync: true,
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
                        $formkit: 'multiselect',
                        name: 'type',
                        label: 'Тип тендера',
                        help: 'Выберите тип проводимого тендера',
                        validation: 'required',
                        setAfterAsync: true,
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
                        $formkit: 'multiselect',
                        name: 'region',
                        label: 'Выбор региона',
                        help: 'Выберите регион исполнения заказа',
                        validation: 'required',
                        setAfterAsync: true,
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
                        $formkit: 'multiselect',
                        name: 'supervisor',
                        label: 'Контактное лицо',
                        help: 'Выберите из списка зарегистрированных пользователей ответственного за тендер',
                        validation: 'required',
                        setAfterAsync: true,
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
                        label: 'Минимальный шаг цены',
                        help: 'Установите минимальный шаг торгов от текущей ставки от 0,1% до 2%',
                        placeholder: 'Введите минимальный шаг',
                        validation: "reqired",
                        validationMessages: {
                            length: 'Минимальный шаг торгов от текущей ставки от 0,1% до 2%',
                        },
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
                        name: 'description',
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
            }
        },
        watch: {
            '$route.params.id': {
                immediate: true,
                handler() {
                    console.log(this.tenderForm)
                    let id = this.$route.params.id
                    if (id) { // редактирование тендера
                        tenderApi.getTender(id).then(tender => {
                            console.log(tender)
                            this.tender = tender
                            this.documents = tender.documents
                            this.lots = tender.lots

                            // this.tenderForm = tender
                            this.tenderForm.name = tender.name
                            this.tenderForm.category = tender.category
                            this.tenderForm.min_step = tender.min_step
                            this.tenderForm.date_start = tender.date_start.slice(0,19)
                            this.tenderForm.date_end = tender.date_end.slice(0,19)
                            this.tenderForm.region = tender.region
                            this.tenderForm.description = tender.description
                            this.tenderForm.supervisor = tender.supervisor
                            this.tenderForm.type = tender.type
                        }).catch(err => {
                            console.error(err)
                        })
                    } else {
                        this.tender = null
                        this.documents = []
                        this.lots = []
                    }
                }
            }
        },
        mounted() {
        },
        created() {
        },
        methods: {
            publishTender() {
                this.tenderForm.publication = true
                this.updateTender()
            },
            createTender() {
                let tender = Object.assign({}, this.tenderForm)
                tender.category = this.tenderForm.category.map(cat => cat.value)
                tender.region = Number(this.tenderForm.region.value)
                tender.supervisor = Number(this.tenderForm.supervisor.value)
                tender.type = this.tenderForm.type.value
                tender.lots = this.lots.map(lot => lot.id)
                tender.documents = this.documents.map(file => file.id)
                console.log(tender)
                tenderApi.createTender(tender).then(tender => {
                    this.tender = tender
                    console.log(tender)
                    this.$router.push({ name: 'tender-edit', params: { id: this.tender.id } })
                }).catch(err => {
                    console.error(err)
                })
            },
            updateTender() {
                console.log('tenderForm', this.tenderForm)
                console.log('tender', this.tender)
                alert('Обновление тендера в разработке')
                return
                // if (!this.tender && !this.tender.id){
                //     console.error(`Не найден tender.id ${this.tender.id}`)
                //     return
                // }

                // let tender = Object.assign({}, this.tenderForm)
                // tender.lots = this.lots.map(lot => lot.id)
                // tender.documents = this.documents.map(file => file.id)
                // console.log(tender)
                // tenderApi.updateTender(this.tender.id, tender)
                //     .then(tender => {
                //         console.log('UPDATE', tender)
                //         this.tender = tender
                //     }).catch(err => {
                //         console.error(err)
                //     })
            },
            resetFormTender() {
                if (this.tender)
                    this.tenderForm = this.tender
                else
                    this.$formkit.reset('tenderForm')
            },
            onClickUploadFile(id) {
                let input
                if (id) { // for file edit
                    input = document.getElementById(id)
                } else {
                    input = document.getElementById('draft_file')
                }
                let click = new MouseEvent("click")
                input.dispatchEvent(click)
            },
            uploadFileComplete(event) {
                for (let file of event.target.files) {
                    file.id = event.target.id
                    let idx = this.documents.findIndex(f => String(f.id) === file.id)

                    const formData = new FormData()
                    formData.append("file", file)
                    formData.append("description", this.tenderForm[`description_${file.id}`] || file.name)
                    formData.append("publication", true)

                    if (idx >= 0) {
                        this.documents[idx] = file
                        alert('Обновление документов в разработке')
                        return
                    } else {
                        tenderApi.addTenderDocument(this.tender.id, formData)
                            .then(file => {
                                this.documents.push(file)
                                console.log(file)
                            }).catch(err => {
                                console.error(err)
                            })
                    }
                }
            },
            onClickRemoveFile(id) {
                let input = document.getElementById(id)
                input.remove()

                let idx = this.documents.findIndex(f => f.id === id)
                this.documents.splice(idx, 1)
            },
            onClickAddLotModal(id) {
                // передать в модалку данные для редактирования лота
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
            addLotModal(newLot) {
                if (newLot.id) { // обновление лота
                    alert('Обновление лотов в разработке')
                    return
                    // tenderApi.updateTenderLot(this.tender.id, newLot.id, newLot)
                    //     .then(lot => {
                    //         let idx = this.lots.findIndex(lot => lot.id === newLot.id)
                    //         this.lots[idx] = lot
                    //         console.log(lot)
                    //     }).catch(err => {
                    //         console.error(err)
                    //     })
                } else {
                    tenderApi.addTenderLot(this.tender.id, newLot)
                        .then(lot => {
                            this.lots.push(lot)
                            console.log('Добавлен лот', lot)
                        }).catch(err => {
                            console.error(err)
                        })
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
