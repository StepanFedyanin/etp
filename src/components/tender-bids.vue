<template>
    <div class="tender__lots lots m--tender">
        <div class="tender__lots-title">
            {{ tender.kind === 'tender' ? 'Ставки' : 'Предложения' }}
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
                v-for="lot in sortedLots"
            >
                <div
                    v-if="filterLots(lot)"
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
                            <template
                                v-if="tender.kind === 'tender'"
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
                            <template
                                v-else
                            >
                                <div 
                                    class="lots__item-status m--color-green"
                                >
                                    Вы участвуете
                                </div>
                            </template>
                        </template>
                    </div>
                    <div class="lots__item-name">
                        {{ lot.name }}
                    </div>
                    <div class="lots__item-params">
                        <div class="lots__item-param m--underline">
                            {{ lot.quantity }} {{ lot.unit }}
                            <span>{{ $helpers.toPrice(lot.price, { sign: `${tender.currency_detail} / ед.` }) }} {{ lot.nds >= 0 ? `(в т.ч. НДС: ${lot.nds_detail})` : '' }}</span>
                        </div>
                        <div class="lots__item-param">
                            Начальная цена (с НДС):
                            <span>{{ $helpers.toPrice(lot.price * lot.quantity, { sign: tender.currency_detail }) }}</span>
                        </div>
                        <div 
                            v-if="tender.kind === 'tender'"
                            class="lots__item-param"
                        >
                            Лучшая ставка:
                            <span
                                v-if="lot.last_price"
                            >
                                {{ $helpers.toPrice(lot.last_price, { sign: tender.currency_detail }) }}
                            </span>
                            <span
                                v-else
                            >
                                —
                            </span>
                        </div>
                        <div class="lots__item-param">
                            {{ tender.kind === 'tender' ? 'Ваша ставка:' : 'ваше предложение:' }}
                            <span
                                v-if="lot.user_price"
                            >
                                {{ $helpers.toPrice(lot.user_price, { sign: tender.currency_detail }) }}
                            </span>
                            <span
                                v-else
                            >
                                —
                            </span>
                        </div>
                        <template
                            v-if="tender.kind === 'tender'"
                        >
                            <a
                                v-if="lot.user_price && lot.user_price === lot.last_price"
                                href="#"
                                class="lots__item-cancel"
                                @click.prevent="onClickCancelLotOffer(lot)"
                            >
                                Отменить последнюю ставку
                            </a>
                        </template>
                        <template
                            v-else
                        >
                            <a
                                v-if="lot.user_price"
                                href="#"
                                class="lots__item-cancel"
                                @click.prevent="onClickCancelLotOffer(lot)"
                            >
                                Отменить предложение
                            </a>
                        </template>
                    </div>
                    <div 
                        v-if="tender.user_participation.contact_person.id === user.id"
                        class="lots__item-buttons"
                    >
                        <template
                            v-if="tender.kind === 'tender'"
                        >
                            <button 
                                class="button button-outline-green"
                                @click.prevent="onClickAddLotOffer(lot)"
                            >
                                Сделать ставку
                            </button>
                        </template>
                        <template
                            v-else
                        >
                            <button 
                                class="button button-outline-green"
                                @click.prevent="onClickAddLotOffer(lot)"
                            >
                                {{ lot.user_price ? 'Изменить предложение' : 'Сделать предложение' }}
                            </button>
                        </template>
                    </div>
                </div>
            </template>
        </div>
        <ModalAddLotOffer
            v-if="showAddLotOfferModal"
            :tender="tender || {}"
            :lotId="lot.id"
            :showModal="showAddLotOfferModal"
            @hideModal="hideAddLotOfferModal"
        />
        <ModalCancelLotOffer
            :tender="tender || {}"
            :lot="lot || {}"
            :showModal="showCancelLotOfferModal"
            @hideModal="hideCancelLotOfferModal"
        />
    </div>
</template>

<script>
    import ModalAddLotOffer from '@/components/modal-add-lot-offer';
    import ModalCancelLotOffer from '@/components/modal-cancel-lot-offer';
    export default {
        components: {
            ModalAddLotOffer,
            ModalCancelLotOffer
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
                //bets: this.lots || [],
                user: this.$store.state.user,
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
                showCancelLotOfferModal: false,
                lot: {}
            }
        },
        computed: {
            sortedLots() {
                let bets = [...this.lots];
                bets = bets.sort((a, b) => {
                    if (a.num < b.num)
                        return -1;
                    if (a.num > b.num)
                        return 1;
                    return 0;
                });
                bets = bets.sort((a, b) => {
                    if (this.currentSorting === 'participate') {
                        if (a.user_price && !b.user_price)
                            return -1;
                        if (!a.user_price && b.user_price)
                            return 1;
                        return 0;                    
                    }
                });
                console.log(bets);
                return bets;
            }
        },
        mounted() {
        },
        created() {
        },
        methods: {
            filterLots(lot) {
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
            onClickCancelLotOffer(lot) {
                this.lot = lot;
                this.showCancelLotOfferModal = true;
            },
            hideCancelLotOfferModal(updateData) {
                this.showCancelLotOfferModal = false;
                if (updateData) {
                    this.$emit('getTenderData');
                }
            },
        },
    };
</script>
