<template>
    <div :class="['tenders__item', blockClass]">
        <div
            :class="['tenders__item-favorite', favorite && 'm--favorite']"
            @click="toggleFavorite"
        />
        <div class="tenders__item-left">
            <div class="tenders__item-top">
                <div class="tenders__item-name">
                    {{ tender.kind_detail }} №{{ tender.id }}
                </div>
                <div class="tenders__item-top-right">
                    <template v-if="tender.publication">
                        <div 
                            :class="['tenders__item-top-status', restTime && 'm--devider']"
                        >
                            {{ tender.status_detail || tender.status }}
                        </div>
                        <div
                            v-if="restTime"
                            class="tenders__item-top-timer"
                        >
                            <template v-if="tender.status === 'bid_accept'">
                                ({{ $helpers.dateRangeToDaysHours(new Date(new Date(tender.date_request).toLocaleString('EN-en', { timeZone: 'Europe/Moscow' })).getTime(), new Date(new Date(tender.date_start).toLocaleString('EN-en', { timeZone: 'Europe/Moscow' })).getTime()) }})
                            </template>
                            <template v-else>
                                ({{ $helpers.dateRangeToDaysHours(new Date(new Date(tender.date_request).toLocaleString('EN-en', { timeZone: 'Europe/Moscow' })).getTime(), new Date(new Date(tender.date_end).toLocaleString('EN-en', { timeZone: 'Europe/Moscow' })).getTime()) }})
                            </template>
                        </div>
                    </template>
                    <template v-else>
                        <div class="tenders__item-top-status">
                            Черновик
                        </div>
                    </template>
                </div>
            </div>
            <router-link
                :to="{ name: ($route.name === 'home' || $route.name === 'participant-invites' || $route.name === 'favorites-tenders' || $route.name === 'tenders' || $route.name === 'contragent' || $route.name === 'tenders-group') ? 'tender' : `${$route.name.replace('-tender', '')}-tender`, params: { id: tender.id } }"
                class="tenders__item-title"
            >
                {{ tender.name }}
            </router-link>
            <div class="tenders__item-price m--mobile">
                {{ tender.price ? $helpers.toPrice(tender.price, {sign: tender.currency_detail}) : 'Цена не указана' }}
            </div>
            <div 
                v-if="tender.organization"
                class="tenders__item-param"
            >
                <span class="tenders__item-param-name">Заказчик</span> 
                <div class="tenders__item-param-value">
                    <router-link
                        :to="{ name: 'contragent', params: { id: tender.organization.id } }"
                        target="_blank"
                    >
                        {{ tender.organization.full_name ? tender.organization.full_name : '-' }}
                    </router-link>
                </div>
            </div>
            <div class="tenders__item-param">
                <span class="tenders__item-param-name">Категории</span>
                <div class="tenders__item-param-value">
                    <span
                        v-for="(category, idx) in tender.category"
                        :key="category.id"
                        class="tenders__item-param-value"
                    >
                        {{ category.name }}<span v-if="idx != Object.keys(tender.category).length - 1">; </span>
                    </span>
                </div>
            </div>
            <div
                v-if="tender.region"
                class="tenders__item-param"
            >
                <span class="tenders__item-param-name">Регион</span>
                <div class="tenders__item-param-value">
                    {{ tender.region.name }}
                </div>
            </div>
            <div
                v-if="tender.description"
                class="tenders__item-param"
            >
                <span class="tenders__item-param-name">Дополнительная информация</span>
                <div class="tenders__item-param-value">
                    {{ tender.description }}
                </div>
            </div>
            <div
                v-if="documents"
                class="tenders__item-docs"
            >
                <div class="tenders__item-docs__title">
                    Документы
                </div>
                <div class="tenders__item-docs__list">
                    <div
                        v-for="file in documents"
                        :key="file.id"
                        class="tenders__item-docs__item m--file"
                    >
                        <a
                            :href="urlPath + file.file"
                            class="tenders__item-docs__item-file"
                            target="_blank"
                        >{{ file.name }}</a>
                        <div class="tenders__item-docs__item-info">
                            {{ file.description }}
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="tenders__item-right">
            <div class="tenders__item-price">
                {{ tender.price ? $helpers.toPrice(tender.price, {sign: tender.currency_detail}) : 'Цена не указана' }}
            </div>
            <div class="tenders__item-param">
                <span class="tenders__item-param-name m--light">
                    Начало приема заявок
                </span>
                <div class="tenders__item-param-value">
                    {{ $helpers.formatDate(new Date(tender.date_publication || null), 'DD.MM.YYYY HH:mm', 'Europe/Moscow') }} МСК
                </div>
            </div>
            <div 
                v-if="tender.date_start" 
                class="tenders__item-param"
            >
                <span class="tenders__item-param-name m--light">
                    Окончание приема заявок
                </span> 
                <div class="tenders__item-param-value">
                    {{ $helpers.formatDate(new Date(tender.date_start), 'DD.MM.YYYY HH:mm', 'Europe/Moscow') }} МСК
                </div>
            </div>
            <div
                v-if="tender.date_end" 
                class="tenders__item-param"
            >
                <span class="tenders__item-param-name m--light">
                    Этап торгов
                </span>
                <div class="tenders__item-param-value">
                    до {{ $helpers.formatDate(new Date(tender.date_end), 'DD.MM.YYYY HH:mm', 'Europe/Moscow') }} МСК
                </div>
            </div>
            <div 
                v-if="tender.fulfilment"
                class="tenders__item-param"
            >
                <span class="tenders__item-param-name m--light">
                    Исполнение договора
                </span>
                <div class="tenders__item-param-value">
                    до {{ $helpers.formatDate(new Date(tender.date_fulfilment), 'DD.MM.YYYY HH:mm', 'Europe/Moscow') }} МСК
                </div>
            </div>
            <div 
                v-if="tender.kind === 'tender'"
                class="tenders__item-param"
            >
                <span class="tenders__item-param-name m--light">Минимальный шаг ставки</span> 
                <div class="tenders__item-param-value">
                    {{ tender.min_step }}%
                </div>
            </div>
            <div class="tenders__item-params">
                <div class="tenders__item-param">
                    <span class="tenders__item-param-name m--light">Доступ</span>
                    <div class="tenders__item-param-value">
                        {{ tender.type_detail }}
                    </div>
                </div>
                <div
                    v-if="tender.winner_count > 0" 
                    class="tenders__item-param"
                >
                    <span class="tenders__item-param-name m--light">Победители</span>
                    <div class="tenders__item-param-value">
                        {{ tender.winner_count }}
                    </div>
                </div>
                <div 
                    v-else
                    class="tenders__item-param"
                >
                    <span class="tenders__item-param-name m--light">Участники</span>
                    <div class="tenders__item-param-value">
                        {{ tender.participant_count }}
                    </div>
                </div>
            </div>
            <template
                v-if="invites"
            >
                <div
                    v-if="tender.user_invite.status === 'sent'"
                    class="tenders__item-participate"
                >
                    <button
                        class="button button-green"
                        @click="onClickAcceptInvite"
                    >
                        Принять приглашение
                    </button>
                    <button
                        class="button button-red"
                        @click="onClickRejectInvite"
                    >
                        Отказаться
                    </button>
                </div>
                <div
                    v-else-if="tender.user_invite.status === 'accepted'"
                >
                    <button
                        class="button button-green"
                        @click="onClickParticipate"
                    >
                        Подробнее
                    </button>
                </div>
            </template>
            <template
                v-else-if="drafts"
            >
                <div
                    class="tenders__item-participate"
                >
                    <button
                        class="button button-green"
                        @click="onClickDraft"
                    >
                        Редактировать
                    </button>
                </div>
            </template>
            <template
                v-else
            >
                <!-- v-if="restTime" -->
                <div
                    class="tenders__item-participate"
                >
                    <button
                        class="button button-green"
                        @click="onClickParticipate"
                    >
                        Подробнее
                    </button>
                </div>
            </template>
        </div>
        <div
            v-if="lots"
            class="tenders__item-lots lots m--tenders"
            :class="{'m--active': isShowPositions}"
        >
            <div class="lots__header">
                <div class="lots__header-cell m--position">
                    №
                </div>
                <div class="lots__header-cell m--name">
                    Лот
                </div>
                <div class="lots__header-cell m--nums">
                    Кол-во
                </div>
                <div class="lots__header-cell m--unit">
                    Ед. изм
                </div>
            </div>
            <div class="lots__list">
                <div
                    v-for="(lot, idx) in lots"
                    :key="lot.id"
                    class="lots__item"
                >
                    <div class="lots__item-cell m--position">
                        {{ idx + 1 }}
                    </div>
                    <div class="lots__item-cell">
                        {{ lot.name }}
                    </div>
                    <div class="lots__item-cell">
                        {{ lot.quantity }}
                    </div>
                    <div class="lots__item-cell">
                        {{ lot.unit }}
                    </div>
                </div>
            </div>
        </div>
        <div
            v-if="lots.length > 5"
            class="tenders__item-toggle"
            :class="{'tenders__item-toggle--active': isShowPositions}"
            @click="isShowPositions = !isShowPositions"
        >
            <template
                v-if="isShowPositions"
            >
                Скрыть {{ $helpers.stringForNumber(lots.length - 5, ['позицию', 'позиции', 'позиций']) }}
            </template>
            <template
                v-else
            >
                Показать еще {{ $helpers.stringForNumber(lots.length - 5, ['позицию', 'позиции', 'позиций']) }}
            </template>
        </div>
    </div>
