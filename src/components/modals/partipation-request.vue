<template>
    <q-no-ssr>
        <vue-final-modal 
            v-model="show"
            class="modal__container" 
            content-class="modal__block"
            content-transition="vfm-fade"
            overlay-transition="vfm-fade"
            :clickToClose="false"
            @click-outside="$emit('hideModal', updateData)"
        >
            <button 
                class="modal__close" 
                @click="$emit('hideModal', updateData)"
            >
                <span />
            </button>
            <span class="modal__title">Заявка участника</span>
            <div
                v-if="requestSended"
                class="modal__content"
            >
                Ваша заявка отправлена.
            </div>
            <div 
                v-else
                class="modal__content"
            >
                <FormKit
                    v-model="formValues"
                    name="form-request"
                    preserve
                    type="form"
                    data-loading="loading"
                    form-class="$reset partipation__form form"
                    :actions="false"
                    :disabled="loading"
                    :loading="loading ? true : undefined"
                    @submit="submitHandler"
                >
                    <div class="partipation m--no-padding m--no-background m--no-shadow m--modal">
                        <div class="modal__description text">
                            Загрузите необходимые документы, которые указаны в документации к тендеру. После проверки вы будете допущены до этапа “Торги” или потребуется исправить замечания и повторно отправить заявку на проверку.
                        </div>
                        <div 
                            v-if="tender.user_participation && tender.user_participation.status === 'rejected'"
                            class="partipation__status"
                        >
                            <div class="partipation__status-subtitle">
                                Решение организатора <span class="m--color-red">Заявка отклонена</span>
                            </div>
                            <div 
                                v-if="tender.user_participation.creator_comment"
                                class="partipation__status-comment"
                            >
                                {{ tender.user_participation.creator_comment }}
                            </div>
                        </div>
                        <div
                            class="partipation__docs"
                        >
                            <div class="partipation__docs-title">
                                Документация
                            </div>
                            <div class="partipation__docs-list">
                                <div 
                                    v-if="formValues.documents && formValues.documents.length"
                                    class="partipation__docs-item"
                                >
                                    <div class="partipation__docs-cell m--title">
                                        Файл
                                    </div>
                                    <div class="partipation__docs-cell m--title">
                                        Описание
                                    </div>
                                </div>
                                <div ref="documents">
                                    <FormKit
                                        id="draft_file"
                                        name="draft_file"
                                        type="file"
                                        outerClass="$reset field--type_hidden"
                                        @change="uploadFileComplete"
                                    />
                                    <div
                                        v-for="(file, idx) in formValues.documents"
                                        :key="idx"
                                        class="partipation__docs-item"
                                    >
                                        <FormKit
                                            v-if="!file.draft"
                                            :id="getFileId(file.id)"
                                            :name="getFileId(file.id)"
                                            type="file"
                                            outerClass="$reset field--type_hidden"
                                            @change="uploadFileComplete"
                                        />
                                        <div class="partipation__docs-cell m--file">
                                            <a
                                                :href="file.file"
                                            >
                                                {{ file.name || $helpers.getFilename(file.file) }}
                                            </a>
                                        </div>
                                        <div class="partipation__docs-cell">
                                            <FormKit
                                                type="text"
                                                placeholder="Ввести данные"
                                                :name="`description_${getFileId(file.id)}`"
                                                :value="file.description"
                                                outerClass="$reset"
                                            />
                                        </div>
                                        <!--div class="partipation__docs-cell m--edit">
                                            <div
                                                class="partipation__docs-edit"
                                                @click="onClickUploadFile(getFileId(file.id))"
                                            />
                                        </div-->
                                        <div class="partipation__docs-cell m--delete">
                                            <div
                                                class="partipation__docs-delete"
                                                @click="onClickRemoveFile(getFileId(file.id))"
                                            />
                                        </div>
                                    </div>                            
                                </div>
                            </div>
                        </div>
                        <div class="modal__actions">
                            <button
                                type="button"
                                class="button button-outline-green"
                                :disabled="showLoaderSending"
                                @click="onClickUploadFile(null)"
                            >
                                Загрузить файл
                            </button>
                        </div>
                        <!-- {{ formValues }} -->
                        <div class="partipation__form form">
                            <div class="partipation__form-title">
                                Комментарий
                            </div>
                            <div class="partipation__form-block form__block">
                                <FormKit
                                    v-model="formValues.comment"
                                    type="textarea"
                                    name="comment"
                                    label=""
                                    placeholder="Добавьте комментарий к заявке"
                                />
                            </div>
                        </div>
                    </div>
                    <div 
                        class="modal__actions form__submit partipation__form-submit" 
                        data-type="submit"
                    >
                        <button
                            type="submit"
                            :disabled="showLoaderSending"
                            class="button button-green"
                        >
                            Сохранить
                        </button>
                    </div>
                </FormKit>
            </div>
        </vue-final-modal>
    </q-no-ssr>
