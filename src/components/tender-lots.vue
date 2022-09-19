<template>
    <div class="tender__lots">
        <div class="tender__lots-title">Лоты</div>
        <div 
            class="lots"
            :class="(tender.status === 'bidding_process' && user.id === tender.creator) ? 'm--process' : (tender.status === 'closed' || tender.status === 'bidding_completed') ? 'm--finished' : '' "
        >
            <div class="lots__inner">
                <div class="lots__inner-block">
                    <div class="lots__header">
                        <div class="lots__header-cell m--position">
                            №
                        </div>
                        <div class="lots__header-cell m--name">
                            Название
                        </div>
                        <div class="lots__header-cell m--nums">
                            Кол-во
                        </div>
                        <div class="lots__header-cell m--unit">
                            Ед.изм.
                        </div>
                        <div class="lots__header-cell m--tax">
                            НДС
                        </div>
                        <div class="lots__header-cell m--price">
                            Цена
                        </div>
                        <div class="lots__header-cell m--sum">
                            Сумма
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
                        <template
                            v-if="tender.status === 'closed' || tender.status === 'bidding_completed'"
                        >
                            <div class="lots__header-cell m--sum">
                                Победитель
                            </div>
                            <div class="lots__header-cell m--sum">
                                Ставка победителя
                            </div>
                            <div class="lots__header-cell m--edit" />
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
                                {{ lot.nds_detail }}
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
                                <div class="lots__item-cell m--bold">
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
                            <template
                                v-else-if="tender.status === 'bidding_completed'"
                            >
                                <div class="lots__item-cell">
                                    <template
                                        v-if="lot.winner_organization"
                                    >
                                        {{ lot.winner_organization.name }}
                                    </template>
                                    <template
                                        v-else
                                    >
                                        —
                                    </template>
                                </div>
                                <div class="lots__item-cell m--bold">
                                    <template
                                        v-if="lot.winner_bet.price"
                                    >
                                        {{ $helpers.toPrice(lot.winner_bet.price || 0, { sign: '₽', pointer: ',' }) }}
                                    </template>
                                    <template
                                        v-else
                                    >
                                        —
                                    </template>
                                </div>
                                <div 
                                    v-if="user.id === tender.creator"
                                    class="lots__item-cell m--edit"
                                >
                                    <a
                                        href="#"
                                        class="lots__item-edit"
                                        @click.prevent="onClickWinnerLotModal(lot)"
                                    />
                                </div>
                            </template>
                            <template
                                v-else-if="tender.status === 'closed'"
                            >
                                <div class="lots__item-cell">
                                    <template
                                        v-if="lot.winner_organization"
                                    >
                                        {{ lot.winner_organization.name }}
                                    </template>
                                    <template
                                        v-else
                                    >
                                        —
                                    </template>
                                </div>
                                <div class="lots__item-cell m--bold">
                                    <template
                                        v-if="lot.winner_bet && lot.winner_bet.price"
                                    >
                                        {{ $helpers.toPrice(lot.winner_bet.price || 0, { sign: '₽', pointer: ',' }) }}
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
            </div>
            <ModalWinnerLot
                v-if="lot"
                :tender="tender"
                :lot="lot"
                :showModal="showWinnerLotModal"
                @hideModal="hideWinnerLotModal"
            />
        </div>
    </div>
</template>

<script>
    import ModalWinnerLot from '@/components/modal-winner-lot';
    export default {
        components: {
            ModalWinnerLot
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
                user: this.$store.state.user,
                lot: null,
                showWinnerLotModal: false,
            }
        },
        computed: {
        },
        mounted() {
            console.log('MOUNTED', this.lot);
        },
        created() {
        },
        methods: {
            onClickWinnerLotModal(lot) {
                console.log('onClickWinnerLotModal');
                this.lot = lot;
                this.showWinnerLotModal = true;
            },
            hideWinnerLotModal(updateData) {
                this.showWinnerLotModal = false;
                if (updateData) {
                    this.lot = null;
                    this.$emit('getTenderData');
                }
            },
        },
    };
</script>
