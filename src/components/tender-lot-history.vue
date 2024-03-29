<template>
    <div class="lot__history">
        <div class="lot__history-title m--title">
            История предложений
            <a
                v-if="showCancelLotOffer"
                href="#"
                class="lot__history-title-link"
                @click.prevent="onClickCancelLotOffer()"
            >
                Отменить последнюю ставку
            </a>
        </div>
        <div class="lot__history-list">
            <div class="lot__history-list-inner">
                <template
                    v-if="showLoaderSending"
                >
                    <div class="tender__loader loader">
                        <div class="spinner" /> Загрузка данных истории ставок
                    </div>
                </template>
                <template
                    v-else-if="history.length"
                >
                    <div 
                        v-for="item in history"
                        :key="`history-${item.id}`"
                        class="lot__history-item"
                        :class="item.publication ? '' : 'm--deleted'"
                    >
                        <div class="lot__history-item-date">
                            {{ $helpers.formatDate(new Date(item.date_publication), 'HH:mm:ss', 'Europe/Moscow') }} МСК<br>
                            <span>{{ $helpers.formatDate(new Date(item.date_publication), 'DD.MM.YYYY', 'Europe/Moscow') }}</span>
                        </div>
                        <div class="lot__history-item-name">
                            {{ item.organization.name }}
                        </div>
                        <div 
                            class="lot__history-item-bet"
                        >
                            {{ $helpers.toPrice(item.price, { sign: item.currency_detail, pointer: ',' }) }}
                        </div>
                    </div>
                </template>
                <template
                    v-else
                >
                    <template
                        v-if="access"
                    >
                        <p>Участники тендера не сделали ни одного предложения по данному лоту.</p>   
                    </template>
                    <template
                        v-else
                    >
                        <p class="m--color-red">
                            Доступ на получение данных запрещен.
                        </p>                    
                    </template>
                </template>
            </div>
        </div>
        <ModalLotOfferStaffCancel
            v-if="lot.last_bet"
            :tender="tender || {}"
            :lot="lot || {}"
            :showModal="showCancelLotOfferModal"
            @hideModal="hideCancelLotOfferModal"
        />
    </div>
</template>

<script>
    import { tender as tenderApi } from "@/services";
    import ModalLotOfferStaffCancel from '@/components/modals/lot-offer-staff-cancel';
    export default {
        components: {
            ModalLotOfferStaffCancel
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
        emits: ['getTenderLot'],
        data() {
            return {
                user: this.$store.state.user,
                history: [],
                access: true,
                showCancelLotOfferModal: false,
                showLoaderSending: false,
            }
        },
        computed: {
            showCancelLotOffer() {
                if (this.user.is_staff) return true;
                if (this.user.organization?.id === this.tender.creator) {
                    if  (this.tender.kind === 'tender' && this.lot.last_bet && this.tender.status === 'bid_accept') return true;
                }
                return false;
            }
        },
        created() {
        },
        mounted() {
            this.getTenderLotBets();
        },
        methods: {
            getTenderLotBets() {
                this.showLoaderSending = true;
                tenderApi.getTenderLotBets(this.tender.id, this.lot.id).then(res => {
                    console.log(res);
                    this.history = res;
                    //this.$emit('setParticipants', this.participants);
                    this.showLoaderSending = false;
                }).catch(err => {
                    console.error(err);
                    this.history = [];
                    if (err.response.status === 403) {
                        this.access = false;
                    }
                    this.showLoaderSending = false;
                });
            },
            onClickCancelLotOffer(lot) {
                this.showCancelLotOfferModal = true;
            },
            hideCancelLotOfferModal(updateData) {
                this.showCancelLotOfferModal = false;
                if (updateData) {
                    //this.getTenderLotBets();
                    this.$emit('getTenderLot');
                }
            },
        },
    };
</script>
