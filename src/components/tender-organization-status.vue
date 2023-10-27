<template>
    <div :class="modifierClass"> 
        <template
            v-if="!tender.user_participation && tender.status === 'bid_accept' && tender.user_invite && tender.user_invite.status === 'sent'"
        >
            <div class="h2">
                Статус вашей организации: приглашена к участию
            </div>
            <div class="tender__status">
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
        </template>
        <template 
            v-else-if="!tender.user_participation && tender.status === 'bid_accept' && tender.user_invite && tender.user_invite.status === 'accepted'"
        >
            <div class="h2">
                Статус вашей организации: приглашение принято
            </div>
            <div 
                class="tender__status"
            >
                <div class="tender__status-block">
                    <button 
                        class="button button-green"
                        @click="onClickRequestPartipation()"
                    >
                        Подать заявку
                    </button>
                </div>
            </div>
        </template>
        <template 
            v-else-if="!tender.user_participation && tender.status === 'bid_accept' && !tender.user_invite"
        >
            <div class="h2">
                Статус вашей организации: не участвует в тендере
            </div>
            <div 
                class="tender__status"
            >
                <div class="tender__status-block">
                    <button 
                        class="button button-green"
                        @click="user.id ? onClickRequestPartipation() : $router.push({ name: 'registration' })"
                    >
                        Подать заявку
                    </button>
                </div>
            </div>
        </template>
        <template 
            v-else-if="tender.user_participation && tender.user_participation.status === 'sent'"
        >
            <div class="h2 m--mb-3">
                Статус вашей организации:&nbsp;<span>Заявка на рассмотрении</span>
            </div>
        </template>
        <template
            v-else-if="tender.user_participation && tender.user_participation.status === 'rejected'"
        >
            <div class="h2">
                Статус вашей организации:&nbsp;<span class="m--color-red">Заявка отклонена</span>
            </div>
            <div 
                class="tender__status"
            >
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
        </template>

        <template 
            v-else-if="tender.user_participation && tender.user_participation.status === 'winner'"
        >
            <div 
                v-if="tender.status === 'bidding_completed'"
                class="h2 m--mb-3"
            >
                Статус вашей организации:&nbsp;<span class="m--color-green">Победитель (предварительно)</span>
            </div>
            <div 
                v-else-if="tender.status === 'closed' || tender.status === 'fulfilment'"
                class="h2 m--mb-3"
            >
                Статус вашей организации:&nbsp;<span class="m--color-green">Победитель</span>
            </div>
        </template>

        <template
            v-else-if="tender.user_participation"
        >
            <div class="h2 m--mb-3">
                Статус вашей организации:&nbsp;<span class="m--color-green">Участник</span>
            </div>
        </template>

        <ModalPartipationRequest
            :showModal="showRequestPartipationModal"
            :tender="tender"
            @getTenderData="getTenderData"
            @hideModal="hideRequestPartipationModal"
        />
    </div>
</template>

<script>
    import ModalPartipationRequest from '@/components/modals/partipation-request';
    import { urlPath } from '@/settings'
    import { tender as tenderApi } from "@/services"

    export default {
        components: {
            ModalPartipationRequest
        },
        props: {
            modifierClass: {
                type: String,
                default() { return ''; }
            },
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
            user() {
                return this.$store.state.user;
            },
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
                    this.$emit('getTenderData');
                    console.log(res);
                }).catch(err => {
                    this.$store.dispatch('showError', err);
                    console.error(err);
                });
            },
            onClickRejectInvite() {
                tenderApi.rejectInvitation(this.tender.id).then(res => {
                    this.$emit('getTenderData');
                    console.log(res);
                }).catch(err => {
                    this.$store.dispatch('showError', err);
                    console.error(err);
                });
            }
        },
    };
</script>
