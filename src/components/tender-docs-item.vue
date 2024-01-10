<template>
    <div 
        v-if="file.publication"
        class="docs__item"
    >
        <div class="docs__item-top">
            <a
                :href="urlPath + file.file"
                class="docs__item-link"
                target="_blank"
            >
                {{ file.name || $helpers.getFilename(file.file) }}
            </a>
            <q-no-ssr>
                <div 
                    v-if="editMode"
                    class="docs__item-actions"
                >
                    <a
                        v-if="!changeDescription"
                        href="#"
                        class="docs__item-link"
                        @click.prevent="editDocument"
                    >
                        Изменить описание
                    </a>
                    <a
                        v-else
                        href="#"
                        class="docs__item-link"
                        @click.prevent="updateDocument"
                    >
                        Сохранить описание
                    </a>
                    <a
                        href="#"
                        class="docs__item-link m--color-red"
                        @click.prevent="onClickRemoveFile"
                    >
                        Удалить
                    </a>
                </div>
            </q-no-ssr>
        </div>
        <div class="docs__item-description">
            <FormKit
                v-if="changeDescription"
                v-model="formData.description"
                class="input"
                type="text"
                placeholder="Ввести данные"
                outerClass="$reset"
            />
            <div v-else>
                {{ formData.description }}
            </div>
        </div>
    </div>
</template>

<script>
    import { tender as tenderApi } from "@/services"
    import { urlPath } from '@/settings'
    export default {
        components: {
        },
        emits: ['getTenderDocuments'],
        props: {
            tender: {
                type: Object,
                default() { return {}; }
            },
            file: {
                type: Object,
                default() { return {}; }
            },
            editMode: {
                type: Boolean,
                default() { return false; }
            },
        },
        data() {
            return {
                urlPath,
                formData: {
                    description: this.file.description
                },
                changeDescription: false,
            }
        },
        computed: {
            user() {
                return this.$store.state.user || {};
            }
        },
        mounted() {
            //console.log('MOUNTED', this.lot);
        },
        created() {
        },
        methods: {
            editDocument() {
                this.changeDescription = true;
            },
            updateDocument() {
                const formData = new FormData()
                formData.append("description", this.formData.description)
                tenderApi.updateTenderDocument(this.tender.id, this.file.id, formData).then(res => {
                    this.changeDescription = false;
                    this.formData.description = res.description;
                }).catch(err => {
                    console.error(err)
                })
            },
            onClickRemoveFile() {
                tenderApi.deleteTenderDocument(this.tender.id, this.file.id).then(res => {
                    //this.documents.splice(idx, 1)
                    console.log(res);
                    this.$emit('getTenderDocuments');
                }).catch(err => {
                    console.error(err)
                })
            },
        },
    };
</script>
