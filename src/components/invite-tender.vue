<template>
    <div class="invites">
        <div class="h2">
            Приглашения
        </div>
        <div 
            v-for="invite in invites"
            class="invites__list"
        >
            <div class="invite__item">
                <div class="invite__title">
                    {{ invite.organization.name }}
                    <!-- <svg>d</svg> -->
                </div>
                
                <div 
                    :class="invite.status"
                    class="invite__status "
                >
                    {{ invite.status_detail }}
                </div>
                <template
                    v-if="invite.status === 'sent'"
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
                        @click="repeatlInvitation(invite.organization.id)"
                    >
                        Повторить
                    </button>
                </template>
            </div>
        </div>
        <FormKit
            v-model="formValues"
            name="form-search"
            preserve
            type="form"
            data-loading="loading"
            form-class="$reset inviteTender__form form"
            submit-label="Пригласить участника"
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
                            return await userApi.getOrganizations().then(orgs => {
                                console.log(orgs);
                                return orgs.results.map((org) => {
                                    return {
                                        label: org.inn,
                                        kpp: org.kpp,
                                        name: org.name,
                                        city: org.city,
                                        principal_activity: org.principal_activity,
                                        value: org.id,
                                    }
                                })
                            }).catch(err => {
                                console.error(err);
                            })
                        },
                        noOptionsText: '',
                        placeholder: "Введите ИНН",
                        innerClass: 'modal-form__input',
                        labelClass: '$reset modal-form__label',
                        outerClass: '$reset modal-form__field m--inn',
                        organization: {},
                    }

                ]
            }

        },
        computed:{
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
                    this.organizations = res;
                    console.log(this.organizations);
                    this.showLoaderSending = false;
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
                }).catch(err => {
                    this.showLoaderSending = false;
                    this.$store.dispatch('showError', err);
                    console.error(err);
                });
            },
            repeatlInvitation(organizationId) {
                this.organization = { organization: organizationId}
                tenderApi.sendInvitationInTender(this.tenderId, this.organization).then(res => {
                    console.log(res);
                    this.organizations = res;
                    console.log(this.organizations);
                    this.showLoaderSending = false;
                    this.invite.status = "sent";
                }).catch(err => {
                    this.showLoaderSending = false;
                    this.$store.dispatch('showError', err);
                    console.error(err);
                });
            }
        }
    }
</script>