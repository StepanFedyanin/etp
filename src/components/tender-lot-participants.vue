<template>
    <div 
        class="lot__info-contragents"
        :class="participants.length ? '' : 'm--empty'"
    >
        <template
            v-if="showLoaderSending"
        >
            <div class="tender__loader loader">
                <div class="spinner" /> Загрузка данных истории ставок
            </div>
        </template>
        <template
            v-else-if="participants.length"
        >
            <div class="lot__info-contragents-title m--title">
                Лучшие предложения участников
            </div>
            <ol>
                <li
                    v-for="participant in participants"
                    :key="`participant-${participant.id}`"
                >
                    <div class="lot__info-contragent">
                        <router-link
                            :to="{ name: 'contragent', params: {id: participant.organization.id} }"
                        >
                            {{ participant.organization.name }}
                        </router-link>
                        <span
                            :class="winnerBet && winnerBet.price === participant.price ? 'm--color-green' : ''"
                        >
                            {{ $helpers.toPrice(participant.price, { sign: participant.currency_detail, pointer: ',' }) }}
                        </span>
                    </div>
                </li>
            </ol>
        </template>
    </div>
</template>

<script>
    import { tender as tenderApi } from "@/services";
    export default {
        components: {
        },
        props: {
            tenderId: {
                type: [Number, String],
                default() { return null; }
            },
            lotId: {
                type: [Number, String],
                default() { return null; }
            },
            winnerBet: {
                type: Object,
                default() { return {}; }
            },
        },
        data() {
            return {
                user: this.$store.state.user,
                participants: [],
                showLoaderSending: false,
            }
        },
        computed: {
        },
        created() {
        },
        mounted() {
            this.getTenderLotUsers(this.tenderId, this.lotId);
        },
        methods: {
            getTenderLotUsers(tenderId, lotId) {
                this.showLoaderSending = true;
                tenderApi.getTenderLotUsers(tenderId, lotId).then(res => {
                    console.log(res);
                    res = res.sort((a, b) => {
                        if (a.price > b.price)
                            return 1;
                        if (a.price < b.price)
                            return -1;
                        return 0;
                    });
                    this.participants = res;
                    this.$emit('setParticipants', this.participants);
                    this.showLoaderSending = false;
                }).catch(err => {
                    console.error(err);
                    this.participants = [];
                    this.showLoaderSending = false;
                });
            },
        },
    };
</script>
