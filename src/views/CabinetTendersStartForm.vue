<template>
    <div class="tender-start">
        <div class="container">
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
                <div class="tender-start__title h1">
                    <template
                        v-if="type === 0"
                    >
                        Тендер на понижение 
                    </template>
                    <template
                        v-else-if="type === 1"
                    >
                        Запрос цен без исполнения договора 
                    </template>
                    <template
                        v-else-if="type === 2"
                    >
                        Запрос цен с исполнением договора 
                    </template>
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
                    @submit="this[handlerSubmit]()"
                >
                    <div class="tender-form__title">
                        Общие параметры тендера
                    </div>
                    <div class="tender-form__fieldgroup">
                        <FormKitSchema
                            :schema="tenderMainInfoSchema"
                        />
                    </div>

                    <template
                        v-if="tenderForm.fulfilment && relatedTenders.length"
                    >
                        <div class="tender-form__title">
                            Связанный тендер
                        </div>
                        <div class="tender-form__prefix">
                            Вы можете выбрать тендер, по итогам которого вы решили организовать эту закупку. Тогда ваш заказчик будет знать, что вы приступили к исполнению обязательств.
                        </div>
                        <div class="tender-form__fieldgroup">
                            <FormKitSchema
                                :schema="tenderRelatedSchema"
                            />
                            <template
                                v-if="tenderForm.add_related"
                            >
                                <FormKitSchema
                                    :schema="tenderRelatedTenderSchema"
                                />
                                <template
                                    v-if="tenderForm.related_tender && !refreshRelatedLots"
                                >
                                    <FormKitSchema
                                        :schema="tenderRelatedLotSchema"
                                    />
                                </template>
                            </template>
                        </div>                        
                    </template>
                    <div class="tender-form__title">
                        Дата и время проведения тендера
                        <div class="tender-form__prefix">
                            При публикации начинается прием документов и регистрация новых участников. Время московское.
                        </div>
                    </div>
                    <div class="tender-form__fieldgroup">
                        <FormKitSchema :schema="tenderTimeSchema" />
                    </div>

                    <div class="tender-form__title">
                        Дополнительная информация
                    </div>
                    <div class="tender-form__fieldgroup">
                        <FormKitSchema :schema="tenderAdditionalSchema" />
                    </div>

                    <div
                        v-if="!defaultTender"
                        class="tender-form__prepare"
                    >
                        <button
                            type="button"
                            class="button button-outline-green"
                            @click="defaultTender ? submitForm('updateTender') : submitForm('createTender')"
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
                                v-if="defaultTender && documents && documents.length"
                                class="tender-form__docs lots m--docs"
                            >
                                <div class="lots__header">
                                    <div class="lots__header-cell m--file">
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
                                    <div
                                        v-for="(file, idx) in documents"
                                        :key="idx"
                                        class="lots__item"
                                    >
                                        <!-- <FormKit
                                            v-if="!file.draft"
                                            :id="getFileId(file.id)"
                                            :name="getFileId(file.id)"
                                            type="file"
                                            outerClass="$reset field--type_hidden"
                                            @change="uploadFileComplete"
                                        /> -->
                                        <div class="lots__item-cell m--file">
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
                                                outerClass="$reset"
                                                @focusout="updateDocument(file.id)"
                                            />
                                        </div>
                                        <div class="lots__item-cell m--edit">
                                            <div
                                                class="lots__item-edit"
                                                @click="updateDocument(file.id)"
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
                            <FormKit
                                id="draft_file"
                                name="draft_file"
                                type="file"
                                outerClass="$reset field--type_hidden"
                                @change="uploadFileComplete"
                            />
                            <button
                                type="button"
                                class="button button-outline-green"
                                :disabled="!defaultTender"
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
                                v-if="defaultTender && lots && lots.length"
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
                                        В т.ч. НДС
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
                                        v-for="lot in lots"
                                        :key="lot.id"
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
                                            {{ lot.nds_detail }}
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
                                    :disabled="!defaultTender"
                                    class="button button-outline-green"
                                    @click="onClickAddLotModal(null)"
                                >
                                    Добавить лот
                                </button>
                                <!--button
                                    type="button"
                                    :disabled="!defaultTender"
                                    class="button button-outline-green"
                                    @click="onClickShowFileLotModal"
                                >
                                    Загрузить из файла
                                </button-->
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
                            type="submit"
                            class="button button-green"
                            @click="defaultTender ? submitForm('updateTender') : submitForm('createTender')"
                        >
                            Сохранить как черновик
                        </button>
                        <button
                            type="button"
                            class="button button-green"
                            :disabled="!defaultTender || !lots.length"
                            @click="submitForm('publishTender')"
                        >
                            Опубликовать
                        </button>
                    </div>
                </FormKit>
            </template>
        </div>

        <ModalAddLot
            v-if="showAddLotModal"
            :showModal="showAddLotModal"
            :lotId="lotId"
            :tender="tenderForm"
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
    import { tender as tenderApi, category as categoryApi, geo as geoApi, user as userApi, common as commonApi } from "@/services"
    import ModalAddLot from '@/components/modal-add-lot.vue'
    import ModalAddLotFile from '@/components/modal-add-lot-file.vue'
    import { urlPath } from '@/settings'

    export default {
        components: {
            ModalAddLot,
            ModalAddLotFile,
        },
        props: {
            propType: {
                type: [Number, String],
                default() { return 0; }
            },
        },
        data() {
            return {
                urlPath,
                type: this.propType,
                defaultTender: null,
                lots: [],
                documents: [],
                lotId: null,
                tenderForm: {},
                relatedTenders: [],
                setRelatedLots: false,
                refreshRelatedLots: false,
                showLoaderSending: false,
                showAddLotModal: false,
                showFileLotModal: false,
                handlerSubmit: null,
                tenderMainInfoSchema: [
                    {
                        $formkit: 'hidden',
                        name: 'id',
                        value: Number(this.$route.params.id) || false
                    }, {
                        $formkit: 'text',
                        name: 'name',
                        value: '',
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
                        searchable: true,
                        minChars: 1,
                        help: 'Выберите категорию к которой относятся закупаемые товары или услуги',
                        validation: 'required',
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
                        label: 'Доступ к тендеру',
                        help: 'Открытый — свободный доступ; закрытый — только по приглашениям',
                        validation: 'required',
                        options: [
                            { label: 'Открытый', value: 'reduction_opened' },
                            { label: 'Закрытый', value: 'reduction_closed' },
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
                        searchable: true,
                        minChars: 1,
                        help: 'Выберите регион исполнения заказа',
                        validation: 'required',
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
                    /*
                    }, {
                        $formkit: 'multiselect',
                        name: 'supervisor',
                        searchable: true,
                        minChars: 1,
                        label: 'Контактное лицо',
                        help: 'Выберите из списка зарегистрированных пользователей ответственного за тендер',
                        validation: 'required',
                        options: async () => {
                            return await userApi.getMyOrganizationMembers().then(members => {
                                return members.map((member) => {
                                    return { label: member.full_name, value: member.id }
                                })
                            }).catch(err => {
                                console.error(err);
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
                    */
                    }, {
                        $formkit: 'hidden',
                        name: 'supervisor',
                        value: Number(this.$store.state.user.id)
                    },
                ],
                tenderRelatedSchema: [
                    {
                        $formkit: 'checkbox',
                        id: 'add_related',
                        name: 'add_related',
                        label: 'Добавить связанный тендер',
                        value: false,
                        inputClass: 'tender-form__input',
                        helpClass: 'tender-form__hidden',
                        labelClass: 'tender-form__label',
                        outerClass: 'tender-form__field m--checkbox',
                    }
                ],
                tenderRelatedTenderSchema: [
                    {
                        $formkit: 'multiselect',
                        name: 'related_tender',
                        label: 'Выбор тендера',
                        searchable: true,
                        tender: true,
                        minChars: 1,
                        help: 'Выберите тендер, который вы сейчас проводите, и ваши партнеры будут приглашены к участию в нем',
                        validation: 'required',
                        options: async () => {
                            return await userApi.getOrganizationRelatedTenders()
                                .then(tenders => {
                                    if (tenders) {
                                        this.relatedTenders = tenders;
                                        let options = tenders.map( tender => {
                                            return { label: tender.name, value: tender.id }
                                        })
                                        return options
                                    } else {
                                        console.log('No getTenders data')
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
                    }
                ],
                tenderRelatedLotSchema: [
                    {
                        $formkit: 'multiselect',
                        id: 'related_lot',
                        name: 'related_lot',
                        searchable: true,
                        lot: true,
                        minChars: 1,
                        label: 'Выбор лота',
                        help: 'Выберите лот, для исполнения которого вы организуете собственную закупку',
                        validation: 'required',
                        options: async () => {
                            return await userApi.getOrganizationRelatedLots({ tender: this.tenderForm.related_tender })
                                .then(lots => {
                                    if (lots) {
                                        let options = lots.map( lot => {
                                            return { label: lot.name, value: lot.id, num: lot.num }
                                        })
                                        return options
                                    } else {
                                        console.log('No getLots data')
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
                    }
                ],
                tenderTimeSchema: [
                    {
                        $formkit: 'datetime-local',
                        mode: 'dateTime',
                        name: 'date_start',
                        value: this.$helpers.formatDate(new Date(new Date(this.$helpers.curDateMSK()).getTime() + 5 * 86400000), 'YYYY-MM-DDTHH:mm'),
                        min: this.$helpers.formatDate(new Date(new Date(this.$helpers.curDateMSK()).getTime() + 86400000), 'YYYY-MM-DDTHH:mm'),
                        max: '2099-12-31T23:59',
                        label: 'Дата начала этапа торгов',
                        help: 'Укажите дату и время начала начала торгов (новые участники не регистрируются)',
                        validation: `required|date_after:${this.$helpers.formatDate(new Date(new Date(this.$helpers.curDateMSK()).getTime() + 86400000), 'YYYY-MM-DDTHH:mm')}|date_before:2100-01-01`,
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
                        value: this.$helpers.formatDate(new Date(new Date(this.$helpers.curDateMSK()).getTime() + 10 * 86400000), 'YYYY-MM-DDTHH:mm'),
                        min: this.$helpers.formatDate(new Date(new Date(this.$helpers.curDateMSK()).getTime() + 2 * 86400000), 'YYYY-MM-DDTHH:mm'),
                        max: '2099-12-31T23:59',
                        label: 'Дата завершения торгов и выбор победителя',
                        help: 'Укажите дату и время окончания тендера и объявления предварительных победителей',
                        validation: `required|date_after:${this.$helpers.formatDate(new Date(new Date(this.$helpers.curDateMSK()).getTime() + 2 * 86400000), 'YYYY-MM-DDTHH:mm')}|date_before:2100-01-01`,
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
                        id: 'date_fulfilment',
                        name: 'date_fulfilment',
                        value: this.$helpers.formatDate(new Date(new Date(this.$helpers.curDateMSK()).getTime() + 15 * 86400000), 'YYYY-MM-DDTHH:mm'),
                        min: this.$helpers.formatDate(new Date(new Date(this.$helpers.curDateMSK()).getTime() + 4 * 86400000), 'YYYY-MM-DDTHH:mm'),
                        max: '2099-12-31T23:59',
                        label: 'Дата исполнения обязательств по договору',
                        help: 'Укажите дату, до которой должны быть исполнены все обязательства по тендеру',
                        validation: `required|date_after:${this.$helpers.formatDate(new Date(new Date(this.$helpers.curDateMSK()).getTime() + 4 * 86400000), 'YYYY-MM-DDTHH:mm')}|date_before:2100-01-01`,
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
                        $formkit: 'multiselect',
                        // searchable: true,
                        id: 'min_step',
                        name: 'min_step',
                        label: 'Минимальный шаг цены',
                        help: 'Установите минимальный шаг торгов от текущей ставки от 0,1% до 2%',
                        placeholder: 'Введите минимальный шаг',
                        validation: "required|number",
                        validationMessages: {
                            length: 'Минимальный шаг торгов от текущей ставки от 0,1% до 2%',
                        },
                        options: this.$helpers.range(0.1, 2, 0.1, 1),
                        __raw__sectionsSchema: {
                            prefix: {
                                $el: 'div',
                                attrs: {
                                    class: 'tender-form__prefix',
                                },
                                children: '$help',
                            },
                        },
                        // inputClass: 'tender-form__input',
                        helpClass: 'tender-form__hidden',
                        labelClass: 'tender-form__label',
                        outerClass: 'tender-form__field m--half',
                        messageClass: 'tender-form__message',
                    }, {
                        $formkit: 'multiselect',
                        mode: 'single',
                        name: 'currency',
                        closeOnSelect: true,
                        label: 'Валюта тендера',
                        help: 'Вы можете выбрать рубли или «условные единицы». В комментарии укажите, чему равна 1 у. е.',
                        placeholder: 'Выберите валюту тендера',
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
                        __raw__sectionsSchema: {
                            prefix: {
                                $el: 'div',
                                attrs: {
                                    class: 'tender-form__prefix',
                                },
                                children: '$help',
                            },
                        },
                        helpClass: 'tender-form__hidden',
                        labelClass: 'tender-form__label',
                        outerClass: 'tender-form__field m--half',
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
            'tenderForm.related_tender': {
                immediate: true,
                handler() {
                    this.refreshRelatedLots = true;
                    this.tenderForm.related_lot = null;
                    this.$nextTick(() => {
                        this.refreshRelatedLots = false;
                        if (this.setRelatedLots && typeof this.tenderForm.related_tender !== 'object') {
                            this.tenderForm.related_lot = {
                                fromParent: true,
                                value: {
                                    label: this.defaultTender.related_parent_tender.lot.name,
                                    value: this.defaultTender.related_parent_tender.lot.id
                                }
                            };
                            this.setRelatedLots = false;
                        }
                    });
                    const node = this.$formkit.get('date_fulfilment');
                    if (node) {
                        let tender = this.relatedTenders.filter(item => {
                            return item.id === this.tenderForm.related_tender;
                        })[0];
                        if (tender) {
                            let date = this.$helpers.formatDate(new Date(tender.date_fulfilment), 'YYYY-MM-DDTHH:mm');
                            console.log(date);
                            node.props.max = date;
                            node.props.type = 'text';
                            this.tenderForm.date_fulfilment = date;
                            this.$nextTick(() => {
                                node.props.type = 'datetime-local';
                            });
                        }
                    }
                }                
            }
        },
        mounted() {
            let id = this.$route.params.id
            if (id) { // редактирование тендера
                this.showLoaderSending = true;
                tenderApi.getTender(id).then(tender => {
                    this.defaultTender = tender;
                    this.setTender();
                    if (this.defaultTender.kind === 'tender') {
                        this.type = 0;
                    } else if (this.defaultTender.kind === 'price_request') {
                        if (!this.defaultTender.fulfilment) {
                            this.type = 1;
                        } else {
                            this.type = 2;
                        }
                    }
                    this.showLoaderSending = false;
                }).catch(err => {
                    this.showLoaderSending = false;
                    console.error(err)
                })
            } else {
                this.tenderForm.type = {
                    fromParent: true,
                    value: 'reduction_opened'
                }
                if (this.defaultTender) {
                    this.defaultTender = null
                    this.resetFormTender()
                    this.documents = []
                    this.lots = []
                }
                if (this.type * 1 === 0) {
                    this.tenderForm.kind = 'tender';
                    this.tenderForm.fulfilment = true;
                } else if (this.type * 1 === 1) {
                    this.tenderForm.kind = 'price_request';
                    this.tenderForm.fulfilment = false;
                    const node_fulfilment = this.$formkit.get('date_fulfilment');
                    node_fulfilment.props.disabled = true;
                    node_fulfilment.props.outerClass = 'm--hidden';
                    const node_step = this.$formkit.get('min_step');
                    node_step.props.validation = null;
                    node_step.props.disabled = true;
                    node_step.props.outerClass = 'm--hidden';
                } else if (this.type * 1 === 2) {
                    this.tenderForm.kind = 'price_request';
                    this.tenderForm.fulfilment = true;
                    const node_step = this.$formkit.get('min_step');
                    node_step.props.validation = null;
                    node_step.props.disabled = true;
                    node_step.props.outerClass = 'm--hidden';
                }
            }
            userApi.getOrganizationRelatedTenders().then(tenders => {
                this.relatedTenders = tenders;
                if (!tenders.length) {
                    const node = this.$formkit.get('add_related');
                    if (node) {
                        node.props.disabled = true;
                    }
                }
            }).catch(err => {
                console.error(err)
            })
        },
        created() {
        },
        methods: {
            submitForm(handlerSubmit) {
                this.handlerSubmit = handlerSubmit;
                console.log(this.handlerSubmit);
                this.$formkit.submit('tenderForm');
            },
            publishTender() {
                this.tenderForm.publication = true
                this.updateTender()
            },
            createTender() {
                let tender = this.prepareTender()

                tenderApi.createTender(tender).then(tender => {
                    this.defaultTender = tender
                    this.$router.push({ name: 'tender-edit', params: { id: this.defaultTender.id } })
                }).catch(err => {
                    console.error(err)
                    this.$store.dispatch('showError', err);
                })
            },
            updateTender() {
                if (!this.defaultTender.id){
                    console.error(`Не найден tender.id ${this.defaultTender.id}`)
                    return
                }

                let tender = this.prepareTender()
                tenderApi.updateTender(tender.id, tender)
                    .then(tender => {
                        this.defaultTender = tender
                        //alert('Тендер обновлён')
                        this.$router.push({ name: 'tender', params: { id: tender.id } })
                    }).catch(err => {
                        this.$store.dispatch('showError', err);
                        console.error(err)
                    })
            },
            resetFormTender() {
                this.$router.go(-1);
                this.tenderForm.id = false
                this.tenderForm.name = ''
                this.tenderForm.min_step = null
                this.tenderForm.category = {
                    fromParent: true,
                    value: []
                }
                this.tenderForm.type = {
                    fromParent: true,
                    value: 'reduction_opened'
                }
                this.tenderForm.region = {
                    fromParent: true,
                    value: null
                }
                this.tenderForm.currency = {
                    fromParent: true,
                    value: null
                }
                /*
                this.tenderForm.supervisor = {
                    fromParent: true,
                    value: null
                }
                */
                this.tenderForm.date_start = null
                this.tenderForm.date_end = null
                this.tenderForm.description = null
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

                    const formData = new FormData()
                    formData.append("file", file)
                    formData.append("description", this.tenderForm[`description_${file.id}`] || file.name)
                    formData.append("publication", true)
                    tenderApi.addTenderDocument(this.defaultTender.id, formData)
                        .then(newFile => {
                            this.documents.push(newFile)
                            // this.defaultTender.documents = this.documents
                        }).catch(err => {
                            console.error(err)
                        })
                }
            },
            updateDocument(id) {
                if (this.tenderForm[`description_${id}`]) {
                    let idx = this.documents.findIndex(f => f.id === id)
                    if (idx >= 0) {
                        const formData = new FormData()
                        formData.append("description", this.tenderForm[`description_${id}`])
                        tenderApi.updateTenderDocument(this.defaultTender.id, this.documents[idx].id, formData)
                            .then(newFile => {
                                // console.log(newFile)
                                this.documents[idx] = newFile
                                // this.defaultTender.documents = this.documents
                            }).catch(err => {
                                console.error(err)
                            })
                    }
                }
            },
            onClickRemoveFile(id) {
                let idx = this.documents.findIndex(f => f.id === id)
                if (idx >= 0) {
                    tenderApi.deleteTenderDocument(this.defaultTender.id, this.documents[idx].id)
                        .then(res => {
                            this.documents.splice(idx, 1)
                            console.log(res);
                            // this.defaultTender.documents = this.documents
                        }).catch(err => {
                            console.error(err)
                        })
                }
            },
            onClickAddLotModal(id) {
                // передать в модалку данные для редактирования лота
                if (id) {
                    let idx = this.lots.findIndex(lot => lot.id === id)
                    this.lotId = id //this.lots[idx]
                } else {
                    this.lotId = null
                }

                this.showAddLotModal = true
            },
            hideAddLotModal() {
                this.showAddLotModal = false
                this.lotId = null
            },
            addLotModal(newLot) {
                if (newLot.id) { // обновление лота
                    tenderApi.updateTenderLot(this.defaultTender.id, newLot.id, newLot)
                        .then(lot => {
                            let idx = this.lots.findIndex(lot => lot.id === newLot.id)
                            this.lots[idx] = lot
                            // console.log(lot)
                        }).catch(err => {
                            console.error(err)
                        })
                } else {
                    tenderApi.addTenderLot(this.defaultTender.id, newLot)
                        .then(lot => {
                            this.lots.push(lot)
                            // console.log('Добавлен лот', lot)
                        }).catch(err => {
                            console.error(err)
                        })
                }
            },
            onClickRemoveLot(id) {
                let idx = this.lots.findIndex(lot => lot.id === id)
                if (idx >= 0) {
                    tenderApi.deleteTenderLot(this.defaultTender.id, id)
                        .then(res => {
                            console.log(res);
                            this.lots.splice(idx, 1)
                        }).catch(err => {
                            console.error(err)
                        })
                }
            },
            onClickShowFileLotModal() {
                this.showFileLotModal = true
            },
            uploadFileLot(file) {
                console.log(file)
                alert('Добавление файла в разработке')
            },
            hideFileLotModal() {
                this.showFileLotModal = false
            },
            // getFileId(id) {
            //     return `file_${String(id)}`
            // },
            setTender() {
                this.lots = this.defaultTender.lots
                this.documents = this.defaultTender.documents
                this.tenderForm.id = this.defaultTender.id
                this.tenderForm.kind = this.defaultTender.kind
                this.tenderForm.fulfilment = this.defaultTender.fulfilment
                this.tenderForm.name = this.defaultTender.name
                this.tenderForm.min_step = {
                    fromParent: true,
                    value: this.defaultTender.min_step
                }
                this.tenderForm.category = {
                    fromParent: true,
                    value: this.defaultTender.category.map(cat => {return {value: cat}})
                }
                this.tenderForm.type = {
                    fromParent: true,
                    value: this.defaultTender.type
                }
                this.tenderForm.region = {
                    fromParent: true,
                    value: {
                        label: this.defaultTender.region_detail.name,
                        value: this.defaultTender.region
                    }
                }
                this.tenderForm.currency = {
                    fromParent: true,
                    value: {
                        label: this.defaultTender.currency_detail,
                        value: this.defaultTender.currency
                    }
                }
                /*
                this.tenderForm.supervisor = {
                    fromParent: true,
                    value: {
                        label: this.defaultTender.contact_person.full_name,
                        value: this.defaultTender.supervisor
                    }
                }
                */
                this.tenderForm.supervisor = this.defaultTender.supervisor;
                this.tenderForm.date_start = this.defaultTender.date_start.slice(0,16)
                this.tenderForm.date_end = this.defaultTender.date_end.slice(0,16)
                this.tenderForm.date_fulfilment = this.defaultTender.date_fulfilment.slice(0,16)
                this.tenderForm.description = this.defaultTender.description;
                if (this.defaultTender.related_parent_tender) {
                    this.setRelatedLots = true;
                    this.tenderForm.related_tender = {
                        fromParent: true,
                        value: {
                            label: this.defaultTender.related_parent_tender.name,
                            value: this.defaultTender.related_parent_tender.id
                        }
                    };
                    this.tenderForm.add_related = true;
                    
                    this.$nextTick(() => {
                        this.tenderForm.related_lot = {
                            fromParent: true,
                            value: {
                                label: this.defaultTender.related_parent_tender.lot.name,
                                value: this.defaultTender.related_parent_tender.lot.id
                            }
                        };
                    });
                    
                }

                this.$nextTick(() => {
                    if (this.defaultTender.kind === 'price_request') {
                        const node_step = this.$formkit.get('min_step');
                        node_step.props.validation = null;
                        node_step.props.disabled = true;
                        node_step.props.outerClass = 'm--hidden';
                        node_step.props.type = 'text';
                        this.tenderForm.min_step = 0;
                    }
                });
            },
            prepareTender() {
                let tender = {}
                tender = this.tenderForm

                // console.log('tenderForm', this.tenderForm)
                // tender.id = this.tenderForm.id
                // tender.name = this.tenderForm.name
                // tender.category = this.tenderForm.category
                // tender.type = this.tenderForm.type
                // tender.region = this.tenderForm.region
                // tender.supervisor = this.tenderForm.supervisor
                // tender.date_start = this.tenderForm.date_start
                // tender.date_end = this.tenderForm.date_end
                // tender.min_step = this.tenderForm.min_step
                // tender.description = this.tenderForm.description
                tender.lots = this.lots
                tender.documents = this.documents
                // console.log('tender', tender)
                return tender
            }
        }
    }
</script>
