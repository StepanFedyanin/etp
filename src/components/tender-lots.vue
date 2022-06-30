<template>
    <div 
        class="tender__lots lots"
        :class="(tender.status === 'bidding_process' && user.id === tender.creator) ? 'm--process' : ''"
    >
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
            <div class="lots__header-cell m--tax">
                Ставка НДС
            </div>
            <div class="lots__header-cell m--price">
                Цена
            </div>
            <div class="lots__header-cell m--sum">
                Сумма, с учетом НДС
            </div>
            <template
                v-if="tender.status === 'bidding_process' && user.id === tender.creator"
            >
                <div class="lots__header-cell m--sum">
                    Участник с лучшей ставкой
                </div>
                <div class="lots__header-cell m--sum">
                    Лучшая ставка
                </div>
            </template>
        </div>
        <div class="lots__list">
            <div
                v-for="lot in lots"
                :key="`lot-${lot.id}`" 
                class="lots__item"
            >
                <div class="lots__item-cell m--position">
                    {{ lot.num }}
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
                <div class="lots__item-cell">
                    {{ lot.nds }}
                </div>
                <div class="lots__item-cell">
                    {{ $helpers.toPrice(lot.price, { sign: '₽', pointer: ',' }) }}
                </div>
                <div class="lots__item-cell">
                    {{ $helpers.toPrice(lot.quantity * lot.price, { sign: '₽', pointer: ',' }) }}
                </div>
                <template
                    v-if="tender.status === 'bidding_process' && user.id === tender.creator"
                >
                    <div class="lots__item-cell">
                        <template
                            v-if="lot.last_bet"
                        >
                            {{ lot.last_bet.organization.name }}
                        </template>
                        <template
                            v-else
                        >
                            —
                        </template>
                    </div>
                    <div class="lots__item-cell">
                        <template
                            v-if="lot.last_bet"
                        >
                            {{ $helpers.toPrice(lot.last_bet.price || 0, { sign: '₽', pointer: ',' }) }}
                        </template>
                        <template
                            v-else
                        >
                            —
                        </template>
                    </div>
                </template>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            tender: {
                type: Object,
                default() { return {}; }
            },
            lots: {
                type: Array,
                default() { return []; }
            },
        },
        data() {
            return {
                user: this.$store.state.user,
            }
        },
        computed: {
        },
        mounted() {
        },
        created() {
        },
        methods: {
            AddLotOffer(id) {
                this.$emit('AddLotOffer', id);
            }
        },
    };
</script>
