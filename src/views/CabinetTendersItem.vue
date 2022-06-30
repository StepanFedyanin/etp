<template>
    <div class="cabinet tender">
        <div class="container">
            <template
                v-if="showLoaderSending"
            >
                <div class="tender__loader loader">
                    <div class="spinner" /> Загрузка данных
                </div>
            </template>
            <template
                v-else-if="tender"
            >
                <div class="tender__block">
                    <div class="tender__data">
                        <div 
                            class="tender__data-icon"
                            :class="tender.status === 'closed' ? 'm--finish' : 'm--status'"
                        />
                        <div class="tender__data-inner">
                            <div class="tender__data-title">
                                Статус
                            </div>
                            <div class="tender__data-info">
                                {{ tender.status_detail }}
                            </div>
                        </div>
                    </div>
                    <div class="tender__data">
                        <div 
                            class="tender__data-icon m--timer"
                            :class="tender.limit.secs > 0 ? 'm--green' : 'm--red'"
                        />
                        <div class="tender__data-inner">
                            <div class="tender__data-title">
                                Осталось времени
                            </div>
                            <div class="tender__data-info">
                                <template
                                    v-if="tender.limit > 0"
                                >
                                    {{ $helpers.dateRangeToDaysHours(new Date(), new Date(tender.date_end)) }}
                                </template>
                                <template
                                    v-else
                                >
                                    —
                                </template>
                            </div>
                        </div>
                    </div>
                    <div class="tender__data">
                        <div class="tender__data-icon m--clock" />
                        <div class="tender__data-inner">
                            <div class="tender__data-title">
                                Продолжительность
                            </div>
                            <div class="tender__data-info">
                                {{ $helpers.toHHMMSS(tender.duration) }} 
                                <span
                                    v-if="tender.prolong > 0"
                                    class="m--color-green"
                                >
                                    +{{ tender.prolong }} мин.
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                <div
                    class="tender__info"
                >
                    <div class="tender__info-left">
                        <div class="tender__info-title">
                            {{ tender.name }}
                        </div>
                        <div class="tender__info-param">
                            <span>Заказчик:</span> <a href="#">{{ tender.organization.name }}</a>
                        </div>
                        <div class="tender__info-param">
                            <span>Категории: </span> 
                            <template
                                v-for="category in tender.category_detail"
                            >
                                {{ category.name }}, 
                            </template>
                        </div>
                        <div class="tender__info-param">
                            <span>Регион:</span> {{ tender.region_detail ? tender.region_detail.name : '' }}
                        </div>
                        <div class="tender__info-param">
                            <span>Дополнительная информация:</span> {{ tender.description }}
                        </div>
                    </div>
                    <div class="tender__info-right">
                        <div class="tender__info-price">
                            {{ $helpers.toPrice(tender.price, { sign: '₽' }) }}
                        </div>
                        <div class="tender__info-param">
                            <span>Аукцион №{{ tender.id }}</span>
                        </div>
                        <div class="tender__info-param">
                            <span>Объявлено:</span> {{ $helpers.formatDate(new Date(tender.date_start), 'DD.MM.YYYY HH:mm') }} МСК
                        </div>
                        <div class="tender__info-param">
                            <span>Тип аукциона:</span> {{ types[tender.type] }}
                        </div>
                        <div class="tender__info-param">
                            <span>Минимальный шаг ставки:</span> {{ tender.min_step }}
                        </div>
                        <div class="tender__info-param">
                            <span>Лоты:</span> {{ tender.lot_count }}
                        </div>
                    </div>
                </div>

                <div class="tender__actions">
                    <div class="tender__actions-title">
                        Действия с тендером
                    </div>
                    <div class="tender__actions-buttons">
                        <button 
                            class="button button-red"
                            @click.stop=""
                        >
                            Отменить тендер
                        </button>
                        <button 
                            class="button button-green"
                            @click.stop=""
                        >
                            Отправить приглашение
                        </button>
                    </div>
                </div>

                <div class="tender__block">
                    <div
                        class="tender__docs"
                    >
                        <div class="tender__docs-title">
                            Документы:
                        </div>
                        <div class="tender__docs-list">
                            <template
                                v-if="tender.documents.length"
                            >
                                <div class="tender__docs-item">
                                    <div class="tender__docs-cell m--title">
                                        Файл
                                    </div>
                                    <div class="tender__docs-cell m--title">
                                        Описание
                                    </div>
                                </div>
                                <template 
                                    v-for="doc in tender.documents"
                                >
                                    <div 
                                        v-if="doc.publication"
                                        :key="`doc-${doc.id}`"
                                        class="tender__docs-item"
                                    >
                                        <a
                                            :href="doc.file"
                                            class="tender__docs-cell m--file"
                                            target="_blank"
                                        >
                                            {{ doc.name }}
                                        </a>
                                        <div class="tender__docs-cell m--desc">
                                            {{ doc.description }}
                                        </div>
                                    </div>
                                </template>
                            </template>
                            <template
                                v-else
                            >
                                <div class="tender__docs-item">
                                    <div class="tender__docs-cell m--title">
                                        —
                                    </div>
                                </div>
                            </template>
                        </div>
                    </div>
                    <div
                        class="tender__contact"
                    >
                        <div class="tender__contact-title">
                            Контактное лицо
                        </div>
                        <template
                            v-if="tender.contact_person"
                        >
                            <div class="tender__contact-param">
                                <span>Менеджер:</span> {{ tender.contact_person.full_name }}
                            </div>
                            <div class="tender__contact-param">
                                <span>Телефон:</span> {{ tender.contact_person.phone || '—' }}
                            </div>
                            <div class="tender__contact-param">
                                <span>E-mail:</span> {{ tender.contact_person.contact_email || tender.contact_person.email || '—' }}
                            </div>
                        </template>
                        <template
                            v-else
                        >
                            —
                        </template>
                    </div>
                </div>

                <TenderOrganizationStatus
                    v-if="tender.bet_enabled && user.id !== tender.creator"
                    :tender="tender"
                    @getTenderData="getTenderData"
                />

                <div 
                    v-if="tender.user_participation && tender.user_participation.status === 'participant'"
                    class="tender__bids"
                >
                    <div class="tender__bids-title">
                        Быстрые ставки
                    </div>
                    <div class="tender__bids-block">
                        <div class="tender__bids-info">
                            Минимальный шаг цены - {{ tender.min_step }}%
                        </div>
                        <button 
                            class="button button-outline-green m--right"
                            @click="onClickRequest()"
                        >
                            По проигрывающим лотам
                        </button>
                        <button 
                            class="button button-outline-green"
                            @click="onClickRequest()"
                        >
                            По всем лотам
                        </button>
                    </div>
                </div>

                <TenderLots
                    :lots="tender.lots"
                />
                <TenderBids
                    v-if="tender.user_participation && tender.user_participation.status === 'participant'"
                    @AddLotOffer="onClickAddLotOffer"
                />

                <TenderParticipants
                    :tender="tender"
                    :participants="participants"
                    @getTenderData="getTenderData"
                />

                <!--
                <div class="tender__lots lots m--with-button">
                    <div class="lots__header">
                        <div class="lots__header-cell m--position">
                            №
                        </div>
                        <div class="lots__header-cell m--name">
                            Название
                        </div>
                        <div class="lots__header-cell m--nums">
                            Кол/во
                        </div>
                        <div class="lots__header-cell m--unit">
                            ед.изм
                        </div>
                        <div class="lots__header-cell m--price">
                            Цена за ед. с НДС
                        </div>
                        <div class="lots__header-cell m--sum">
                            Сумма, с учетом НДС
                        </div>
                        <div class="lots__header-cell m--button">
                            Участие
                        </div>
                    </div>
                    <div class="lots__list">
                        <div class="lots__item">
                            <div class="lots__item-cell m--position">
                                1
                            </div>
                            <div class="lots__item-cell">
                                Запчасть №1
                            </div>
                            <div class="lots__item-cell">
                                20
                            </div>
                            <div class="lots__item-cell">
                                кг.
                            </div>
                            <div class="lots__item-cell">
                                600,55
                            </div>
                            <div class="lots__item-cell">
                                12 600,55
                            </div>
                            <div class="lots__item-cell m--button">
                                <button 
                                    class="button button-green"
                                    @click="onClickAddLotOffer()"
                                >
                                    Сделать ставку
                                </button>
                            </div>
                        </div>
                        <div class="lots__item">
                            <div class="lots__item-cell m--position">
                                1
                            </div>
                            <div class="lots__item-cell">
                                Запчасть №1
                            </div>
                            <div class="lots__item-cell">
                                20
                            </div>
                            <div class="lots__item-cell">
                                кг.
                            </div>
                            <div class="lots__item-cell">
                                600,55
                            </div>
                            <div class="lots__item-cell">
                                12 600,55
                            </div>
                            <div class="lots__item-cell m--button">
                                <button 
                                    class="button button-green"
                                    @click="onClickAddLotOffer()"
                                >
                                    Сделать ставку
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                -->
                <!--
                <div class="tender__block">
                    <div class="tender__offers offers">
                        <div class="offers__title">
                            Ваши предложения
                        </div>
                        <div class="offers__list">
                            <div class="offers__item">
                                <div class="offers__item-name">
                                    Запчасть №1
                                </div>
                                <div class="offers__item-info">
                                    <div class="offers__item-param">
                                        Начальная цена <span>22 000,00 ₽</span>
                                    </div>
                                    <div class="offers__item-param m--color-red">
                                        Текущая цена <span>17 900,00 ₽</span>
                                    </div>
                                    <div class="offers__item-param">
                                        Текущее снижение <span>20.1 %</span>
                                    </div>
                                    <div class="offers__item-param">
                                        Ваше последнее ценовое предложение <span>20 000,00 ₽</span>
                                    </div>
                                    <div class="offers__item-param">
                                        Ваша текущая позиция <span>3</span>
                                    </div>
                                </div>
                                <div class="offers__item-button">
                                    <a 
                                        href="#"
                                        class="button button-outline-green" 
                                    >
                                        Обновить ставку
                                    </a>
                                </div>
                            </div>
                            <div class="offers__item">
                                <div class="offers__item-name">
                                    Запчасть №1
                                </div>
                                <div class="offers__item-info">
                                    <div class="offers__item-param">
                                        Начальная цена <span>22 000,00 ₽</span>
                                    </div>
                                    <div class="offers__item-param m--color-red">
                                        Текущая цена <span>17 900,00 ₽</span>
                                    </div>
                                    <div class="offers__item-param">
                                        Текущее снижение <span>20.1 %</span>
                                    </div>
                                    <div class="offers__item-param">
                                        Ваше последнее ценовое предложение <span>20 000,00 ₽</span>
                                    </div>
                                    <div class="offers__item-param">
                                        Ваша текущая позиция <span>3</span>
                                    </div>
                                </div>
                                <div class="offers__item-button">
                                    <a 
                                        href="#"
                                        class="button button-outline-green" 
                                    >
                                        Обновить ставку
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div class="offers__more">
                            <a 
                                href="#"
                                class="button button-green" 
                            >
                                Cмотреть все
                            </a>
                        </div>
                    </div>
                    <div class="tender__stats offers">
                        <div class="offers__title">
                            Лучшие предложения
                        </div>
                        <div class="offers__stats">
                            <div class="offers__stats-item">
                                <div class="offers__stats-item-block">
                                    <div class="offers__stats-param m--lot-name">
                                        Запчасть №1
                                    </div>
                                    <div class="offers__stats-param m--name">
                                        ООО “Ромашка”
                                    </div>
                                    <div class="offers__stats-param m--price-best">
                                        20 865,00
                                    </div>
                                </div>
                                <div class="offers__stats-item-block">
                                    <div class="offers__stats-param m--progress m--green">
                                        <span style="width:80%" />
                                    </div>
                                    <div class="offers__stats-param m--price">
                                        23 865,00
                                    </div>
                                </div>  
                            </div>
                            <div class="offers__stats-item">
                                <div class="offers__stats-item-block">
                                    <div class="offers__stats-param m--lot-name">
                                        Запчасть №3
                                    </div>
                                    <div class="offers__stats-param m--name">
                                        ООО “Ромашка”
                                    </div>
                                    <div class="offers__stats-param m--price-best">
                                        20 865,00
                                    </div>
                                </div>
                                <div class="offers__stats-item-block">
                                    <div class="offers__stats-param m--progress m--green">
                                        <span style="width:80%" />
                                    </div>
                                    <div class="offers__stats-param m--price">
                                        23 865,00
                                    </div>
                                </div>  
                            </div>
                            <div class="offers__stats-item">
                                <div class="offers__stats-item-block">
                                    <div class="offers__stats-param m--lot-name">
                                        Запчасть №4
                                    </div>
                                    <div class="offers__stats-param m--name">
                                        ООО “Ромашка”
                                    </div>
                                    <div class="offers__stats-param m--price-best">
                                        20 865,00
                                    </div>
                                </div>
                                <div class="offers__stats-item-block">
                                    <div class="offers__stats-param m--progress m--red">
                                        <span style="width:80%" />
                                    </div>
                                    <div class="offers__stats-param m--price">
                                        23 865,00
                                    </div>
                                </div>  
                            </div>
                        </div>
                        <div class="offers__more">
                            <a 
                                href="#"
                                class="button button-green" 
                            >
                                Cмотреть все
                            </a>
                        </div>
                    </div>
                </div>
                -->
            </template>
        </div>

        <ModalAddLotOffer
            :showModal="showAddLotOfferModal"
            @hideModal="hideAddLotOfferModal"
        />
    </div>
