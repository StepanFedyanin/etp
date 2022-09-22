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
                                        :dateEnd="tender.date_end"
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
                                    {{ $helpers.formatDate(new Date(tender.date_start), 'DD.MM.YYYY HH:mm') }} МСК
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
                                    {{ $helpers.formatDate(new Date(tender.date_end), 'DD.MM.YYYY HH:mm') }} МСК
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
                                    {{ $helpers.formatDate(new Date(tender.date_end), 'DD.MM.YYYY HH:mm') }} МСК
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
                                    {{ $helpers.formatDate(new Date(tender.date_fulfilment), 'DD.MM.YYYY HH:mm') }} МСК 
                                </div>
                            </div>
                        </div>                        
                    </template>
                </div>

                <div
                    class="tender__info"
                >
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
                            {{ $helpers.toPrice(tender.price, { sign: '₽' }) }}
                        </div>
                        <div class="tender__info-param">
                            <span>Заказчик: </span> 
                            <router-link
                                :to="{ name: 'contragent', params: { id: tender.organization.id } }"
                            >
                                {{ tender.organization.name }}
                            </router-link>
                        </div>
                        <div class="tender__info-param">
                            <span>Категории: </span> 
                            <template
                                v-for="(category, index) in tender.category_detail"
                            >
                                {{ category.name }}<span v-if="tender.category.length > 0 && index != (tender.category.length - 1)">; </span>
                            </template>
                        </div>
                        <div class="tender__info-param">
                            <span>Регион:</span> {{ tender.region_detail ? tender.region_detail.name : '' }}
                        </div>
                        <div
                            v-if="tender.description"
                            class="tender__info-param"
                        >
                            <span>Дополнительная информация:</span> {{ tender.description }}
                        </div>
                    </div>
                    <div class="tender__info-right">
                        <div class="tender__info-price">
                            {{ $helpers.toPrice(tender.price, { sign: '₽' }) }}
                        </div>
                        <div 
                            class="tender__info-param"
                        >
                            <span>Начало приема заявок:</span> {{ $helpers.formatDate(new Date(tender.date_publication), 'DD.MM.YYYY HH:mm') }} МСК
                        </div>
                        <div 
                            v-if="tender.date_start" 
                            class="tender__info-param"
                        >
                            <span>Прием заявок: до</span> {{ $helpers.formatDate(new Date(tender.date_start), 'DD.MM.YYYY HH:mm') }} МСК
                        </div>
                        <div
                            v-if="tender.date_end" 
                            class="tender__info-param"
                        >
                            <span>Этап торгов: до</span> {{ $helpers.formatDate(new Date(tender.date_end), 'DD.MM.YYYY HH:mm') }} МСК
                        </div>
                        <div 
                            class="tender__info-param"
                        >
                            <span>Исполнение договора: до</span> {{ $helpers.formatDate(new Date(tender.date_fulfilment), 'DD.MM.YYYY HH:mm') }} МСК
                        </div>
                        <div class="tender__info-param">
                            <span>Тип аукциона:</span> {{ tender.type_detail }}
                        </div>
                        <div 
                            v-if="tender.kind === 'tender'"
                            class="tender__info-param"
                        >
                            <span>Минимальный шаг ставки:</span> {{ tender.min_step }}%
                        </div>
                        <div
                            v-if="tender.winner_count > 0" 
                            class="tender__info-param"
                        >
                            <span>Победители:</span> {{ tender.winner_count }}
                        </div>
                        <div
                            v-else 
                            class="tender__info-param"
                        >
                            <span>Участники:</span> {{ tender.unique_offer_count }}
                        </div>
                    </div>
                </div>
                <div 
                    v-if="tender.creator === user.id && tender.publication && tender.status !== 'closed' && tender.status !== 'fulfilment'" 
                    class="tender__actions"
                >
                    <div class="tender__actions-title">
                        Действия с тендером
                    </div>
                    <div
                        v-if="tender.status === 'bid_accept'" 
                        class="tender__actions-buttons"
                    >
                        <button 
                            class="button button-red"
                            @click.stop="onClickCloseTender(false)"
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
                    <div
                        v-else-if="tender.status === 'bidding_process'" 
                        class="tender__actions-buttons"
                    >
                        <button 
                            class="button button-red"
                            @click.stop="onClickCloseTender(true)"
                        >
                            Завершить досрочно и выбрать победителя
                        </button>
                        <button 
                            class="button button-green"
                            @click.stop="onClickCloseTender(false)"
                        >
                            Завершить досрочно без победителя
                        </button>
                    </div>
                    <div
                        v-else-if="tender.status === 'bidding_completed'" 
                        class="tender__actions-buttons"
                    >
                        <button 
                            class="button button-green"
                            @click.stop="onClickCloseTenderWithWinner()"
                        >
                            Завершить тендер
                        </button>
                        <ModalCloseTenderConfirm
                            :tender="tender || {}"
                            :showModal="showCloseTenderConfirmModal"
                            @hideModal="hideCloseTenderConfirmModal"
                        />
                    </div>
                </div>
                <div 
                    v-else-if="tender.creator === user.id && !tender.publication" 
                    class="tender__actions"
                >
                    <div class="tender__actions-title">
                        Действия с тендером
                    </div>
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
                    <ModalDeleteTenderConfirm
                        :tender="tender || {}"
                        :showModal="showDeleteTenderConfirmModal"
                        @hideModal="hideDeleteTenderConfirmModal"
                    />
                </div>

                <div class="tender__block">
                    <div
                        v-if="tender.documents.length"
                        class="tender__docs"
                        :class="tender.creator === user.id ? 'm--width-100' : ''"
                    >
                        <div class="tender__docs-title">
                            Документы:
                        </div>
                        <div class="tender__docs-list">
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
                        </div>
                    </div>
                    <div
                        v-if="tender.creator !== user.id"
                        class="tender__contact"
                        :class="tender.documents.length ? '' : 'm--full-width'"
                    >
                        <div class="tender__contact-title">
                            Контактное лицо
                            <template
                                v-if="user.id !== tender.creator && tender.status !== 'closed' && tender.user_participation"
                            >
                                <!-- {{tender.organization.id}} -->
                                <div
                                    class="tender__contact-chat"
                                    @click="startChat(tender.organization.id)"
                                />
                            </template>
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
                <RelatedTenders
                    v-if="tender.status === 'fulfilment'"
                    :tender="tender"
                />
                <TenderOrganizationStatus
                    v-if="user.id !== tender.creator"
                    :tender="tender"
                    @getTenderData="getTenderData"
                />
                <TenderLots
                    v-if="tender.lots && tender.lots.length"
                    :tender="tender"
                    :lots="tender.lots"
                    @getTenderData="getTenderData"
                />
                <div 
                    v-if="tender.bet_enabled && tender.user_participation && tender.kind === 'tender' && tender.user_participation.status === 'participant'"
                    class="tender__bids"
                >
                    <div class="tender__bids-left">
                        <div class="tender__bids-title">
                            Быстрые ставки
                        </div>
                        <div class="tender__bids-info">
                            Минимальный шаг цены - {{ tender.min_step }}%
                        </div>
                    </div>
                    <div class="tender__bids-block">
                        <button 
                            class="button button-outline-green m--right"
                            :disabled="sendingBets"
                            @click="onClickRapidBets('loss')"
                        >
                            По проигрывающим лотам
                        </button>
                        <button 
                            class="button button-outline-green"
                            :disabled="sendingBets"
                            @click="onClickRapidBets('all')"
                        >
                            По всем лотам
                        </button>
                    </div>
                </div>
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
                <inviteTender 
                    v-if="user.id === tender.creator && tender.status === 'bid_accept' && tender.publication"
                    :tender="tender"
                />
            </template>
        </div>
    </div>
