<template>
    <q-no-ssr>
        <vue-final-modal 
            v-model="show"
            class="modal__container" 
            content-class="modal__block m--small"
            content-transition="vfm-fade"
            overlay-transition="vfm-fade"
            :clickToClose="false"
            @click-outside="$emit('hideModal', false)"
        >
            <button 
                class="modal__close" 
                @click="$emit('hideModal', false)"
            >
                <span />
            </button>
            <span class="modal__title">Предупреждение</span>
            <div 
                class="modal__content text"
            >
                <p 
                    v-if="excludedSended"
                    class="m--mb-3"
                >
                    <strong>{{ person.full_name }}</strong> больше не состоит в организации <strong>{{ organization.name }}</strong>!
                </p>
                <p 
                    v-else
                    class="m--mb-3"
                >
                    <strong>{{ person.full_name }}</strong> покинет организацию <strong>{{ organization.name }}</strong> и потеряет все имеющиеся права.
                </p>
                <FormKit
                    v-model="formData"
                    name="form-exclude"
                    preserve
                    type="form"
                    data-loading="loading"
                    form-class="$reset form m--width-100"
                    :actions="false"
                    :disabled="showLoaderSending"
                    :loading="showLoaderSending ? true : undefined"
                    @submit="submitHandler"
                >
                    <div 
                        class="form__submit" 
                        data-type="submit"
                    >
                        <button
                            v-if="excludedSended"
                            :disabled="showLoaderSending"
                            class="button button-green button-center"
                        >
                            Закрыть окно
                        </button>
                        <button
                            v-else
                            type="submit"
                            :disabled="showLoaderSending"
                            class="button button-red button-center"
                        >
                            Подтвердить
                        </button>
                    </div>
                </FormKit>
            </div>
        </vue-final-modal>
    </q-no-ssr>
</template>

<script>
    import { cabinet } from "@/services"
    export default {
        props: {
            showModal: {
                type: Boolean,
                default() { return false; }
            },
            organization: {
                type: Object,
                default() { return {}; }
            },
            person: {
                type: Object,
                default() { return {}; }
            },
        },
        data() {
            return {
                formData: {},
                showLoaderSending: false,
                excludedSended: false,
                updateData: false,
            };
        },
        computed: {
            show() {
                return this.showModal;
            },
        },
        methods: {
            submitHandler(data, node) {
                this.showLoaderSending = true;
                cabinet.excludeMyOrganizationMember(this.person.id).then(res => {
                    this.showLoaderSending = false;
                    this.$emit('hideModal', true);
                }).catch(err => {
                    console.error(err);
                    node.setErrors(
                        err.response.data
                    );
                    this.showLoaderSending = false;
                });
            }
        }
    };
</script>
