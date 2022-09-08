<template>
    <div> 
        <!-- <pre>{{tender.user_participation}}</pre><pre>{{tender.status}}</pre> -->
        <div 
            v-if="!tender.user_participation && tender.status === 'bid_accept' && tender.user_invite && tender.user_invite.status === 'sent'"
            class="tender__status"
        >
            <div class="tender__status-title">
                Статус вашей организации: приглашена к участию
            </div>
            <div class="tender__status-block">
                <button 
                    class="button button-green"
                    @click="onClickRequestPartipation()"
                >
                    Подать заявку
                </button>
                <button 
                    class="button button-red"
                    @click="onClickRejectInvite()"
                >
                    Отказаться
                </button>
            </div>
        </div>

        <div 
            v-else-if="!tender.user_participation && tender.status === 'bid_accept' && tender.user_invite && tender.user_invite.status === 'accepted'"
            class="tender__status"
        >
            <div class="tender__status-title">
                Статус вашей организации: приглашение принято
            </div>
            <div class="tender__status-block">
                <button 
                    class="button button-green"
                    @click="onClickRequestPartipation()"
                >
                    Подать заявку
                </button>
            </div>
        </div>

        <div 
            v-else-if="!tender.user_participation && tender.status === 'bid_accept' && !tender.user_invite"
            class="tender__status"
        >
            <div class="tender__status-title">
                Статус вашей организации: не участвует в тендере
            </div>
            <div class="tender__status-block">
                <button 
                    class="button button-green"
                    @click="onClickRequestPartipation()"
                >
                    Подать заявку
                </button>
            </div>
        </div>

        <div 
            v-else-if="tender.user_participation && tender.user_participation.status === 'sent'"
            class="tender__status"
        >
            <div class="tender__status-title">
                Статус вашей организации: <span>Заявка на рассмотрении</span>
            </div>
        </div>

        <div 
            v-else-if="tender.user_participation && tender.user_participation.status === 'rejected'"
            class="tender__status"
        >
            <div class="tender__status-title">
                Статус вашей организации: <span class="m--color-red">Заявка отклонена</span>
            </div>
            <div class="tender__status-block m--underline tender__docs">
                <div class="tender__status-subtitle">
                    Документация участника
                </div>
                <div class="tender__docs-list">
                    <div class="tender__docs-item m--width-30-70">
                        <div class="tender__docs-cell m--title">
                            Файл
                        </div>
                        <div class="tender__docs-cell m--title">
                            Описание
                        </div>
                    </div>
                    <div
                        v-for="doc in tender.user_participation.documents"
                        :key="`doc-${doc.id}`"
                        class="tender__docs-item m--width-30-70"
                    >
                        <a
                            :href="urlPath + doc.file"
                            class="tender__docs-cell m--file"
                        >
                            {{ doc.name }}
                        </a>
                        <div class="tender__docs-cell m--desc">
                            {{ doc.description }}
                        </div>
                    </div>
                </div>
            </div>
            <div 
                v-if="tender.user_participation.comment"
                class="tender__status-block m--underline m--column"
            >
                <div class="tender__status-subtitle">
                    Комментарий участника
                </div>
                <div class="tender__status-comment">
                    {{ tender.user_participation.comment }}
                </div>
            </div>
            <div class="tender__status-block m--column">
                <div class="tender__status-subtitle">
                    Решение организатора <span class="m--color-red">Заявка отклонена</span>
                </div>
                <div
                    v-if="tender.user_participation.creator_comment" 
                    class="tender__status-comment"
                >
                    {{ tender.user_participation.creator_comment }}
                </div>
            </div>
            <div class="tender__status-block">
                <button 
                    class="button button-green"
                    @click="onClickRequestPartipation()"
                >
                    Подать заявку снова
                </button>
            </div>
        </div>

        <div 
            v-else-if="tender.user_participation && tender.user_participation.status === 'winner'"
            class="tender__status"
        >
            <div 
                v-if="tender.status === 'bidding_completed'"
                class="tender__status-title"
            >
                Статус вашей организации: <span class="m--color-green">Победитель (предварительно)</span>
            </div>
            <div 
                v-else-if="tender.status === 'closed' || tender.status === 'fulfilment'"
                class="tender__status-title"
            >
                Статус вашей организации: <span class="m--color-green">Победитель</span>
            </div>
        </div>

        <div 
            v-else-if="tender.user_participation"
            class="tender__status"
        >
            <div class="tender__status-title">
                Статус вашей организации: <span class="m--color-green">Участник</span>
            </div>
        </div>

        <ModalRequestPartipation
            :showModal="showRequestPartipationModal"
            :tender="tender"
            @getTenderData="getTenderData"
            @hideModal="hideRequestPartipationModal"
        />
    </div>
</template>

<script>
    import ModalRequestPartipation from '@/components/modal-request-partipation';
    import { urlPath } from '@/settings'
    import { tender as tenderApi } from "@/services"

    export default {
        components: {
            ModalRequestPartipation
        },
        props: {
            tender: {
                type: Object,
                default() { return {}; }
            },
        },
        data() {
            return {
                urlPath,
                showRequestPartipationModal: false,
            }
        },
        computed: {
        },
        mounted() {
        },
        created() {
        },
        methods: {
            onClickRequestPartipation() {
                this.showRequestPartipationModal = true;
                if (this.tender.user_invite) {
                    tenderApi.acceptInvitation(this.tender.id).then(res => {
                        console.log(res);
                    }).catch(err => {
                        this.$store.dispatch('showError', err);
                        console.error(err);
                    });
                }
            },
            hideRequestPartipationModal(updateData) {
                this.showRequestPartipationModal = false;
                if (updateData) {
                    this.$emit('getTenderData');
                }
            },
            onClickAcceptInvite() {
                tenderApi.acceptInvitation(this.tender.id).then(res => {
                    console.log(res);
                }).catch(err => {
                    this.$store.dispatch('showError', err);
                    console.error(err);
                });
            },
            onClickRejectInvite() {
                tenderApi.rejectInvitation(this.tender.id).then(res => {
                    console.log(res);
                }).catch(err => {
                    this.$store.dispatch('showError', err);
                    console.error(err);
                });
            }
        },
    };
</script>
