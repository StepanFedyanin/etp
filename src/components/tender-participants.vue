<template>
    <div 
        v-if="participants.length"
        class="tender__participants"
    >
        <div class="tender__participants-title">Список участников</div>
        <div
            v-for="participant in participants" 
            :key="`participant-${participant.id}`"
            class="tender__participants-item"
        >
            <div class="tender__participants-item-block">
                <div class="tender__participants-item-name">{{ participant.organization.name }}</div>
                <div class="tender__participants-item-status">{{ participant.status }}</div>
                <div 
                    class="tender__participants-item-more"
                    :class="{'tender__participants-item-more--active': participant.isShowMore}"
                    @click="participant.isShowMore = !participant.isShowMore"
                    v-text="participant.isShowMore ? 'Свернуть' : 'Подробнее'"
                >
                    
                </div>
            </div>
            <Transition name="">
                <div
                    v-show="participant.isShowMore"
                    class="tender__participants-item-info partipation m--100"
                >
                    <div class="partipation__info">
                        <div class="partipation__info-organization">
                            <div class="partipation__info-item"><span>ИНН:</span></div>
                        </div>
                        <div class="partipation__info-person">
                            <div class="partipation__info-item"><span>Менеджер:</span> Иванов Иван Иванович</div>
                        </div>
                    </div>
                    <div
                        class="partipation__docs m--underline"
                    >
                        <div class="partipation__docs-title">
                            Документация
                        </div>
                        <div class="partipation__docs-list">
                            <div class="partipation__docs-item">
                                <div class="partipation__docs-cell m--title">
                                    Файл
                                </div>
                                <div class="partipation__docs-cell m--title">
                                    Описание
                                </div>
                            </div>
                            <div ref="documents">
                                <div
                                    v-for="(file, idx) in participant.documents"
                                    :key="idx"
                                    class="partipation__docs-item"
                                >
                                    <div class="partipation__docs-cell m--file">
                                        <a
                                            :href="urlPath + file.file"
                                        >
                                            {{ file.name || $helpers.getFilename(file.file) }}
                                        </a>
                                    </div>
                                    <div class="partipation__docs-cell">
                                    </div>
                                </div>                            
                            </div>
                        </div>
                    </div>
                    <div class="partipation__status m--underline">
                        <div class="partipation__status-title">
                            Комментарий участника
                        </div>
                        <div class="partipation__status-comment">
                            {{ participant.comment }}
                        </div>
                    </div>
                    <div 
                        v-if="participant.status !== 'sent'"
                        class="partipation__status"
                    >
                        <div class="partipation__status-title">
                            Ваше решение:
                            <span 
                                v-if="participant.status === 'participant'"
                                class="m--color-green"
                            >
                                Участвует в тендере
                            </span>
                        </div>
                        <div class="partipation__status-comment">
                            {{ participant.creator_comment }}
                        </div>
                    </div>

                    <div 
                        v-if="participant.status === 'sent'"
                        class="partipation__approve"
                    >
                        <FormKit
                            v-model="formValues"
                            name="form-approve"
                            preserve
                            type="form"
                            data-loading="loading"
                            form-class="$reset partipation__form form"
                            :actions="false"
                            :disabled="loadingConfirm || loadingDeny"
                            :loading="(loadingConfirm || loadingDeny) ? true : undefined"
                        >
                            {{ formValues }}
                            <div class="partipation__approve-title">Ваше решение</div>
                            <div class="partipation__approve-block">
                                <FormKit
                                    v-model="formValues.creator_comment"
                                    type="textarea"
                                    name="creator_comment"
                                    label=""
                                    placeholder="Введите комментарий к вашему решению"
                                />
                                <div>
                                    <div class="partipation__approve-info">
                                        Укажите ваш комментарий, если вы хотите сообщить контрагенту о причине отказа. Или уточнить какие документы необходимо отправить, чтобы участник был допущен к торгам.
                                    </div>
                                </div>
                            </div>
                            <div 
                                class="form__submit partipation__form-submit" 
                            >
                                <button
                                    type="submit"
                                    :disabled="loadingConfirm || loadingDeny"
                                    class="button button-red"
                                    :class="loadingDeny ? 'm--loading' : ''"
                                    @click.prevent="denyPartipation(participant.id)"
                                >
                                    Отказать
                                </button>
                                <button
                                    type="submit"
                                    :disabled="loadingConfirm"
                                    class="button button-green"
                                    :class="loadingConfirm ? 'm--loading' : ''"
                                    @click.prevent="confirmPartipation(participant.id)"
                                >
                                    Допустить
                                </button>
                            </div>
                        </FormKit>
                    </div>
                </div>
            </Transition>
        </div>
    </div>
</template>

<script>
    import { tender as tenderApi } from "@/services"
    export default {
        props: {
            tender: {
                type: Object,
                default() { return {}; }
            },
            participants: {
                type: Array,
                default() { return []; }
            },
        },
        data() {
            return {
                //participants: [],
                statuses: {
                    bid_accept: 'Прием заявок',
                },
                formValues: {},
                loadingConfirm: false,
                loadingDeny: false
            }
        },
        computed: {
        },
        mounted() {
        },
        created() {
        },
        methods: {
            confirmPartipation(participantId) {
                this.loadingConfirm = true;
                let params = this.formValues;
                tenderApi.confirmTenderParticipant(this.tender.id, participantId, params).then(res => {
                    this.loadingConfirm = false;
                    console.log(res);
                    this.$emit('getTenderData');
                }).catch(err => {
                    this.loadingConfirm = false;
                    this.$store.dispatch('showError', err);
                    console.error(err);
                });
            },
            denyPartipation(participantId) {
                this.loadingDeny = true;
                let params = this.formValues;
                tenderApi.denyTenderParticipant(this.tender.id, participantId, params).then(res => {
                    this.loadingDeny = false;
                    console.log(res);
                    this.$emit('getTenderData');
                }).catch(err => {
                    this.loadingDeny = false;
                    this.$store.dispatch('showError', err);
                    console.error(err);
                });
            }
        },
    };
</script>