</template>

<script>
    import { tender as tenderApi } from "@/services"
    //import { urlPath } from '@/settings'
    export default {
        props: {
            showModal: {
                type: Boolean,
                default() { return false; }
            },
            tender: {
                type: Object,
                default() { return {}; }
            },
        },
        data() {
            return {
                formValues: {
                    documents: []
                },
                documents: [{
                    id: 1,
                    name: 'file.jpg',
                    description: 'Карточка предприятия'
                }],
                loading: false,
                showLoaderSending: false,
                requestSended: false,
                updateData: false,
            };
        },
        computed: {
            show() {
                return this.showModal;
            },
        },
        mounted() {
            console.log('MOUNTED');
            if (this.tender.user_participation) {
                this.formValues = {
                    comment: this.tender.user_participation.comment,
                    documents: this.tender.user_participation.documents || []//.map(item => { return item.id })
                }
                this.formValues.documents.forEach(doc => {
                    this.formValues[`description_file_${doc.id}`] = doc.description;
                });
            }
        },
        created() {
            console.log('CREATED');
        },
        methods: {
            onClickUploadFile(id) {
                let input
                if (id) { // for file edit
                    input = document.getElementById(id)
                } else {
                    input = document.getElementById('draft_file')
                }
                let click = new MouseEvent("click")
                input.dispatchEvent(click)
            },
            uploadFileComplete(event) {
                for (let file of event.target.files) {
                    file.id = event.target.id
                    let idx = this.formValues.documents.findIndex(f => this.getFileId(f.id) === file.id)

                    const formData = new FormData()
                    formData.append("file", file)
                    formData.append("description", this.formValues[`description_${file.id}`] || file.name)
                    formData.append("publication", true)

                    if (idx >= 0) {
                        this.documents[idx] = file
                        // this.defaultTender.documents = this.documents
                        alert('Обновление документов в разработке')
                        return
                    } else {
                        tenderApi.addTenderParticipantDocument(this.tender.id, formData)
                            .then(participant => {
                                this.formValues = {
                                    comment: participant.comment,
                                    documents: participant.documents || []//.map(item => { return item.id })
                                }
                                this.formValues.documents.forEach(doc => {
                                    this.formValues[`description_file_${doc.id}`] = doc.description;
                                });
                                this.updateData = true;
                                //this.formValues.documents.push(file)
                                // this.defaultTender.documents = this.documents
                                // console.log(file)
                            }).catch(err => {
                                console.error(err)
                            })
                    }
                }
            },
            onClickRemoveFile(id) {
                console.log(id, this.formValues.documents);
                let idx = this.formValues.documents.findIndex(f => this.getFileId(f.id) === id)
                if (idx >= 0) {
                    console.log(this.tender.id, this.formValues.documents[idx].id);
                    tenderApi.deleteTenderParticipantDocument(this.tender.id, { id: this.formValues.documents[idx].id })
                        .then(res => {
                            this.formValues.documents.splice(idx, 1)
                            console.log(res);
                            // this.defaultTender.documents = this.documents
                        }).catch(err => {
                            console.error(err)
                        })
                }
            },
            getFileId(id) {
                return `file_${String(id)}`
            },
            submitHandler(data, node) {
                this.showLoaderSending = true;
                this.loading = true;
                let documents = [];
                this.formValues.documents.forEach(doc => {
                    documents.push({
                        id: doc.id,
                        description: this.formValues[`description_file_${doc.id}`]
                    });
                });
                let params = {
                    id: this.formValues.id,
                    documents: documents,
                    comment: this.formValues.comment,
                };
                if (this.tender.user_participation) {
                    tenderApi.updateTenderParticipant(this.tender.id, params).then(res => {
                        this.showLoaderSending = false;
                        this.loading = false;
                        this.requestSended = true;
                        this.updateData = true;
                        console.log(res);
                    }).catch(err => {
                        node.setErrors(
                            [err.detail],
                        );
                        this.showLoaderSending = false;
                        this.loading = false;
                        this.$store.dispatch('showError', err);
                        console.error(err);
                    });
                } else {
                    tenderApi.addTenderParticipant(this.tender.id, params).then(res => {
                        this.showLoaderSending = false;
                        this.loading = false;
                        this.requestSended = true;
                        this.updateData = true;
                        console.log(res);
                    }).catch(err => {
                        node.setErrors(
                            [err.detail],
                        );
                        this.showLoaderSending = false;
                        this.loading = false;
                        this.$store.dispatch('showError', err);
                        console.error(err);
                    });
                }
            },

        }
    };
//addTenderParticipant
</script>
