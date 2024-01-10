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
                    v-if="person.is_master"
                    class="m--mb-3"
                >
                    <strong>{{ person.full_name }}</strong> лишится прав администратора <strong>{{ organization.name }}</strong>.
                </p>
                <p 
                    v-else
                    class="m--mb-3"
                >
                    <strong>{{ person.full_name }}</strong> станет администратором <strong>{{ organization.name }}</strong> и получит все права на управление организацией.
                </p>
                <FormKit
                    v-model="formValues"
                    name="form-master"
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
                formValues: {},
                showLoaderSending: false,
                updateData: false,
            };
        },
        computed: {
            show() {
                return this.showModal;
            },
            user() {
                return this.$store.state.user;
            },
        },
        methods: {
            submitHandler(data, node) {
                this.showLoaderSending = true;
                let params = {
                    id: this.person.id,
                    is_master: !this.person.is_master,
                    is_access_tender: !this.person.is_master,
                    is_access_product: !this.person.is_master,
                    is_access_organization: !this.person.is_master,
                };
                cabinet.updateMyOrganizationMemberPartial(params).then(res => {
                    if (this.user.id === this.person.id) {
                        cabinet.getMyProfile().then(res => {
                            this.showLoaderSending = false;
                            this.$store.dispatch('setUser', res);
                        }).catch(err => {
                            this.showLoaderSending = false;
                            this.$store.dispatch('showError', err);
                            console.error(err);
                        });
                    } else {
                        this.showLoaderSending = false;
                    }
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
