<template>
    <div
        :class="blockClass" 
        class="tenders__item"
    >
        <div class="tenders__item-left">
            <div class="tenders__item-top">
                <div class="tenders__item-name">
                    {{ tender.kind_detail }} №{{ tender.id }}
                </div>
                <div class="tenders__item-top-right">
                    <template
                        v-if="tender.publication"
                    >
                        <div 
                            class="tenders__item-top-status"
                            :class="restTime ? 'm--devider' : ''"
                        >
                            {{ tender.status_detail || tender.status }}
                        </div>
                        <div
                            v-if="restTime"
                            class="tenders__item-top-timer"
                        >
                            <template
                                v-if="tender.status === 'bid_accept'"
                            >
                                ({{ $helpers.dateRangeToDaysHours(new Date(new Date(tender.date_request).toLocaleString('EN-en', { timeZone: 'Europe/Moscow' })).getTime(), new Date(new Date(tender.date_start).toLocaleString('EN-en', { timeZone: 'Europe/Moscow' })).getTime()) }})
                            </template>
                            <template
                                v-else
                            >
                                ({{ $helpers.dateRangeToDaysHours(new Date(new Date(tender.date_request).toLocaleString('EN-en', { timeZone: 'Europe/Moscow' })).getTime(), new Date(new Date(tender.date_end).toLocaleString('EN-en', { timeZone: 'Europe/Moscow' })).getTime()) }})
                            </template>
                        </div>
                    </template>
                    <template
                        v-else
                    >
                        <div 
                            class="tenders__item-top-status"
                        >
                            Черновик
                        </div>
                    </template>
                </div>
            </div>
            <router-link
                :to="{ name: 'tender', params: { id: tender.id } }"
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
        </div>
        <div class="tenders__item-right">
            <div class="tenders__item-price">
                {{ tender.price ? $helpers.toPrice(tender.price, {sign: tender.currency_detail}) : 'Цена не указана' }}
            </div>
            <div 
                v-if="tender.date_start" 
                class="tenders__item-param"
            >
                <span 
                    class="tenders__item-param-name m--light"
                >
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
                <span 
                    class="tenders__item-param-name m--light"
                >
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
                <span 
                    class="tenders__item-param-name m--light"
                >
                    Исполнение договора
                </span>
                <div class="tenders__item-param-value">
                    до {{ $helpers.formatDate(new Date(tender.date_fulfilment), 'DD.MM.YYYY HH:mm', 'Europe/Moscow') }} МСК
                </div>
            </div>
            <div
                class="tenders__item-participate"
            >
                <button
                    class="button button-green button-width-100"
                    @click="$router.push({ name: 'registration' })"
                >
                    {{ new Date() <= new Date(tender.date_start) ? 'Участвовать' : 'Подробнее' }}
                </button>
            </div>
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
                default() { return {}; }
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
            };
        },
        computed: {
            restTime() {
                let rest = new Date(this.tender.date_end) - new Date()
                return (rest < 0) ? false : true;
            }
        },
        created() {
            // this.getInviteStatus();
        },
        methods: {
        },
    };
</script>
