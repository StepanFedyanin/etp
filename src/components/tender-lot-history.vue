<template>
    <div class="lot__history">
        <div class="lot__history-title m--title">
            История предложений
        </div>
        <div class="lot__history-list">
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
                    <p class="m--color-red">Доступ на получение данных запрещен.</p>                    
                </template>
            </template>
        </div>
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
        },
        data() {
            return {
                user: this.$store.state.user,
                history: [],
                access: true,
                showLoaderSending: false,
            }
        },
        computed: {
        },
        created() {
        },
        mounted() {
            this.getTenderLotBets(this.tenderId, this.lotId);
        },
        methods: {
            getTenderLotBets(tenderId, lotId) {
                this.showLoaderSending = true;
                tenderApi.getTenderLotBets(tenderId, lotId).then(res => {
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
        },
    };
</script>
