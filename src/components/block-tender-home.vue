<template>
    <div
        :class="blockClass" 
        class="tenders__item"
    >
        <div class="tenders__item-left">
            <div class="tenders__item-top">
                <div class="tenders__item-top-name">
                    Аукцион №{{ tender.id }}
                </div>
            </div>
            <router-link
                :to="{ name: 'tender', params: { id: tender.id } }"
                class="tenders__item-title"
            >
                {{ tender.name }}
            </router-link>
            <div class="tenders__item-price m--mobile">
                {{ $helpers.toPrice(tender.price, {sign: '₽'}) }}
            </div>
            <div
                v-if="tender.organization" 
                class="tenders__item-param"
            >
                <span class="tenders__item-param-name">Заказчик: </span> 
                <a href="#">{{ tender.organization && tender.organization.full_name ? tender.organization.full_name : '' }}</a>
            </div>
            <div class="tenders__item-param">
                <span class="tenders__item-param-name">Категории: </span>
                <span
                    v-for="(category, idx) in tender.category"
                    :key="category.id"
                    class="tenders__item-param-value"
                >
                    {{ category.name }}<span v-if="idx != Object.keys(tender.category).length - 1">; </span>
                </span>
            </div>
            <div
                v-if="tender.region"
                class="tenders__item-param"
            >
                <span class="tenders__item-param-name">Регион:</span> {{ tender.region.name }}
            </div>
        </div>
        <div class="tenders__item-right">
            <div class="tenders__item-price">
                {{ $helpers.toPrice(tender.price, {sign: '₽'}) }}
            </div>
            <div 
                v-if="tender.date_publication"
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
                v-if="tender.date_fulfilment"
                class="tenders__item-param"
            >
                <span 
                    class="tenders__item-param-name"
                >
                    Исполнение договора: до
                </span> 
                {{ $helpers.formatDate(new Date(tender.date_fulfilment), 'DD.MM.YYYY HH:mm') }} МСК
            </div>
            <button
                class="button button-green"
                @click="$router.push({ name: 'registration' })"
            >
                Участвовать
            </button>
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