</template>

<script>
    import { tender as tenderApi } from "@/services"
    import TenderOrganizationStatus from '@/components/tender-organization-status';
    import TenderParticipants from '@/components/tender-participants';
    import TenderLots from '@/components/tender-lots';
    import TenderBids from '@/components/tender-bids';
    import Timer from '@/components/timer';
    import inviteTender from '@/components/invite-tender.vue';
    import ModalCloseTenderConfirm from '@/components/modal-close-tender-confirm';
    import ModalDeleteTenderConfirm from '@/components/modal-delete-tender-confirm';
    import { chat as Chat } from "@/services"
    import RelatedTenders from '@/components/relatedTenders.vue';

    export default {
        components: {
            TenderOrganizationStatus,
            TenderParticipants,
            TenderLots,
            TenderBids,
            Timer,
            inviteTender,
            ModalCloseTenderConfirm,
            ModalDeleteTenderConfirm,
            RelatedTenders
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
                lot: null,
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
                sendingBets: false,
                showCloseTenderConfirmModal: false,
                showDeleteTenderConfirmModal: false,
                showLoaderSending: false,
                formValues: {},
            }
        },
        created() {
            this.getTenderData();
        },
        mounted() {
        },
        methods: {
            getTenderData() {
                this.showLoaderSending = true;
                tenderApi.getTender(this.id).then(res => {
                    this.showLoaderSending = false;
                    this.tender = res;
                    let duration = new Date(this.tender.date_end) - new Date(this.tender.date_start);
                    this.tender.duration = Math.ceil(duration / 1000);
                    // let limit = (new Date(this.tender.date_end) - new Date()) / 1000;
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
                    this.$helpers.setDocumentTitle(this.tender);
                }).catch(err => {
                    this.showLoaderSending = false;
                    if (err.response && err.response.status === 404) {
                        this.$router.push({ name: 'page404' });
                    } else {
                        this.$store.dispatch('showError', err);
                    }
                    console.error(err);
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
            onClickCloseTender(setWinner) {
                tenderApi.closeTender(this.tender.id, { set_winner: setWinner }).then(res => {
                    console.log(res);
                    this.getTenderData();
                }).catch(err => {
                    this.$store.dispatch('showError', err);
                    console.error(err);
                });
            },
            onClickCloseTenderWithWinner() {
                this.showCloseTenderConfirmModal = true;
            },
            onClickEditTender() {
                this.$router.push({ name: 'tender-edit', id: this.tender.id });
            },
            onClickDeleteTender() {
                this.showDeleteTenderConfirmModal = true;
            },
            hideCloseTenderConfirmModal(updateData=false) {
                this.showCloseTenderConfirmModal = false;
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
            }
        }
    };
</script>
