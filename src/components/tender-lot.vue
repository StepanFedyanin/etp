<template>
    <div 
        class="lot"
    >
        <template
            v-if="showLoaderSending"
        >
            <div class="tender__loader loader">
                <div class="spinner" /> Обновление данных лота
            </div>
        </template>
        <template
            v-else
        >
            <div class="lot__info">
                <div class="lot__info-top">
                    <div class="lot__info-number m--title">
                        Лот №{{ lotData.num }}
                    </div>
                    <div 
                        class="lot__info-participants"
                        :class="participants ? 'm--color-green' : 'm--color-red'"
                    >
                        {{ participants ? $helpers.stringForNumber(participants, ['участник', 'участника', 'участников']) : 'Нет участников' }}
                    </div>
                </div>
                <div class="lot__info-name">
                    {{ lotData.name }}
                </div>
                <div class="lot__info-data">
                    <div class="lot__info-unit">
                        <span>{{ lotData.quantity }}</span> {{ lotData.unit }}
                    </div>
                    <div class="lot__info-price">
                        <span>{{ $helpers.toPrice(lotData.price, { sign: tender.currency_detail, pointer: ',' }) }}</span>/{{ lotData.unit }} (в т. ч. <span>НДС: {{ lotData.nds > 0 ? lotData.nds_detail : '—' }}</span>)
                    </div>
                </div>

                <div class="lot__info-params">
                    <div class="lot__info-param">
                        Начальная цена (с НДС):
                        <span>{{ $helpers.toPrice(lotData.price * lotData.quantity, { sign: tender.currency_detail, pointer: ',' }) }}</span>
                    </div>
                    <div 
                        v-if="tender.kind === 'tender'"
                        class="lot__info-param"
                    >
                        Лучшая ставка:
                        <span
                            v-if="lotData.last_price"
                        >
                            {{ $helpers.toPrice(lotData.last_price, { sign: tender.currency_detail, pointer: ',' }) }}
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
                    :lotId="lotData.id"
                    :winnerBet="lotData.winner_bet"
                    @setParticipants="setParticipants"
                />
            </div>
            <TenderLotHistory
                :tender="tender"
                :lot="lotData"
                :tenderId="tender.id"
                :lotId="lotData.id"
                @getTenderLot="getTenderLot"
            />
            <ModalLotWinner
                v-if="lotWinner"
                :tender="tender"
                :lot="lotWinner"
                :showModal="showWinnerLotModal"
                @hideModal="hideWinnerLotModal"
            />            
        </template>
    </div>
</template>

<script>
    import { tender as tenderApi } from "@/services";
    import TenderLotParticipants from '@/components/tender-lot-participants';
    import TenderLotHistory from '@/components/tender-lot-history';
    import ModalLotWinner from '@/components/modals/lot-winner';
    export default {
        components: {
            TenderLotParticipants,
            TenderLotHistory,
            ModalLotWinner
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
                lotData: this.lot,
                showWinnerLotModal: false,
                showLoaderSending: false,
            }
        },
        computed: {
        },
        created() {
        },
        mounted() {
        },
        methods: {
            getTenderLot() {
                this.showLoaderSending = true;
                tenderApi.getTenderLot(this.tender.id, this.lotData.id).then(res => {
                    console.log(res);
                    this.lotData = res;
                    //this.$emit('setParticipants', this.participants);
                    this.showLoaderSending = false;
                }).catch(err => {
                    console.error(err);
                    this.showLoaderSending = false;
                });
            },
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
