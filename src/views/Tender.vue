<template>
    <div :class="['cabinet tender']">
        <div :class="['container']">
            <template v-if="showLoaderSending">
                <div class="tender__loader loader">
                    <div class="spinner" /> Загрузка данных
                </div>
            </template>
            <template v-else-if="tender?.id">
                <div class="tender__block m--top">
                    <!-- CARD 1 -->
                    <div 
                        class="tender__data"
                        :class="[tender.status === 'fulfilment' ? 'm--long' : '']"
                    >
                        <div 
                            class="tender__data-icon"
                            :class="[tender.status === 'closed' || tender.status === 'bidding_completed' ? 'm--finish' : 'm--status', tender.publication ? '' : 'm--red']"
                        />
                        <div class="tender__data-inner">
                            <div class="tender__data-title">
                                Статус
                            </div>
                            <div class="tender__data-info">
                                {{ !tender.publication ? 'Черновик' : tender.status_detail }}
                            </div>
                        </div>
                    </div>
                    <template
                        v-if="tender.publication"
                    >
                        <!-- CARD 2 -->
                        <div
                            v-if="tender.status === 'bid_accept'"
                            class="tender__data"
                        >
                            <div 
                                class="tender__data-icon m--timer m--green"
                            />
                            <div class="tender__data-inner">
                                <div class="tender__data-title">
                                    До начала этапа ставок
                                </div>
                                <div class="tender__data-info">
                                    <Timer 
                                        :dateCurrent="tender.date_request"
                                        :dateEnd="tender.date_start"
                                        :timerToDaysTime="true"
                                    />
                                </div>
                            </div>
                        </div>
                        <div
                            v-else-if="tender.status === 'bidding_process'"
                            class="tender__data"
                        >
                            <div 
                                class="tender__data-icon m--clock m--green"
                            />
                            <div class="tender__data-inner">
                                <div class="tender__data-title">
                                    Осталось времени
                                </div>
                                <div class="tender__data-info">
                                    <Timer 
                                        :dateCurrent="tender.date_request"
                                        :dateEnd="tender.date_end"
                                        :timerToDaysTime="true"
                                    />
                                    <span
                                        v-if="tender.prolong > 0"
                                        class="m--color-green"
                                    >
                                        +{{ tender.prolong / 60 }} мин.
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div
                            v-else-if="tender.status === 'bidding_completed'"
                            class="tender__data"
                        >
                            <div 
                                class="tender__data-icon m--winner"
                            />
                            <div class="tender__data-inner">
                                <div class="tender__data-title">
                                    Победители
                                </div>
                                <div class="tender__data-info">
                                    <template
                                        v-if="tender.winner_count > 0"
                                    >
                                        {{ tender.winner_count }}
                                    </template>
                                    <template
                                        v-else
                                    >
                                        —
                                    </template>
                                </div>
                            </div>
                        </div>
                        <div
                            v-else-if="tender.status === 'closed' || tender.status === 'fulfilment'"
                            class="tender__data"
                            :class="[tender.status === 'fulfilment' ? 'm--short' : '']"
                        >
                            <div 
                                class="tender__data-icon m--winner"
                            />
                            <div class="tender__data-inner">
                                <div class="tender__data-title">
                                    Победители
                                </div>
                                <div class="tender__data-info">
                                    <template
                                        v-if="tender.winner_count > 0"
                                    >
                                        {{ tender.winner_count }}
                                    </template>
                                    <template
                                        v-else
                                    >
                                        —
                                    </template>
                                </div>
                            </div>
                        </div>
                        <!-- CARD 3 -->
                        <div 
                            v-if="tender.status === 'bid_accept'"
                            class="tender__data"
                        >
                            <div class="tender__data-icon m--wall-clock" />
                            <div class="tender__data-inner">
                                <div class="tender__data-title">
                                    Дата окончания этапа
                                </div>
                                <div class="tender__data-info">
                                    {{ $helpers.formatDate(new Date(tender.date_start), 'DD.MM.YYYY HH:mm', 'Europe/Moscow') }} МСК
                                </div>
                            </div>
                        </div>
                        <div 
                            v-else-if="tender.status === 'bidding_process'"
                            class="tender__data"
                        >
                            <div class="tender__data-icon m--wall-clock" />
                            <div class="tender__data-inner">
                                <div class="tender__data-title">
                                    Дата окончания этапа
                                </div>
                                <div class="tender__data-info">
                                    {{ $helpers.formatDate(new Date(tender.date_end), 'DD.MM.YYYY HH:mm', 'Europe/Moscow') }} МСК
                                </div>
                            </div>
                        </div>
                        <div 
                            v-else-if="tender.status === 'bidding_completed'"
                            class="tender__data"
                        >
                            <div class="tender__data-icon m--wall-clock" />
                            <div class="tender__data-inner">
                                <div class="tender__data-title">
                                    Дата завершения
                                </div>
                                <div class="tender__data-info">
                                    {{ $helpers.formatDate(new Date(tender.date_end), 'DD.MM.YYYY HH:mm', 'Europe/Moscow') }} МСК
                                </div>
                            </div>
                        </div>                        
                        <div 
                            v-else-if="tender.status === 'closed' || tender.status === 'fulfilment'"
                            class="tender__data"
                        >
                            <div class="tender__data-icon m--wall-clock" />
                            <div class="tender__data-inner">
                                <div class="tender__data-title">
                                    Дата завершения
                                </div>
                                <div class="tender__data-info">
                                    {{ $helpers.formatDate(new Date(tender.date_fulfilment), 'DD.MM.YYYY HH:mm', 'Europe/Moscow') }} МСК 
                                </div>
                            </div>
                        </div>                        
                    </template>
                </div>

                <div class="tender__info">
                    <div
                        class="tender__info-favorite"
                        :class="{ 'm--favorite': tender.favorite }"
                        @click="toggleFavorite"
                    />
                    <div class="tender__info-left">
                        <div class="tender__info-number">
                            <span>{{ tender.kind_detail }} №{{ tender.id }}</span>
                        </div>
                        <div class="tender__info-title">
                            {{ tender.name }}
                        </div>
                        <div class="tender__info-price m--mobile">
                            {{ $helpers.toPrice(tender.price, { sign: tender.currency_detail }) }}
                        </div>
                        <div class="tender__info-param">
                            <span class="tender__info-param-name">Заказчик</span> 
                            <div class="tender__info-param-value">
                                <router-link
                                    :to="{ name: 'contragent', params: { id: tender.organization?.id } }"
                                >
                                    {{ tender.organization.name }}
                                </router-link>
                            </div>
                        </div>
                        <div class="tender__info-param">
                            <span class="tender__info-param-name">Категории</span>
                            <div class="tender__info-param-value">
                                <template
                                    v-for="(category, index) in tender.category_detail"
                                    :key="`category-${index}`"
                                >
                                    {{ category.name }}<span v-if="tender.category.length > 0 && index != (tender.category.length - 1)">; </span>
                                </template>
                            </div>
                        </div>
                        <div class="tender__info-param">
                            <span class="tender__info-param-name">Регион</span> 
                            <div class="tender__info-param-value">
                                {{ tender.region_detail ? tender.region_detail.name : '' }}
                            </div>
                        </div>
                        <div
                            v-if="tender.description"
                            class="tender__info-param"
                        >
                            <span class="tender__info-param-name">Дополнительная информация</span>
                            <div class="tender__info-param-value">
                                {{ tender.description }}
                            </div>
                        </div>
                        <TenderOrganizationStatus
                            v-if="user.id !== tender.creator && !user.is_staff && user.organization?.id !== tender.organization.id"
                            modifierClass="tender__info-status"
                            :tender="tender"
                            @getTenderData="getTenderData"
                        />
                    </div>
                    <div class="tender__info-right">
                        <div class="tender__info-price">
                            {{ tender.price ? $helpers.toPrice(tender.price, {sign: tender.currency_detail}) : 'Цена не указана' }}
                        </div>
                        <div 
                            class="tender__info-param"
                        >
                            <span class="tender__info-param-name m--light">Начало приема заявок</span>
                            <div class="tender__info-param-value">
                                {{ $helpers.formatDate(new Date(tender.date_publication), 'DD.MM.YYYY HH:mm', 'Europe/Moscow') }} МСК
                            </div>
                        </div>
                        <div 
                            v-if="tender.date_start" 
                            class="tender__info-param"
                        >
                            <span class="tender__info-param-name m--light">Окончание приема заявок</span>
                            <div class="tender__info-param-value">
                                {{ $helpers.formatDate(new Date(tender.date_start), 'DD.MM.YYYY HH:mm', 'Europe/Moscow') }} МСК
                            </div>
                        </div>
                        <div
                            v-if="tender.date_end" 
                            class="tender__info-param"
                        >
                            <span class="tender__info-param-name m--light">Этап торгов</span> 
                            <div class="tender__info-param-value">
                                до {{ $helpers.formatDate(new Date(tender.date_end), 'DD.MM.YYYY HH:mm', 'Europe/Moscow') }} МСК
                            </div>
                        </div>
                        <div 
                            v-if="tender.fulfilment"
                            class="tender__info-param"
                        >
                            <span class="tender__info-param-name m--light">Исполнение договора</span> 
                            <div class="tender__info-param-value">
                                до {{ $helpers.formatDate(new Date(tender.date_fulfilment), 'DD.MM.YYYY HH:mm', 'Europe/Moscow') }} МСК
                            </div>
                        </div>
                        <div 
                            v-if="tender.kind === 'tender'"
                            class="tender__info-param"
                        >
                            <span class="tender__info-param-name m--light">Минимальный шаг ставки</span> 
                            <div class="tender__info-param-value">
                                {{ tender.min_step }}%
                            </div>
                        </div>
                        <div class="tender__info-params">
                            <div class="tender__info-param">
                                <span class="tender__info-param-name m--light">Доступ</span>
                                <div class="tenders__item-param-value">
                                    {{ tender.type_detail }}
                                </div>
                            </div>
                            <div
                                v-if="tender.winner_count > 0" 
                                class="tender__info-param"
                            >
                                <span class="tender__info-param-name m--light">Победители</span>
                                <div class="tenders__item-param-value">
                                    {{ tender.winner_count }}
                                </div>
                            </div>
                            <div
                                v-else 
                                class="tender__info-param"
                            >
                                <span class="tender__info-param-name m--light">Участники</span>
                                <div class="tenders__item-param-value">
                                    {{ tender.participant_count }}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <template 
                    v-if="showActinsBlock" 
                >
                    <template
                        v-if="tender.status === 'bid_accept'" 
                    >
                        <div class="h2">
                            Действия с тендером
                        </div>
                        <div 
                            class="tender__actions"
                        >
                            <div
                                class="tender__actions-buttons"
                            >
                                <button 
                                    class="button button-red"
                                    @click.stop="onClickCancelTender()"
                                >
                                    Отменить тендер
                                </button>
                            </div>
                            <ModalTenderCancel
                                :tender="tender || {}"
                                :showModal="showCancelTenderConfirmModal"
                                @hideModal="hideCancelTenderConfirmModal"
                            />
                        </div>
                    </template>
                    <template
                        v-else-if="tender.status === 'bidding_process'" 
                    >
                        <div class="h2">
                            Завершить тендер досрочно
                        </div>
                        <div 
                            class="tender__actions"
                        >
                            <div
                                class="tender__actions-buttons"
                            >
                                <button 
                                    class="button button-red"
                                    @click.stop="onClickCloseTenderAhead(false)"
                                >
                                    Без победителя
                                </button>
                                <button 
                                    v-if="tender.creator === user.id"
                                    class="button button-green"
                                    @click.stop="onClickCloseTenderAhead(true)"
                                >
                                    С выбором победителя
                                </button>
                            </div>
                            <ModalTenderCloseAhead
                                :tender="tender || {}"
                                :setWinner="setWinner"
                                :showModal="showCloseAheadTenderConfirmModal"
                                @hideModal="hideCloseAheadTenderConfirmModal"
                            />
                        </div>
                    </template>
                    <template
                        v-else-if="tender.status === 'bidding_completed'"
                    >
                        <div class="h2">
                            Действия с тендером
                        </div>
                        <div 
                            class="tender__actions"
                        >
                            <div
                                class="tender__actions-buttons"
                            >
                                <button 
                                    class="button button-green"
                                    @click.stop="onClickCloseTenderWithWinner()"
                                >
                                    Завершить тендер
                                </button>
                            </div>
                            <ModalTenderClose
                                :tender="tender || {}"
                                :showModal="showCloseTenderConfirmModal"
                                @hideModal="hideCloseTenderConfirmModal"
                            />
                        </div>
                    </template>
                </template>
                <template 
                    v-else-if="tender.creator === user.id && !tender.publication" 
                >
                    <div class="h2">
                        Действия с тендером
                    </div>
                    <div 
                        class="tender__actions"
                    >
                        <div
                            class="tender__actions-buttons"
                        >
                            <button 
                                class="button button-green"
                                @click.stop="onClickEditTender"
                            >
                                Редактировать
                            </button>
                            <button 
                                class="button button-green"
                                :disabled="tender.lots && tender.lots.length ? false : true"
                                @click.stop=""
                            >
                                Опубликовать
                            </button>
                            <button 
                                class="button button-red"
                                @click.stop="onClickDeleteTender"
                            >
                                Удалить
                            </button>
                        </div>
                        <ModalTenderDelete
                            :tender="tender || {}"
                            :showModal="showDeleteTenderConfirmModal"
                            @hideModal="hideDeleteTenderConfirmModal"
                        />
                    </div>
                </template>
                <div 
                    :class="['tender__block m--col']"
                >
                    <div class="h2">
                        Документы:
                    </div>
                    <div
                        v-if="((tender.creator === user.id || user.is_staff) && tender.status === 'bid_accept') || tender.documents.length"
                        class="tender__docs"
                        :class="tender.creator === user.id || user.is_staff ? 'm--width-100' : ''"
                    >
                        <div class="tender__docs-list">
                            <div 
                                class="tender__docs-item"
                                :class="(tender.creator === user.id || user.is_staff) && tender.status === 'bid_accept' ? 'm--edit' : ''"
                            >
                                <div class="tender__docs-cell m--title">
                                    Файл
                                </div>
                                <div class="tender__docs-cell m--title">
                                    Описание
                                </div>
                                <template
                                    v-if="(tender.creator === user.id || user.is_staff) && tender.status === 'bid_accept'"
                                >
                                    <div class="tender__docs-cell m--edit" />
                                    <div class="tender__docs-cell m--delete" />
                                </template>
                            </div>
                            <template 
                                v-for="doc in tender.documents"
                            >
                                <div 
                                    v-if="doc.publication"
                                    :key="`doc-${doc.id}`"
                                    class="tender__docs-item"
                                    :class="(tender.creator === user.id || user.is_staff) && tender.status === 'bid_accept' ? 'm--edit' : ''"
                                >
                                    <a
                                        :href="urlPath + doc.file"
                                        class="tender__docs-cell m--file"
                                        target="_blank"
                                    >
                                        {{ doc.name }}
                                    </a>
                                    <template
                                        v-if="(tender.creator === user.id || user.is_staff) && tender.status === 'bid_accept'"
                                    >
                                        <div class="tender__docs-cell">
                                            <FormKit
                                                v-model="doc.description"
                                                class="input"
                                                type="text"
                                                placeholder="Ввести данные"
                                                :name="`description_${doc.id}`"
                                                :value="doc.description"
                                                outerClass="$reset"
                                                @focusout="updateDocument(doc.id)"
                                            />
                                        </div>
                                        <div class="tender__docs-cell m--edit">
                                            <div
                                                class="tender__docs-edit"
                                                @click="updateDocument(doc.id)"
                                            />
                                        </div>
                                        <div class="tender__docs-cell m--delete">
                                            <div
                                                class="tender__docs-delete"
                                                @click="onClickRemoveFile(doc.id)"
                                            />
                                        </div>
                                    </template>
                                    <div 
                                        v-else
                                        class="tender__docs-cell m--desc"
                                    >
                                        {{ doc.description }}
                                    </div>
                                </div>
                            </template>
                        </div>
                        <template
                            v-if="(tender.creator === user.id || user.is_staff) && tender.status === 'bid_accept'"
                        >
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
                                @click="onClickUploadFile(null)"
                            >
                                Добавить документ
                            </button>
                        </template>
                    </div>
                    <template
                        v-if="tender.creator !== user.id && !user.is_staff"
                    >
                        <div class="h2">
                            Контактное лицо
                            <template
                                v-if="user.id !== tender.creator && tender.status !== 'closed' && tender.user_participation"
                            >
                                <div
                                    class="tender__contact-chat"
                                    @click="startChat(tender.organization.id)"
                                >
                                    <span>Написать в чат</span>
                                </div>
                            </template>
                        </div>
                        <div
                            class="tender__contact"
                            :class="tender.documents.length ? '' : 'm--full-width'"
                        >
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
                    </template>
                </div>
                <TenderRelatedTenders
                    v-if="tender.status === 'fulfilment'"
                    :tender="tender"
                />
                <!--TenderOrganizationStatus
                    v-if="user.id !== tender.creator && !user.is_staff && user.organization.id !== tender.organization.id"
                    :tender="tender"
                    @getTenderData="getTenderData"
                /-->
                <TenderChat 
                    v-if="tender.publication && (user.organization?.id === tender.creator || user.is_staff || user.organization?.id === tender.organization.id || (tender.user_participation && tender.user_participation.status === 'participant'))"
                    :tender="tender"
                />
                <TenderLots
                    v-if="tender.lots && tender.lots.length"
                    :tender="tender"
                    :lots="tender.lots"
                    @getTenderData="getTenderData"
                />
                <TenderLotsExtended
                    v-if="(user.organization?.id === tender.creator || user.is_staff || (user.organization?.id === tender.organization.id && user.is_master)) && tender.status !== 'bid_accept' && tender.lots && tender.lots.length"
                    :tender="tender"
                    :lots="tender.lots"
                    @getTenderData="getTenderData"
                />
                <template 
                    v-if="tender.bet_enabled && tender.user_participation && tender.kind === 'tender' && tender.user_participation.status === 'participant' && tender.user_participation.contact_person.id === user.id"
                >
                    <div class="h2">
                        Быстрые ставки
                    </div>
                    <div 
                        class="tender__bids"
                    >
                        <div class="tender__bids-left">
                            <div class="tender__bids-info">
                                Минимальный шаг цены - {{ tender.min_step }}%
                            </div>
                        </div>
                        <div class="tender__bids-block">
                            <button 
                                class="button button-green m--right"
                                :disabled="sendingBets"
                                @click="onClickRapidBets('lose')"
                            >
                                По проигрывающим лотам
                            </button>
                            <button 
                                class="button button-green"
                                :disabled="sendingBets"
                                @click="onClickRapidBets('all')"
                            >
                                По всем лотам
                            </button>
                        </div>
                    </div>
                </template>
                <TenderBids
                    v-if="tender.lots && tender.lots.length && tender.bet_enabled && tender.user_participation && tender.user_participation.status === 'participant'"
                    :tender="tender"
                    :lots="tender.lots"
                    @getTenderData="getTenderData"
                />
                <TenderParticipants
                    v-if="participants && participants.length"
                    :tender="tender"
                    :participants="participants"
                    @getTenderData="getTenderData"
                />
                <TenderInvite 
                    v-if="user.organization?.id === tender.creator && tender.status === 'bid_accept' && tender.publication"
                    :tender="tender"
                />
            </template>
        </div>
    </div>
