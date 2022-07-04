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
            <template
                v-for="lot in lots"
            >
                <div
                    v-if="filterLot(lot)"
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
                                {{ $helpers.toPrice(lot.last_price, { sign: '₽' }) }}
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
                                {{ $helpers.toPrice(lot.user_price, { sign: '₽' }) }}
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
                            @click.prevent="onClickAddLotOffer(lot)"
                        >
                            Сделать ставку
                        </button>
                    </div>
                </div>
            </template>
        </div>
        <ModalAddLotOffer
            :tender="tender || {}"
            :lot="lot || {}"
            :showModal="showAddLotOfferModal"
            @hideModal="hideAddLotOfferModal"
        />
    </div>
</template>

<script>
    import ModalAddLotOffer from '@/components/modal-add-lot-offer';
    export default {
        components: {
            ModalAddLotOffer
        },
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
                lot: null,
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
                currentSorting: 'participate',
                showAddLotOfferModal: false,
            }
        },
        computed: {
        },
        mounted() {
        },
        created() {
        },
        methods: {
            filterLot(lot) {
                if (this.currentFilter === 'participate' && lot.user_price) {
                    return true;
                }
                if (this.currentFilter === 'not_participate' && !lot.user_price) {
                    return true;
                }
                if (this.currentFilter === 'all') {
                    return true;
                }
                return false;
            },
            changeFilter(key) {
                this.currentFilter = key;
            },
            changeSorting(key) {
                this.currentSorting = key;
            },
            onClickAddLotOffer(lot) {
                this.lot = lot;
                this.showAddLotOfferModal = true;
            },
            hideAddLotOfferModal(updateData) {
                this.showAddLotOfferModal = false;
                if (updateData) {
                    this.$emit('getTenderData');
                }
            },
        },
    };
</script>