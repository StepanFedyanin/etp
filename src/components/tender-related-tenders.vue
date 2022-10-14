<template>
    <div 
        v-if="(tender.related_parent_tender && tender.related_parent_tender.length) || (tender.related_tenders && tender.related_tenders.length)"
        class="tender__related"
    >
        <template
            v-if="tender.related_parent_tender && tender.related_parent_tender.length"
        >
            <div class="tender__related-title">
                Основной тендер
            </div>
            <div class="tender__related-block">
                <div 
                    v-for="item in tender.related_parent_tender"
                    class="tender__related-item"
                >
                    <router-link
                        :to="{ name: 'tender', params: { id: item.id } }"
                        class="tender__related-link"
                    >
                        {{ item.kind_detail }} №{{ item.id }}
                    </router-link>
                    <div>
                        {{ item.status_detail }}
                    </div>
                    <div>
                        <template
                            v-if="item.status === 'bid_accept'"
                        >
                            до {{ $helpers.formatDate(new Date(item.date_start), 'DD.MM.YYYY HH:mm', 'Europe/Moscow') }} МСК
                        </template>
                        <template
                            v-if="item.status === 'bidding_process'"
                        >
                            до {{ $helpers.formatDate(new Date(item.date_end), 'DD.MM.YYYY HH:mm', 'Europe/Moscow') }} МСК
                        </template>
                        <template
                            v-else-if="item.status === 'bidding_completed' || item.status === 'fulfilment'"
                        >
                            до {{ $helpers.formatDate(new Date(item.date_fulfilment), 'DD.MM.YYYY HH:mm', 'Europe/Moscow') }} МСК
                        </template>
                    </div>
                    <button 
                        class="button button-outline-green"
                        @click="$router.push({ name: 'tender', params: { id: item.id } })"
                    >
                        Подробнее
                    </button>
                </div>
            </div>
        </template>
        <template
            v-if="tender.related_tenders && tender.related_tenders.length"
        >
            <div class="tender__related-title">
                Связанные тендеры
            </div>
            <div class="tender__related-block">
                <div 
                    v-for="item in tender.related_tenders"
                    class="tender__related-item"
                >
                    <router-link
                        :to="{ name: 'tender', params: { id: item.id } }"
                        class="tender__related-link"
                    >
                        {{ item.kind_detail }} №{{ item.id }}
                    </router-link>
                    <div>
                        {{ item.status_detail }}
                    </div>
                    <div>
                        <template
                            v-if="item.status === 'bid_accept'"
                        >
                            до {{ $helpers.formatDate(new Date(item.date_start), 'DD.MM.YYYY HH:mm', 'Europe/Moscow') }} МСК
                        </template>
                        <template
                            v-if="item.status === 'bidding_process'"
                        >
                            до {{ $helpers.formatDate(new Date(item.date_end), 'DD.MM.YYYY HH:mm', 'Europe/Moscow') }} МСК
                        </template>
                        <template
                            v-else-if="item.status === 'bidding_completed' || item.status === 'fulfilment'"
                        >
                            до {{ $helpers.formatDate(new Date(item.date_fulfilment), 'DD.MM.YYYY HH:mm', 'Europe/Moscow') }} МСК
                        </template>
                    </div>
                    <button 
                        class="button button-outline-green"
                        @click="$router.push({ name: 'tender', params: { id: item.id } })"
                    >
                        Подробнее
                    </button>
                </div>
            </div>
        </template>
    </div>
</template>
<script>
    export default {
        props: {
            tender: {
                type: Object,
                default() { return {}; }
            },
        },
        data() {
            return {
            }
        },
        created() {
        },
        mounted() {
        },
        methods: {
        }
    }
</script>