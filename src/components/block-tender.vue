<template>
    <div
        :class="blockClass" 
        class="tenders__item"
    >
        <div
            class="tenders__item-favorite"
            :class="{ 'm--favorite': favorite }"
            @click="toggleFavorite"
        />
        <div class="tenders__item-left">
            <div class="tenders__item-top">
                <div class="tenders__item-top-name">
                    Аукцион №{{ tender.id }}
                </div>
                <div 
                    class="tenders__item-top-status"
                    :class="restTime ? 'm--devider' : ''"
                >
                    {{ tender.status_detail || tender.status }}
                </div>
                <div
                    class="tenders__item-top-timer"
                >
                    <template
                        v-if="restTime"
                    >
                        Осталось {{ $helpers.dateRangeToDaysHours(new Date(), new Date(tender.date_end)) }}
                    </template>
                </div>
            </div>
            <router-link
                :to="{ name: 'tender', params: { id: tender.id } }"
                class="tenders__item-title"
            >
                {{ tender.name }}
            </router-link>
            <div class="tenders__item-param">
                <span class="tenders__item-param-name">Заказчик: </span> 
                <a href="#">{{ tender.organization && tender.organization.full_name ? tender.organization.full_name : '(())' }}</a>
            </div>
            <div class="tenders__item-param">
                <span class="tenders__item-param-name">Категории: </span>
                <span
                    v-for="(category, idx) in tender.category"
                    :key="category.id"
                    class="tenders__item-param-value"
                >
                    {{ category.name }}
                    <span v-if="idx != Object.keys(tender.category).length - 1">, </span>
                </span>
            </div>
            <div
                v-if="tender.region"
                class="tenders__item-param"
            >
                <span class="tenders__item-param-name">Регион:</span> {{ tender.region.name }}
            </div>
            <div
                v-if="tender.description"
                class="tenders__item-param"
            >
                <span class="tenders__item-param-name">Дополнительная информация:</span> {{ tender.description }}
            </div>
            <div
                v-if="documents"
                class="tenders__item-docs"
            >
                <div class="tenders__item-docs__title">
                    Документы:
                </div>
                <div class="tenders__item-docs__list">
                    <div class="tenders__item-docs__item">
                        <div class="tenders__item-docs__cell m--title">
                            Файл
                        </div>
                        <div class="tenders__item-docs__cell m--title">
                            Описание
                        </div>
                    </div>
                    <div
                        v-for="file in documents"
                        :key="file.id"
                        class="tenders__item-docs__item m--file"
                    >
                        <a
                            :href="urlPath + file.file"
                            class=""
                        >{{ file.name }}</a>
                        <div class="">
                            {{ file.description }}
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="tenders__item-right">
            <div class="tenders__item-price">
                {{ $helpers.toPrice(tender.price, {sign: '₽'}) }}
            </div>


            <div 
                class="tenders__item-param"
            >
                <span 
                    class="tenders__item-param-name"
                >
                    Начало приема заявок:
                </span>
                {{ $helpers.formatDate(new Date(tender.date_publication), 'DD.MM.YYYY HH:mm') }} МСК
            </div>
            <div 
                v-if="tender.date_start" 
                class="tenders__item-param"
            >
                <span 
                    class="tenders__item-param-name"
                >
                    Прием заявок: до
                </span> 
                {{ $helpers.formatDate(new Date(tender.date_start), 'DD.MM.YYYY HH:mm') }} МСК
            </div>
            <div
                v-if="tender.date_end" 
                class="tenders__item-param"
            >
                <span 
                    class="tenders__item-param-name"
                >
                    Этап торгов: до
                </span> 
                {{ $helpers.formatDate(new Date(tender.date_end), 'DD.MM.YYYY HH:mm') }} МСК
            </div>
            <div 
                class="tenders__item-param"
            >
                <span 
                    class="tenders__item-param-name"
                >
                    Исполнение договора: до
                </span> 
                00.00.2022 00:00 МСК
            </div>
            <div class="tenders__item-param">
                <span class="tenders__item-param-name">Тип аукциона:</span> {{ tender.type_detail }}
            </div>
            <!--
            <div class="tenders__item-param">
                <span class="tenders__item-param-name">Лоты:</span> {{ tender.lot_count }}
            </div>
            -->
            <div class="tenders__item-param">
                <span class="tenders__item-param-name">Минимальный шаг ставки:</span> {{ tender.min_step || '?' }}
            </div>
            <div class="tenders__item-param">
                <span class="tenders__item-param-name">Предложений от поставщиков:</span> {{ tender.unique_offer_count }}
            </div>
            <template
                v-if="invites"
            >
                <!-- <pre>{{tender.user_invite.status }}</pre> -->
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
                <!-- <div
                    v-else-if="tender.user_invite.status === 'sent'"
                    class="tenders__item-participate"
                >
                    <button
                        class="button button-green"
                        @click="onClickDraft"
                    >
                        Редактировать0
                    </button>
                </div> -->
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
                    Описание
                </div>
                <div class="lots__header-cell m--nums">
                    Кол/во
                </div>
                <div class="lots__header-cell m--unit">
                    ед.изм
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
                Показать {{ $helpers.stringForNumber(lots.length - 5, ['позицию', 'позиции', 'позиций']) }}
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
        emits: ['getListInvitation'],
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
                if (this.tender.documents.length)
                    return this.tender.documents.filter(file => file.publication)
                
                return false
            },
            lots() {
                if (this.tender.lots.length)
                    return this.tender.lots.filter(lot => lot.publication)
                
                return false
            },
            restTime() {
                let rest = new Date(this.tender.date_end) - new Date()
                return (rest < 0) ? false : true;
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
                    console.log(res);
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
