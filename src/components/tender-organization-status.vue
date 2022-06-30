<template>
    <div>
        <div 
            v-if="!tender.user_participation"
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
            <div class="tender__status-block">
                <button 
                    class="button button-green"
                    disabled
                    @click="onClickRequestPartipation()"
                >
                    Подать заявку
                </button>
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
            <div class="tender__status-block m--underline">
                <div class="tender__status-subtitle">
                    Комментарий участника
                </div>
                <div class="tender__status-comment">
                    {{ tender.user_participation.comment }}
                </div>
            </div>
            <div class="tender__status-block">
                <div class="tender__status-subtitle">
                    Решение организатора <span class="m--color-red">Заявка отклонена</span>
                </div>
                <div class="tender__status-comment">
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
            v-else-if="tender.user_participation && tender.user_participation.status === 'participant'"
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
            },
            hideRequestPartipationModal(updateData) {
                this.showRequestPartipationModal = false;
                if (updateData) {
                    this.$emit('getTenderData');
                }
            },
        },
    };
</script>
