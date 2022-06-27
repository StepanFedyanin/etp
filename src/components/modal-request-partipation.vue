<template>
    <vue-final-modal 
        v-model="show"
        classes="modal__container" 
        content-class="modal__block"
    >
        <button 
            class="modal__close" 
            @click="$emit('hideModal')"
        >
            <span />
        </button>
        <span class="modal__title">Заявка участника</span>
        <div class="modal__content">
            <div class="partipation m--no-padding m--no-background m--no-shadow m--modal">
                <div class="modal__description text">
                    Загрузите необходимые документы, которые указаны в документации к тендеру. После проверки вы будете допущены до этапа “Торги” или потребуется исправить замечания и повторно отправить заявку на проверку.
                </div>
                <div
                    class="partipation__docs"
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
                            <FormKit
                                id="draft_file"
                                name="draft_file"
                                type="file"
                                outerClass="$reset field--type_hidden"
                                @change="uploadFileComplete"
                            />
                            <div
                                v-for="(file, idx) in documents"
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
                                        :href="urlPath + file.file"
                                    >
                                        {{ file.name || $helpers.getFilename(file.file) }}
                                    </a>
                                </div>
                                <div class="partipation__docs-cell">
                                    <FormKit
                                        class="input"
                                        type="text"
                                        placeholder="Ввести данные"
                                        :name="`description_${getFileId(file.id)}`"
                                        :value="file.description"
                                        outerClass="$reset"
                                    />
                                </div>
                                <div class="partipation__docs-cell m--edit">
                                    <div
                                        class="partipation__docs-edit"
                                        @click="onClickUploadFile(getFileId(file.id))"
                                    />
                                </div>
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

                <div class="partipation__form form">
                    <div class="partipation__form-title">
                        Комментарий
                    </div>
                    <div class="partipation__form-block form__block">
                        <FormKit
                            v-model="partipationData.comment"
                            type="textarea"
                            name="comment"
                            label=""
                            placeholder="Добавьте комментарий к заявке"
                        />
                    </div>
                </div>
            </div>
            <div class="modal__actions">
                <button
                    type="reset"
                    :disabled="showLoaderSending"
                    class="button button-red"
                    @click="$emit('hideModal')"
                >
                    Отменить
                </button>
                <button
                    type="submit"
                    :disabled="showLoaderSending"
                    class="button button-green"
                    @click="submitForm"
                >
                    Сохранить
                </button>
            </div>
        </div>
    </vue-final-modal>
</template>

<script>
    import { tender as tenderApi } from "@/services"
    import { urlPath } from '@/settings'
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
                partipationData: {
                },
                documents: [{
                    id: 1,
                    name: 'file.jpg',
                    description: 'Карточка предприятия'
                }]
            };
        },
        computed: {
            show() {
                return this.showModal;
            },
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
                    let idx = this.documents.findIndex(f => this.getFileId(f.id) === file.id)

                    const formData = new FormData()
                    formData.append("file", file)
                    formData.append("description", this.partipationData[`description_${file.id}`] || file.name)
                    formData.append("publication", true)

                    if (idx >= 0) {
                        this.documents[idx] = file
                        // this.defaultTender.documents = this.documents
                        alert('Обновление документов в разработке')
                        return
                    } else {
                        tenderApi.addTenderDocument(this.defaultTender.id, formData)
                            .then(file => {
                                this.documents.push(file)
                                // this.defaultTender.documents = this.documents
                                // console.log(file)
                            }).catch(err => {
                                console.error(err)
                            })
                    }
                }
            },
            onClickRemoveFile(id) {
                let idx = this.documents.findIndex(f => this.getFileId(f.id) === id)
                if (idx >= 0) {
                    tenderApi.deleteTenderDocument(this.defaultTender.id, this.documents[idx].id)
                        .then(res => {
                            this.documents.splice(idx, 1)
                            // this.defaultTender.documents = this.documents
                        }).catch(err => {
                            console.error(err)
                        })
                }
            },
            getFileId(id) {
                return `file_${String(id)}`
            },
        }
    };
</script>