</template>

<script>
    import { urlPath } from '@/settings'
    import { tender as tenderApi, chat as Chat } from "@/services"
    import TenderOrganizationStatus from '@/components/tender-organization-status';
    import TenderParticipants from '@/components/tender-participants';
    import TenderRelatedTenders from '@/components/tender-related-tenders.vue';
    import TenderChat from '@/components/tender-chat';
    import TenderLots from '@/components/tender-lots';
    import TenderLotsExtended from '@/components/tender-lots-extended';
    import TenderBids from '@/components/tender-bids';
    import Timer from '@/components/timer';
    import TenderInvite from '@/components/tender-invite.vue';
    import ModalTenderClose from '@/components/modals/tender-close';
    import ModalTenderCloseAhead from '@/components/modals/tender-close-ahead';
    import ModalTenderCancel from '@/components/modals/tender-cancel';
    import ModalTenderDelete from '@/components/modals/tender-delete';

    export default {
        name: 'Tender',
        async preFetch({ store, currentRoute, previousRoute, redirect, ssrContext, urlPath, publicPath }) {
            console.log('Tender preFetch', process.env.SERVER, currentRoute.params);
            if (!process.env.SERVER) return;
            let tender = {}; 
            await tenderApi.getTender(currentRoute.params?.id).then(res => {
                tender = res;
                store.dispatch('setMeta', tender);
                let duration = new Date(tender.date_end) - new Date(tender.date_start);
                tender.duration = Math.ceil(duration / 1000);
                tender.limit = (new Date(tender.date_end) - new Date()) / 1000;
                store.dispatch('fetchDataByKey', { data: tender, key: 'tender' });
            }).catch(err => {
                if (err.response.status === 404) store.dispatch('showError', err.response.status);
            });
        },
        components: {
            TenderOrganizationStatus,
            TenderParticipants,
            TenderRelatedTenders,
            TenderChat,
            TenderLots,
            TenderLotsExtended,
            TenderBids,
            TenderInvite,
            Timer,
            ModalTenderClose,
            ModalTenderCloseAhead,
            ModalTenderCancel,
            ModalTenderDelete,
        },
        props: {
            id: {
                type: [Number, String],
                default() { return null; }
            },
        },
        data() {
            return {
                urlPath,
                //user: this.$store.state.user,
                //tender: null,
                lot: null,
                participants: [],
                documents: [],
                tenderForm: {},
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
                sendingBets: false,
                setWinner: null,
                showCloseTenderConfirmModal: false,
                showCloseAheadTenderConfirmModal: false,
                showCancelTenderConfirmModal: false,
                showDeleteTenderConfirmModal: false,
                showLoaderSending: false,
                formValues: {},
            }
        },
        computed: {
            user() {
                return this.$store.state.user || {};
            },
            tender() {
                return this.$store.state.data?.tender || {};
            },
            showActinsBlock() {
                if (this.tender.publication && this.tender.status !== 'closed' && this.tender.status !== 'fulfilment') {
                    if (this.tender.creator === this.user.id) {
                        return true;
                    }
                    if (this.user.is_staff && this.tender.status !== 'bidding_completed') {
                        return true;
                    }
                }
                return false;
            }
        },
        watch: {
            id: {
                //immediate: true,
                handler() {
                    if (!process.env.SERVER) this.getTenderData();
                },
            }
        },
        created() {
        },
        mounted() {
            this.getTenderData();
        },
        methods: {
            getTenderData() {
                this.showLoaderSending = true;
                tenderApi.getTender(this.id).then(res => {
                    this.showLoaderSending = false;
                    let tender = res;
                    let duration = new Date(tender.date_end) - new Date(tender.date_start);
                    tender.duration = Math.ceil(duration / 1000);
                    // let limit = (new Date(this.tender.date_end) - new Date()) / 1000;
                    tender.limit = (new Date(tender.date_end) - new Date()) / 1000;
                    this.$store.dispatch('fetchDataByKey', { data: tender, key: 'tender' });
                    this.$store.dispatch('setMeta', tender);

                    if (this.user.organization?.id === this.tender.creator || this.user.is_staff) {
                        tenderApi.getTenderParticipants(this.id).then(res => {
                            this.participants = res;
                            console.log(res);
                        }).catch(err => {
                            if (err.response.status === 404) this.$store.dispatch('showError', err.response.status);
                            this.showLoaderSending = false;
                        });
                    }
                    /*
                    tenderApi.getTenderLots(this.id).then(res => {
                        this.participants = res;
                        console.log(res);
                    }).catch(err => {
                        this.showLoaderSending = false;
                        this.$store.dispatch('showError', err);
                        console.error(err);
                    });
                    */
                }).catch(err => {
                    this.$store.dispatch('fetchDataByKey', { data: {}, key: 'tender' });
                    this.$store.dispatch('setMeta', {});
                    if (err.response?.status === 404) this.$router.replace({ name: 'page404' });
                    this.showLoaderSending = false;
                    //this.$store.dispatch('showError', err);
                });
            },
            onClickRapidBets(type) {
                this.sendingBets = true;
                tenderApi.addTenderLotRapidBet(this.tender.id, { type: type }).then(res => {
                    this.sendingBets = false;
                    console.log(res);
                    this.getTenderData();
                }).catch(err => {
                    this.sendingBets = false;
                    this.$store.dispatch('showError', err);
                    console.error(err);
                });
            },
            updateTenderData() {
                this.$forceUpdate();
            },
            toggleFavorite() {
                this.tender.favorite = !this.tender.favorite;
                tenderApi.switchFavoriteTender(this.tender.id).then(res => {
                    console.log(res);
                }).catch(err => {
                    this.$store.dispatch('showError', err);
                    console.error(err);
                });
            },
            onClickCloseTenderAhead(setWinner) {
                this.showCloseAheadTenderConfirmModal = true;
                this.setWinner = setWinner;
                /*
                tenderApi.closeTender(this.tender.id, { set_winner: setWinner }).then(res => {
                    console.log(res);
                    this.getTenderData();
                }).catch(err => {
                    this.$store.dispatch('showError', err);
                    console.error(err);
                });
                */
            },
            onClickCloseTenderWithWinner() {
                this.showCloseTenderConfirmModal = true;
            },
            onClickEditTender() {
                this.$router.push({ name: 'tender-edit', id: this.tender.id });
            },
            onClickCancelTender() {
                this.showCancelTenderConfirmModal = true;
            },
            onClickDeleteTender() {
                this.showDeleteTenderConfirmModal = true;
            },
            /*
            onClickInviteTender() {
                const el = this.$refs.inviteTender;
                if (el) {
                    el.scrollIntoView({ behavior: "smooth" });
                }
            },
            */
            hideCloseTenderConfirmModal(updateData=false) {
                this.showCloseTenderConfirmModal = false;
                if (updateData) {
                    this.getTenderData();
                }
            },
            hideCloseAheadTenderConfirmModal(updateData=false) {
                this.showCloseAheadTenderConfirmModal = false;
                if (updateData) {
                    this.getTenderData();
                }
            },
            hideCancelTenderConfirmModal(updateData=false) {
                this.showCancelTenderConfirmModal = false;
                if (updateData) {
                    this.getTenderData();
                }
            },
            hideDeleteTenderConfirmModal(updateData=false) {
                this.showDeleteTenderConfirmModal = false;
                if (updateData) {
                    this.$router.push({ name: 'customer-drafts' });
                }
            },
            startChat(organizationId) {
                let params = {
                    tender: this.tender.id,
                    organization: organizationId
                }
                console.log(organizationId);
                Chat.getChatByTenderAndOrganization(params).then(res => {
                    // this.chatPartner = res.chat_partner.id;
                    console.log(res);
                    this.$router.push({ name: 'chat', params: { chatId: res.id } });
                }).catch(err => {
                    console.error(err);
                });
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
                    formData.append("description", file.name)
                    formData.append("publication", true)
                    tenderApi.addTenderDocument(this.tender.id, formData)
                        .then(newFile => {
                            this.documents.push(newFile)
                            this.tender.documents.push(newFile)
                            // this.defaultTender.documents = this.documents
                        }).catch(err => {
                            console.error(err)
                        })
                }
            },
            updateDocument(id) {
                let idx = this.tender.documents.findIndex(f => f.id === id)
                if (idx >= 0) {
                    const formData = new FormData()
                    formData.append("description", this.tender.documents[idx].description)
                    tenderApi.updateTenderDocument(this.tender.id, this.tender.documents[idx].id, formData)
                        .then(newFile => {
                            this.tender.documents[idx] = newFile
                            // this.defaultTender.documents = this.documents
                        }).catch(err => {
                            console.error(err)
                        })
                }
            },
            onClickRemoveFile(id) {
                let idx = this.tender.documents.findIndex(f => f.id === id)
                if (idx >= 0) {
                    tenderApi.deleteTenderDocument(this.tender.id, this.tender.documents[idx].id)
                        .then(res => {
                            this.tender.documents.splice(idx, 1);
                            console.log(res);
                            // this.defaultTender.documents = this.documents
                        }).catch(err => {
                            console.error(err);
                        })
                }
            },
        }
    };
</script>
