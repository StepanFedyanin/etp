<template>
    <div class="invites">
        <div class="invites__title">
            Приглашения
        </div>
        <!-- <pre>{{invites}}</pre> -->
        <div 
            v-if="invites.length"
            class="invites__list"
        >
            <div 
                v-for="invite in invites"
                :key="`invite-${invite.id}`"
                class="invite__item"
            >
                <div class="invite__item-info">
                    <div 
                        class="invite__item-title"
                        @click="onClickContragent(invite.organization.id)"
                    >
                        {{ invite.organization.name }}
                    </div>
                    
                    <div 
                        :class="invite.status"
                        class="invite__item-status"
                    >
                        {{ invite.status_detail }}
                    </div>
                </div>
                <template
                    v-if="invite.status === 'sent' || invite.status ==='accepted'"
                >
                    <button 
                        class="button button-red"
                        @click="cancelInvitation(invite.id)"
                    >
                        Отменить
                    </button>
                </template>
                <template
                    v-else-if="invite.status === 'rejected'"
                >
                    <!-- {{invite.organization.id}} -->
                    <button 
                        class="button button-green"
                        @click="repeatInvitation(invite.organization.id)"
                    >
                        Повторить
                    </button>
                </template>
            </div>
        </div>
        <FormKit
            id="form-search"
            v-model="formValues"
            name="form-search"
            preserve
            type="form"
            data-loading="loading"
            form-class="$reset invites__form form"
            submit-label="Отправить"
            :disabled="showLoaderSending"
            :loading="showLoaderSending ? true : undefined"
            :submit-attrs="{
                inputClass: '$reset button button-green invites__form-button',
                wrapperClass: '$reset form__submit invites__form-submit',
                outerClass: '$reset',
            }"
            @submit="submitHandler"
        >
            <div class="form__block">
                <FormKitSchema 
                    :schema="schema" 
                />
            </div>
        </FormKit>
    </div>
</template>
<script>
    import { user as userApi, tender as tenderApi } from "@/services"

    export default {
        components: {
            //Search,
        },
        props: {
            tender: {
                type: Object,
                default() { return {}; }
            },
        },
        data() {
            return {
                user: this.$store.state.user,
                formValues: {},
                invites: {} ,
                // invite: {},
                schema: [
                    {   $formkit: 'multiselect',
                        name: 'organization',
                        searchable: true,
                        inn: true,
                        minChars: 3,
                        options: async () => {
                            return await userApi.getOrganizations({limit: 1000}).then(orgs => {
                                let items = orgs.results.filter((org) => {
                                    if (this.user.organization.id === org.id) {
                                        return false;
                                    }
                                    return true;
                                })
                                return items.map((org) => {
                                    return {
                                        label: `${org.inn}, ${org.name}`,
                                        inn: org.inn,
                                        kpp: org.kpp,
                                        name: org.name,
                                        // city: org.city,
                                        legal_address: org.legal_address,
                                        value: org.id,
                                        color_status: org.color_status,
                                    }
                                });
                            }).catch(err => {
                                console.error(err);
                            })
                        },
                        noOptionsText: '',
                        placeholder: "Введите ИНН",
                        //innerClass: 'modal-form__input',
                        //labelClass: '$reset modal-form__label',
                        //outerClass: '$reset modal-form__field m--inn',
                        outerClass: 'inviteTender__multiselect',
                        organization: {},
                    }
                ],
                showLoaderSending: false
            }

        },
        computed: {
            tenderId() {
                return this.tender.id;
            },
            // organizationId() {
            //     return this.organization.id;
            // }
        },
        created(){
            this.getInvitation();
        },
        methods: {
            submitHandler(data, node) {
                console.log(data);
                console.log(this.tender.id);
                this.showLoaderSending = true;
                tenderApi.sendInvitationInTender(this.tenderId, data).then(res => {
                    console.log(res);
                    this.invite = res;
                    console.log(this.invite);
                    this.showLoaderSending = false;
                    this.getInvitation();
                    this.formValues = {};
                    this.$formkit.reset('form-search');
                }).catch(err => {
                    this.formValues = {};
                    this.$formkit.reset('form-search');
                    node.setErrors(
                        [err.detail],
                    );
                    this.showLoaderSending = false;
                    this.$store.dispatch('showError', err);
                    console.error(err);
                });
            },
            getInvitation() {
                tenderApi.getInvitationInTender(this.tenderId).then(res => {
                    console.log(res);
                    this.invites = res;
                }).catch(err => {
                    this.showLoaderSending = false;
                    this.$store.dispatch('showError', err);
                    console.error(err);
                });
            },
            cancelInvitation(invitesId) {
                tenderApi.cancelInvitation(this.tenderId, invitesId).then(res => {
                    console.log(res);
                    this.invites = res;
                    this.getInvitation();
                }).catch(err => {
                    this.showLoaderSending = false;
                    this.$store.dispatch('showError', err);
                    console.error(err);
                });
            },
            repeatInvitation(organizationId) {
                this.organization = { organization: organizationId}
                tenderApi.sendInvitationInTender(this.tenderId, this.organization).then(res => {
                    console.log(res);
                    this.organizations = res;
                    console.log(this.organizations);
                    this.showLoaderSending = false;
                    this.getInvitation();
                }).catch(err => {
                    this.showLoaderSending = false;
                    this.$store.dispatch('showError', err);
                    console.error(err);
                });
            },
            onClickContragent(id) {
                this.$router.push({ name: 'contragent', params: { id: id } });
            },
        }
    }
</script>