</template>

<script>
    import { tender as tenderApi } from "@/services"
    import TenderOrganizationStatus from '@/components/tender-organization-status';
    import TenderParticipants from '@/components/tender-participants';
    import TenderLots from '@/components/tender-lots';
    import TenderBids from '@/components/tender-bids';
    import ModalAddLotOffer from '@/components/modal-add-lot-offer';

    export default {
        components: {
            TenderOrganizationStatus,
            TenderParticipants,
            TenderLots,
            TenderBids,
            ModalAddLotOffer
        },
        props: {
            id: {
                type: Number,
                default() { return null; }
            },
        },
        data() {
            return {
                user: this.$store.state.user,
                tender: null,
                participants: [],
                types: {
                    reduction_opened: 'Открытый',
                    reduction_closed: 'Закрытый',
                },
                statuses: {
                    bid_accept: 'Прием заявок',
                    bidding_process: 'Идут торги',
                    bidding_completed: 'Подведение итогов',
                    closed: 'Тендер завершен'
                },
                showAddLotOfferModal: false,
                showLoaderSending: false,
                formValues: {},
            }
        },
        computed: {
        },
        mounted() {
        },
        created() {
            this.getTenderData();
        },
        methods: {
            onClickAddLotOffer() {
                this.showAddLotOfferModal = true;
            },
            hideAddLotOfferModal() {
                this.showAddLotOfferModal = false;
            },
            getTenderData() {
                this.showLoaderSending = true;
                tenderApi.getTender(this.id).then(res => {
                    this.showLoaderSending = false;
                    this.tender = res;
                    let duration = new Date(this.tender.date_end) - new Date(this.tender.date_start);
                    this.tender.duration = Math.ceil(duration / 1000);
                    let limit = (new Date(this.tender.date_end) - new Date()) / 1000;
                    this.tender.limit = (new Date(this.tender.date_end) - new Date()) / 1000;
                    console.log(res);
                    if (this.user.id === this.tender.creator) {
                        tenderApi.getTenderParticipants(this.id).then(res => {
                            this.participants = res;
                            console.log(res);
                        }).catch(err => {
                            this.showLoaderSending = false;
                            this.$store.dispatch('showError', err);
                            console.error(err);
                        });
                    }
                }).catch(err => {
                    this.showLoaderSending = false;
                    this.$store.dispatch('showError', err);
                    console.error(err);
                });
            },
        }
    };
</script>
