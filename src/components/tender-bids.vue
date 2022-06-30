<template>
    <div class="tender__lots lots m--tender">
        <div class="tender__lots-title">
            Лоты
        </div>
        <div class="lots__filter">
            <div class="lots__filter-block">
                Фильтр:
                <a
                    v-for="(item, key) in filters"
                    :key="`filter-${key}`"
                    href="#"
                    class="lots__filter-item"
                    :class="key === currentFilter ? 'is-active' : ''"
                    @click.prevent="changeFilter(key)"
                >
                    {{ item }}
                </a>
            </div>
            <div class="lots__filter-block m--right">
                Сортировка:
                <a
                    v-for="(item, key) in sorting"
                    :key="`sorting-${key}`"
                    href="#"
                    class="lots__filter-item"
                    :class="key === currentSorting ? 'is-active' : ''"
                    @click.prevent="changeSorting(key)"
                >
                    {{ item }}
                </a>
            </div>
        </div>

        <div class="lots__block">
            <div
                v-for="lot in lots"
                :key="`lot-bid-${lot.id}`"
                class="lots__item lots__block-item m--no-grid"
            >
                <div class="lots__item-header">
                    Лот №{{ lot.num }}
                    <div 
                        v-if="!lot.user_price"
                        class="lots__item-status"
                    >
                        Вы не участвуете
                    </div>
                    <template
                        v-else
                    >
                        <div 
                            v-if="lot.user_price > lot.last_price"
                            class="lots__item-status m--color-red"
                        >
                            Ставка проигрывает
                        </div>
                        <div 
                            v-else
                            class="lots__item-status m--color-green"
                        >
                            Ставка выигрывает
                        </div>
                    </template>
                </div>
                <div class="lots__item-name">
                    {{ lot.name }}
                </div>
                <div class="lots__item-params">
                    <div class="lots__item-param m--underline">
                        {{ lot.quantity }} {{ lot.unit }}
                        <span>{{ $helpers.toPrice(lot.price, { sign: '₽ / ед.' }) }}</span>
                    </div>
                    <div class="lots__item-param">
                        Начальная цена:
                        <span>{{ $helpers.toPrice(lot.price * lot.quantity, { sign: '₽' }) }}</span>
                    </div>
                    <div class="lots__item-param">
                        Лучшая ставка:
                        <span
                            v-if="lot.last_price"
                        >
                            {{ $helpers.toPrice(lot.last_price * lot.quantity, { sign: '₽' }) }}
                        </span>
                        <span
                            v-else
                        >
                            —
                        </span>
                    </div>
                    <div class="lots__item-param">
                        Ваша ставка:
                        <span
                            v-if="lot.user_price"
                        >
                            {{ $helpers.toPrice(lot.user_price * lot.quantity, { sign: '₽' }) }}
                        </span>
                        <span
                            v-else
                        >
                            —
                        </span>
                    </div>
                </div>
                <div class="lots__item-buttons">
                    <button 
                        class="button button-outline-green"
                        @click.stop="AddLotOffer(lot)"
                    >
                        Сделать ставку
                    </button>
                </div>
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
                filters: {
                    all: 'Показать все',
                    participate: 'Участвую',
                    not_participate: 'Не участвую',
                },
                currentFilter: 'all',
                sorting: {
                    participate: 'По участию',
                    lot_number: 'По номеру лота'

                },
                currentSorting: 'participate'
            }
        },
        computed: {
        },
        mounted() {
        },
        created() {
        },
        methods: {
            changeFilter(key) {
                this.currentFilter = key;
            },
            changeSorting(key) {
                this.currentSorting = key;
            },
            AddLotOffer(lot) {
                this.$emit('AddLotOffer', lot);
            }
        },
    };
</script>
