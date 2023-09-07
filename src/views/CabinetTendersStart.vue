<template>
    <div class="tender-start">
        <div class="container">
            <div class="app__breadcrumbs">
                <router-link
                    :to="{ name: 'home' }"
                    class="app__breadcrumbs-link"
                >
                    Главная
                </router-link>
                <router-link
                    :to="{ name: 'cabinet' }"
                    class="app__breadcrumbs-link"
                >
                    Кабинет
                </router-link>
            </div>
            <div class="tender-start__title h1">
                Создание тендера
            </div>
            <div class="tender-start__types">
                <div class="tender-start__type">
                    <div class="tender-start__type-title">
                        Тендер на понижение
                    </div>
                    <div class="tender-start__type-info">
                        <ul>
                            <li>участники делают ставки ниже начальной</li>
                            <li>победитель — с наименьшей ставкой</li>
                            <li>есть связанные тендеры</li>
                        </ul>
                    </div>
                    <div class="tender-start__type-button">
                        <button 
                            class="button button-green"
                            @click.stop="SelectType('tender')"
                        >
                            Выбрать
                        </button>
                    </div>
                </div>
                <div class="tender-start__type">
                    <div class="tender-start__type-title">
                        Запрос цен без исполнения договора
                    </div>
                    <div class="tender-start__type-info">
                        <ul>
                            <li>можно не указывать начальные цены</li>
                            <li>участники делают любые предложения</li>
                            <li>победителей выбираете только вы</li>
                        </ul>
                    </div>
                    <div class="tender-start__type-button">
                        <button 
                            class="button button-green"
                            @click.stop="SelectType('price')"
                        >
                            Выбрать
                        </button>
                    </div>
                </div>
                <div class="tender-start__type">
                    <div class="tender-start__type-title">
                        Запрос цен с исполнением договора
                    </div>
                    <div class="tender-start__type-info">
                        <ul>
                            <li>можно не указывать начальные цены</li>
                            <li>участники делают любые предложения</li>
                            <li>победитель — с лучшим предложением</li>
                        </ul>
                    </div>
                    <div class="tender-start__type-button">
                        <button 
                            class="button button-green"
                            @click.stop="SelectType('price-fulfilment')"
                        >
                            Выбрать
                        </button>
                    </div>
                </div>
            </div>
            <div class="tender-start__info">
                <div class="tender-start__info-title">
                    Различия типов тендера
                </div>
                <div class="tender-start__info-block">
                    <div class="tender-start__info-title">
                        Тендер на понижение
                    </div>
                    <div class="tender-start__info-description">
                        <ul>
                            <li>Вам нужно создать лоты - товары и услуги - и <strong>указать их начальные цены</strong>;</li>
                            <li>Во время этапа ставок участники тендера могут делать <strong>неограниченное число ставок</strong>;</li>
                            <li>Каждая ставка <strong>должна быть ниже начальной цены лота</strong> или предыдущей ставки;</li>
                            <li>Победителем по каждому лоту признается <strong>участник с наименьшей ставкой</strong> на момент завершения торгов;</li>
                            <li>Вы можете <strong>изменить победителей</strong> на этапе подведения итогов;</li>
                            <li>Победители могут организовать тендер, <strong>связанный с вашим</strong>;</li>
                            <li>Победители должны поставить вам товары или оказать услуги <strong>до указанной даты</strong>.</li>
                        </ul>
                    </div>
                </div>
                <div class="tender-start__info-block">
                    <div class="tender-start__info-title">
                        Запрос цен без исполнения договора
                    </div>
                    <div class="tender-start__info-description">
                        <ul>
                            <li>Вам нужно создать лоты - товары и услуги. <strong>Указывать начальные цены необязательно</strong>;</li>
                            <li>Во время этапа ставок участники тендера могут <strong>сделать одно предложение по каждому лоту</strong>;</li>
                            <li>Участник может <strong>сделать предложение выше начальной стоимости лота</strong>;</li>
                            <li>Никто из участников <strong>не видит предложения конкурентов</strong>;</li>
                            <li>Победителя по каждому лоту выбираете вы при подведении итогов, но <strong>исполнение договора не требуется</strong>.</li>
                        </ul>
                    </div>
                </div>
                <div class="tender-start__info-block">
                    <div class="tender-start__info-title">
                        Запрос цен с исполнением договора
                    </div>
                    <div class="tender-start__info-description">
                        <ul>
                            <li>Вам нужно создать лоты - товары и услуги - и <strong>указать их начальные цены</strong>;</li>
                            <li>Во время этапа торгов участники тендера могут <strong>сделать одну ставку (предложение) по каждому лоту</strong>;</li>
                            <li>Участник может <strong>сделать предложение выше начальной стоимости лота</strong>;</li>
                            <li>Никто из участников <strong>не видит предложения конкурентов</strong>;</li>
                            <li><strong>Предварительным</strong> победителем по каждому лоту признается <strong>участник с наименьшей ставкой</strong> на момент завершения торгов;</li>
                            <li>Вы можете <strong>изменить победителей</strong> на этапе подведения итогов;</li>
                            <li>Победители должны поставить вам товары или оказать услуги <strong>до даты исполнения договора</strong>.</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { tender as tenderApi, category as categoryApi, geo as geoApi, user as userApi } from "@/services"
    import { urlPath } from '@/settings'

    export default {
        components: {
        },
        data() {
            return {
                urlPath,
                defaultTender: null,
                lots: [],
                documents: [],
                lotModalData: null,
                tenderForm: {},
                showLoaderSending: false,
                showAddLotModal: false,
                showFileLotModal: false,
                handlerSubmit: null,
            }
        },
        watch: {
        },
        mounted() {
        },
        created() {
        },
        methods: {
            SelectType(type) {
                this.$router.push({ name: `start-${type}` })
            }
        }
    }
</script>
