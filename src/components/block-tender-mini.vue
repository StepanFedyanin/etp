<template>
    <div
        :class="blockClass" 
        class="tenders__item"
    >
        <div class="tenders__item-left">
            <router-link
                :to="{ name: 'tender', params: { id: tender.id } }"
                class="tenders__item-title"
            >
                {{ tender.name }}
            </router-link>
            <div class="tenders__item-price m--mobile">
                {{ $helpers.toPrice(tender.price, {sign: tender.currency_detail}) }}
            </div>
            <!-- <div class="tenders__item-param">
                <span class="tenders__item-param-name">Заказчик: </span> 
                <a href="#">{{ tender.organization && tender.organization.full_name ? tender.organization.full_name : '(())' }}</a>
            </div> -->
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
        </div>
        <div class="tenders__item-right">
            <div class="tenders__item-price">
                {{ $helpers.toPrice(tender.price, {sign: tender.currency_detail}) }}
            </div>
            <div class="tenders__item-param">
                <span class="tenders__item-param-name">{{ tender.kind_detail }} №{{ tender.id }}</span>
            </div>
            <!-- <div class="tenders__item-param">
                <span
                    v-if="tender.date_start" 
                    class="tenders__item-param-name">Объявлено:</span> {{ $helpers.formatDate(new Date(tender.date_start), 'DD.MM.YYYY HH:mm') }} МСК
            </div> -->
            <div class="tenders__item-param">
                <span class="tenders__item-param-name">Доступ:</span> {{ tender.type }}
            </div>
            <div class="tenders__item-param">
                <span class="tenders__item-param-name">Лоты:</span> {{ tender.lot_count }}
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        props: {
            blockClass: {
                type: String,
                default() { return ''; }
            },
            tender: {
                type: Object,
                default() { return {
                    // id: 1
                }; }
            }
        },
        // data() {
        //     return {
        //         category: undefined,
        //     }
        // },
    }
</script>