</template>

<script>
    import { urlPath } from '@/settings'
    import { tender as tenderApi } from "@/services"

    export default {
        props: {
            blockClass: {
                type: String,
                default() { return ''; }
            },
            tender: {
                type: Object,
                default() { return {
                    id: 1
                }; }
            },
            drafts: {
                type: Boolean,
                default() { return false; }
            },
            invites: {
                type: Boolean,
                default() { return false; }
            },
        },
        emits: ['getListInvitation', 'updateData'],
        data() {
            return {
                urlPath,
                isShowPositions: false,
                favorite: this.tender.favorite,
                // inviteStatus: '',
            };
        },
        computed: {
            documents() {
                if (this.tender.documents?.length)
                    return this.tender.documents.filter(file => file.publication)
                
                return false
            },
            lots() {
                if (this.tender.lots?.length)
                    return this.tender.lots //.filter(lot => lot.publication)
                
                return false
            },
            restTime() {
                let rest = new Date(this.tender.date_end) - new Date()
                if (this.tender.status === 'bid_accept' || this.tender.status === 'bidding_process') {
                    return (rest < 0) ? false : true;
                } else {
                    return false;
                }
            }
        },
        created() {
            // this.getInviteStatus();
        },
        methods: {
            onClickDraft() {
                this.$router.push({ name: 'tender-edit', params: { id: this.tender.id } });
            },
            onClickParticipate() {
                this.$router.push({ name: 'tender', params: { id: this.tender.id } });
            },
            toggleFavorite() {
                this.favorite = !this.favorite;
                tenderApi.switchFavoriteTender(this.tender.id).then(res => {
                    this.$emit('updateData');
                }).catch(err => {
                    this.$store.dispatch('showError', err);
                    console.error(err);
                });
            },
            onClickAcceptInvite(){
                tenderApi.acceptInvitation(this.tender.id).then(res => {
                    console.log(res);
                    this.inviteStatus = 'accepted';
                    this.$emit('getListInvitation');
                }).catch(err => {
                    this.$store.dispatch('showError', err);
                    console.error(err);
                });
            },
            onClickRejectInvite(){
                tenderApi.rejectInvitation(this.tender.id).then(res => {
                    console.log(res);
                    this.inviteStatus = 'reject';
                    this.$emit('getListInvitation');
                }).catch(err => {
                    this.$store.dispatch('showError', err);
                    console.error(err);
                });
            },
            // getInviteStatus() {
            //     console.log(this.tender);
            //     if(this.tender.user_invite.status === 'sent') {
            //         this.inviteStatus ='sent';
            //     } else if (this.tender.user_invite.status === 'accepted') {
            //         this.inviteStatus ='accepted';
            //     } else {
            //         this.inviteStatus ='';
            //     }
            // }
        },
    };
</script>
