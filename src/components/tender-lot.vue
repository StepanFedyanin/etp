<template>
    <div 
        class="lot"
    >
        <div class="lot__info">
            <div class="lot__info-top">
                <div class="lot__info-number m--title">
                    Лот №{{ lot.num }} {{ tender.kind }}
                </div>
                <div 
                    class="lot__info-participants"
                    :class="participants ? 'm--color-green' : 'm--color-red'"
                >
                    {{ participants ? $helpers.stringForNumber(participants, ['участник', 'участника', 'участников']) : 'Нет участников' }}
                </div>
            </div>
            <div class="lot__info-name">
                {{ lot.name }}
            </div>
            <div class="lot__info-data">
                <div class="lot__info-unit">
                    <span>{{ lot.quantity }}</span> {{ lot.unit }}
                </div>
                <div class="lot__info-price">
                    <span>{{ $helpers.toPrice(lot.price, { sign: tender.currency_detail, pointer: ',' }) }}</span>/{{ lot.unit }} (в т. ч. <span>НДС: {{ lot.nds > 0 ? lot.nds_detail : '—' }}</span>)
                </div>
            </div>

            <div class="lot__info-params">
                <div class="lot__info-param">
                    Начальная цена (с НДС):
                    <span>{{ $helpers.toPrice(lot.price * lot.quantity, { sign: tender.currency_detail, pointer: ',' }) }}</span>
                </div>
                <div 
                    v-if="tender.kind === 'tender'"
                    class="lot__info-param"
                >
                    Лучшая ставка:
                    <span
                        v-if="lot.last_price"
                    >
                        {{ $helpers.toPrice(lot.last_price, { sign: tender.currency_detail, pointer: ',' }) }}
                    </span>
                    <span
                        v-else
                    >
                        —
                    </span>
                </div>

                <div 
                    v-if="tender.kind === 'tender'"
                    class="lot__info-param"
                >
                    Снижение:
                    <span
                        v-if="priceDecline(lot)"
                    >
                        {{ $helpers.toPrice(priceDeclinePercent(lot), { sign: '%', pointer: ',' }) }} / <i class="m--color-green">{{ $helpers.toPrice(priceDecline(lot), { sign: tender.currency_detail, pointer: ',' }) }}</i>
                    </span>
                    <span
                        v-else
                    >
                        —
                    </span>
                </div>
            </div>

            <TenderLotParticipants
                :tenderId="tender.id"
                :lotId="lot.id"
                :winnerBet="lot.winner_bet"
                @setParticipants="setParticipants"
            />
        </div>
        <TenderLotHistory
            :tenderId="tender.id"
            :lotId="lot.id"
        />
        <ModalWinnerLot
            v-if="lotWinner"
            :tender="tender"
            :lot="lotWinner"
            :showModal="showWinnerLotModal"
            @hideModal="hideWinnerLotModal"
        />
    </div>
</template>

<script>
    import { tender as tenderApi } from "@/services";
    import TenderLotParticipants from '@/components/tender-lot-participants';
    import TenderLotHistory from '@/components/tender-lot-history';
    import ModalWinnerLot from '@/components/modal-winner-lot';
    export default {
        components: {
            TenderLotParticipants,
            TenderLotHistory,
            ModalWinnerLot
        },
        props: {
            tender: {
                type: Object,
                default() { return {}; }
            },
            lot: {
                type: Object,
                default() { return {}; }
            },
        },
        data() {
            return {
                user: this.$store.state.user,
                participants: null,
                lotWinner: null,
                showWinnerLotModal: false,
                showLoadingSeding: false,
            }
        },
        computed: {
        },
        created() {
        },
        mounted() {
        },
        methods: {
            setParticipants(participants) {
                this.participants = participants.length;
            },
            priceDecline(lot) {
                return ((lot.price * lot.quantity) - (lot.last_price || (lot.price * lot.quantity)));
            },
            priceDeclinePercent(lot) {
                return (100 - 100 * (lot.last_price || (lot.price * lot.quantity)) / (lot.price * lot.quantity));
            },
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
