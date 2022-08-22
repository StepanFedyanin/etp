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
                class="invite__item"
            >
                <div 
                    class="invite__title"
                    @click="onClickContragent(invite.organization.id)"
                >
                    {{ invite.organization.name }}
                </div>
                
                <div 
                    :class="invite.status"
                    class="invite__status "
                >
                    {{ invite.status_detail }}
                </div>
                <template
                    v-if="invite.status === 'sent' || invite.status ==='accepted'"
                >
                    <button 
                        class="button button-outline-red "
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
            form-class="$reset inviteTender__form form"
            submit-label="Отправить приглашение"
            :disabled="loading"
            :loading="loading ? true : undefined"
            :submit-attrs="{
                inputClass: '$reset button button-green',
                wrapperClass: '$reset form__submit',
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
    import { user as userApi } from "@/services"
    import { tender as tenderApi} from "@/services"

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
                formValues: this.formData,
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
                                console.log(orgs);
                                return orgs.results.map((org) => {
                                    return {
                                        label: org.inn,
                                        kpp: org.kpp,
                                        name: org.name,
                                        city: org.city,
                                        legal_address: org.legal_address,
                                        value: org.id,
                                        color_status: org.color_status,
                                    }
                                })
                            }).catch(err => {
                                console.error(err);
                            })
                        },
                        noOptionsText: '',
                        placeholder: "Введите ИНН",
                        //innerClass: 'modal-form__input',
                        //labelClass: '$reset modal-form__label',
                        //outerClass: '$reset modal-form__field m--inn',
                        organization: {},
                    }

                ]
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
                    this.$formkit.reset('form-search');
                    this.getInvitation();
                }).catch(err => {
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