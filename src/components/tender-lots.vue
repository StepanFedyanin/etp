<template>
    <div class="tender__lots">
        <div class="tender__lots-title">
            Лоты
        </div>
        <div :class="['lots', tenderProcess ? 'm--process' : showWinners ? 'm--finished' : '']">
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
                            В т.ч. НДС
                        </div>
                        <div class="lots__header-cell m--price">
                            Цена
                        </div>
                        <div class="lots__header-cell m--sum">
                            Сумма
                        </div>
                        <template v-if="tenderProcess">
                            <div class="lots__header-cell m--sum">
                                Участник с лучшей ставкой
                            </div>
                            <div class="lots__header-cell m--sum">
                                Лучшая ставка
                            </div>
                        </template>
                        <template v-if="showWinners">
                            <div class="lots__header-cell m--sum">
                                Победитель
                            </div>
                            <div class="lots__header-cell m--sum">
                                Ставка победителя
                            </div>
                            <!--div class="lots__header-cell m--edit" /-->
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
                                {{ lot.price ? $helpers.toPrice(lot.price, { sign: tender.currency_detail, pointer: ',' }) : '—' }}
                            </div>
                            <div class="lots__item-cell">
                                {{ lot.price ? $helpers.toPrice(lot.quantity * lot.price, { sign: tender.currency_detail, pointer: ',' }) : '—' }}
                            </div>
                            <template v-if="tenderProcess">
                                <div class="lots__item-cell">
                                    <template v-if="lot.last_bet">
                                        {{ lot.last_bet.organization.name }}
                                    </template>
                                    <template v-else>
                                        —
                                    </template>
                                </div>
                                <div class="lots__item-cell m--bold">
                                    <template v-if="lot.last_bet">
                                        {{ $helpers.toPrice(lot.last_bet.price || 0, { sign: tender.currency_detail, pointer: ',' }) }}
                                    </template>
                                    <template v-else>
                                        —
                                    </template>
                                </div>
                            </template>
                            <template v-else-if="showWinners">
                                <template v-if="tender.status === 'bidding_completed'">
                                    <div class="lots__item-cell">
                                        <a
                                            v-if="user.organization?.id === tender.creator"
                                            href="#"
                                            class="lots__item-edit"
                                            @click.prevent="onClickWinnerLotModal(lot)"
                                        />
                                        <template v-if="lot.winner_organization">
                                            {{ lot.winner_organization.name }}
                                        </template>
                                        <template v-else>
                                            —
                                        </template>
                                    </div>
                                    <div class="lots__item-cell m--bold">
                                        <template v-if="lot.winner_bet?.price">
                                            {{ $helpers.toPrice(lot.winner_bet.price || 0, { sign: tender.currency_detail, pointer: ',' }) }}
                                        </template>
                                        <template v-else>
                                            —
                                        </template>
                                    </div>
                                    <!--div 
                                        v-if="user.organization?.id === tender.creator"
                                        class="lots__item-cell m--edit"
                                    >
                                        <a
                                            href="#"
                                            class="lots__item-edit"
                                            @click.prevent="onClickWinnerLotModal(lot)"
                                        />
                                    </div-->
                                </template>
                                <template v-else-if="tender.status === 'closed' || tender.status === 'fulfilment'">
                                    <div class="lots__item-cell">
                                        <template v-if="lot.winner_organization">
                                            {{ lot.winner_organization.name }}
                                        </template>
                                        <template v-else>
                                            —
                                        </template>
                                    </div>
                                    <div class="lots__item-cell m--bold">
                                        <template v-if="lot.winner_bet?.price">
                                            {{ $helpers.toPrice(lot.winner_bet.price || 0, { sign: tender.currency_detail, pointer: ',' }) }}
                                        </template>
                                        <template v-else>
                                            —
                                        </template>
                                    </div>
                                </template>
                            </template>
                        </div>
                    </div>
                </div>
            </div>
            <ModalLotWinner
                v-if="lotWinner"
                :tender="tender"
                :lot="lotWinner"
                :showModal="showWinnerLotModal"
                @hideModal="hideWinnerLotModal"
            />
        </div>
    </div>
</template>

<script>
    import ModalLotWinner from '@/components/modals/lot-winner';
    export default {
        components: {
            ModalLotWinner
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
                lotWinner: null,
                showWinnerLotModal: false,
            }
        },
        computed: {
            tenderProcess() {
                return this.tender.status === 'bidding_process' && (this.user.id === this.tender.creator || this.user.is_staff);
            },
            showWinners() {
                return (this.tender.status === 'closed' || this.tender.status === 'bidding_completed' || this.tender.status === 'fulfilment') && (this.user.id === this.tender.creator || this.user.is_staff || this.user.organization?.id === this.tender.organization?.id || (this.tender.user_participation && this.tender.user_participation?.status === 'participant'));
            },
            user() {
                return this.$store.state.user || {};
            }
        },
        mounted() {
            //console.log('MOUNTED', this.lot);
        },
        created() {
        },
        methods: {
            onClickWinnerLotModal(lot) {
                console.log('onClickWinnerLotModal');
                this.lotWinner = lot;
                this.showWinnerLotModal = true;
            },
            hideWinnerLotModal(updateData) {
                this.showWinnerLotModal = false;
                if (updateData) {
                    this.lotWinner = null;
                    this.$emit('getTenderData');
                }
            },
        },
    };
</script>
