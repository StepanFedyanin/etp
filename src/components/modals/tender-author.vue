<template>
    <q-no-ssr>
        <vue-final-modal 
            v-model="show"
            class="modal__container" 
            content-class="modal__block m--small"
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
            <span class="modal__title">Ответственное лицо</span>
            <div class="modal__content">
                <div
                    v-if="authorSended"
                    class="form m--width-100"
                >
                    <div class="form__block m--flex">
                        <div class="form__block-title m--center m--with-icon">
                            <span class="m--ok">Данные тендера успешно изменены!</span>
                        </div>
                    </div>
                    <div 
                        class="form__submit" 
                        data-type="submit"
                    >
                        <button
                            type="submit"
                            :disabled="showLoaderSending"
                            class="button button-green"
                            @click="$emit('hideModal', updateData)"
                        >
                            Закрыть
                        </button>
                    </div>
                </div>
                <FormKit
                    v-else
                    v-model="formData"
                    name="form-tender"
                    preserve
                    type="form"
                    data-loading="loading"
                    form-class="$reset form m--width-100"
                    :actions="false"
                    :disabled="showLoaderSending"
                    :loading="showLoaderSending ? true : undefined"
                    @submit="submitHandler"
                >
                    <FormKitSchema 
                        :schema="authorSchema" 
                    />
                    <div class="form__block">
                        <div class="form__block-content text content">
                            <p>Ответственным лицом может стать только сотрудник вашей организации с правами на тендеры. Он продолжит управлять тендером.</p>
                            <p>Вы можете изменить ответственное лицо в любой момент.</p>
                        </div>
                    </div>
                    <div 
                        class="form__submit" 
                        data-type="submit"
                    >
                        <button
                            type="submit"
                            :disabled="showLoaderSending"
                            class="button button-green"
                            @click="submitForm"
                        >
                            Назначить
                        </button>
                    </div>
                </FormKit>
            </div>
        </vue-final-modal>
    </q-no-ssr>
</template>

<script>
    import { cabinet as cabinetApi, tender as tenderApi } from "@/services"
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
                formData: {
                    id: this.tender.id,
                    supervisor: this.tender.contact_person.id,
                },
                authorSchema: [
                    {
                        $formkit: 'multiselect',
                        //mode: 'single',
                        name: 'supervisor',
                        label: 'Сотрудник',
                        person: true,
                        searchable: true,
                        minChars: 1,
                        canClear: false,
                        placeholder: 'Выберите нового сотрудника',
                        validation: 'required',
                        options: async () => {
                            return await cabinetApi.getMyOrganizationMembers().then(res => {
                                console.log(res);
                                let members = res.map(item => {
                                    return { 
                                        label: item.full_name, 
                                        value: item.id,
                                        access: item.is_access_tender, 
                                        disabled: !item.is_access_tender 
                                    };
                                });
                                return members.sort((a, b) => a.disabled - b.disabled);
                            }).catch(err => {
                                console.error(err);
                                return [];
                            });
                        },
                        //labelClass: 'offers__item-title',
                    }
                ],
                showLoaderSending: false,
                authorSended: false,
                updateData: false,
            };
        },
        computed: {
            show() {
                return this.showModal;
            },
        },
        methods: {
            submitHandler() {
                this.showLoaderSending = true;
                this.updateData = true;
                let params = this.formData;
                tenderApi.updateTenderAuthor(params).then(res => {
                    this.showLoaderSending = false;
                    this.authorSended = true;
                    this.updateData = true;
                    console.log(res);
                }).catch(err => {
                    this.showLoaderSending = false;
                    this.$store.dispatch('showError', err);
                    console.error(err);
                });
            }
        }
    };
</script>
