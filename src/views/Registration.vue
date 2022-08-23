<template>
    <div class="app__main">
        <div class="registration">
            <div class="container">
                <div
                    v-if="stepRegistration === 1"
                >
                    <div class="registration__title h2">
                        Укажите инн вашей организации
                    </div>
                    <div
                        class="registration__form form registration__step1"
                    >
                        <regSearchForm 
                            :loading="showLoaderSending"
                            :formData="regData.search"
                            @submitSearchHandler="submitSearchHandler"
                            @clearSearchResult="clearSearchResult"
                        />
                    </div>
                    <div 
                        class="registration__item-wrapper"
                        :class="[colorStatusRed ? 'withAlert' : '']"
                    >
                        <div 
                            v-if="organizations.length != 0"
                            class="registration__organizations"
                        >  
                            <template 
                                v-for="organization in organizations"
                            >
                                <regOrganizationItem
                                    v-if="!organization.error"
                                    :key="organization.inn"
                                    :organization="organization"
                                    @registerCompany="registerCompany"
                                />
                                <div 
                                    v-if="organization.error"
                                    class="organization__error"
                                > 
                                    <p>{{ organization.error.detail }}</p>
                                </div>
                            </template>
                        </div>
                        <div
                            v-if="colorStatusRed"
                            class="registration__alert alert"
                        >
                            <p class="alert__title">
                                организация не может быть зарегистрирована
                            </p>
                            <p class="alert__text">
                                К сожалению, организация с указанным ИНН имеет «красный» рейтинг в системе Контур.Светофор и не может быть зарегистрирована на платформе. 
                            </p>
                            <p class="alert__text">
                                Организации с «красным» рейтингом Светофора не допускаются на платформу TUGAN.
                            </p>
                        </div>
                    </div>
                </div>
                <div
                    v-if="stepRegistration === 2"
                >
                    <div class="registration__title h2">
                        Сведения об организации
                    </div>
                    <div
                        class="registration__form form"
                    >
                        <regOrganizationForm 
                            :loading="showLoaderSending"
                            :formData="organization"
                            :disabled="regFormReadOnly"
                            @prevStep="prevStep"
                            @submitOrganizationHandler="submitOrganizationHandler"
                        />
                    </div>
                </div>
                <div
                    v-if="stepRegistration === 3"
                >
                    <div class="registration__title h2">
                        Сведения о пользователе
                    </div>
                    <div
                        class="registration__form form"
                    >
                        <regPersonForm 
                            :loading="showLoaderSending"
                            :formData="regData.person"
                            @prevStep="prevStep"
                            @submitPersonHandler="submitPersonHandler"
                        />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { user as api } from "@/services";
    import regSearchForm from '@/components/forms/reg-search-form';
    import regOrganizationForm from '@/components/forms/reg-organization-form';
    import regPersonForm from '@/components/forms/reg-person-form';
    import regOrganizationItem from '@/components/reg-organization-item';
    

    export default {
        components: {
            regSearchForm,
            regOrganizationForm,
            regPersonForm,
            regOrganizationItem,
            //inviteAddForm
        },
        props: {
        },        
        data() {
            return {
                regData: this.$store.state.regData || { search: {}, organization: {}, person: {} },
                showLoaderSending: false,
                regFormReadOnly: false,
                regInviteForm: [
                    {
                        $formkit: 'text',
                        name: 'person',
                        label: 'ФИО',
                        placeholder: 'ФИО',
                        validation: 'required',
                        outerClass: 'field--inline field--required'
                    }, {
                        $formkit: 'text',
                        name: 'email',
                        label: 'Email',
                        placeholder: 'Email',
                        validation: 'required',
                        outerClass: 'field--inline field--required'
                    }
                ],
                stepRegistration: this.$store.state.stepRegistration || 1,
                inviteNumbers: 1,
                isValid: false,
                person: {},
                organizations: [],
                // colorStatus: false,
                colorStatusRed2: false,
                // organization: {},
            };
        },
        computed: {
            colorStatusRed: function() {
                return (this.organizations.filter((item) => {
                    return item.color_status === "red";
                })).length > 0
            }
        },
        created() {
        },
        mounted() {
            console.log(!this.regData.organization.created);
            if (this.stepRegistration === 2 && this.regData.organization.created === false) {
                this.regFormReadOnly = true;
            }
        },
        methods: {
            prevStep() {
                this.$store.dispatch('setStepRegistration', this.stepRegistration - 1);
                this.stepRegistration = this.$store.state.stepRegistration;
                if (this.stepRegistration === 1) {
                    this.regData.organization = {};
                    this.regData.person = {};
                } else if (this.stepRegistration === 2) {
                    this.regData.person = {};
                    if (!this.regData.organization.created) {
                        this.regFormReadOnly = true;
                    }
                }
                this.$store.dispatch('setRegData', this.regData);
            },
            next() {
                if (this.stepRegistration !== 3) {
                    this.$store.dispatch('setStepRegistration', this.stepRegistration + 1);
                    this.stepRegistration = this.$store.state.stepRegistration;
                    console.log(this.stepRegistration);
                } else {
                    this.$store.dispatch('setStepRegistration', null);
                    this.$store.dispatch('setRegData', null);
                    this.$router.push({ name: 'cabinet' });
                }
            },
            submitSearchHandler(data, node) {
                this.showLoaderSending = true;
                let params = Object.assign({}, this.regData.search);
                delete params.owner_type;
                api.searchOrganization(params).then(res => {
                    console.log(res);
                    this.organizations = res;
                    console.log(this.organizations);
                    this.showLoaderSending = false;
                    // res.forEach(function(item) {
                    //     if (item.inn) {
                    // this.regData.organization = Object.assign({}, res);
                    // this.regFormReadOnly = true;
                    // } else {
                    // this.regData.organization = Object.assign({}, params);
                    // this.regFormReadOnly = false;
                    // }
                    // });
                    this.$store.dispatch('setRegData', this.regData);
                }).catch(err => {
                    node.setErrors(
                        [err.detail],
                    );
                    this.showLoaderSending = false;
                    this.$store.dispatch('showError', err);
                    console.error(err);
                });
            },
            clearSearchResult() {
                this.organizations = [];
            },
            registerCompany(organization, node) {
                api.addOrganization(organization).then(res => {
                    console.log(res);
                    if(res.id){
                        this.organization = res;
                        this.next();
                        console.log(this.stepRegistration);
                        if (this.stepRegistration === 2 && !res.created) {
                            this.regFormReadOnly = true;
                            console.log(this.regFormReadOnly);
                        }
                    }
                }).catch(err => {
                    node.setErrors(
                        [err.detail],
                    );
                    this.showLoaderSending = false;
                    this.$store.dispatch('showError', err);
                    console.error(err);
                });
                // this.next();
            },
            // submitOrganizationHandler(data, node) {
            //     if (this.regFormReadOnly) {
            //         this.regData.person = {
            //             organization: this.regData.organization.id
            //         };
            //         this.$store.dispatch('setRegData', this.regData);
            //         this.next();
            //     } else {
            //         this.showLoaderSending = true;
            //         let params = Object.assign({}, this.regData.organization);
            //         api.addOrganization(params).then(res => {
            //             this.showLoaderSending = false;
            //             console.log(res);
            //             this.regData.organization = Object.assign({}, res);
            //             this.regData.person = {
            //                 organization: res.id
            //             };
            //             this.$store.dispatch('setRegData', this.regData);
            //             this.next();
            //         }).catch(err => {
            //             node.setErrors(
            //                 [err.detail],
            //             );
            //             this.showLoaderSending = false;
            //             this.$store.dispatch('showError', err);
            //             console.error(err);
            //         });
            //     }
            // },
            submitOrganizationHandler(data, node){
                api.applyOrganization(data).then(res => {
                    this.showLoaderSending = false;
                    console.log(res);
                    this.regData.organization = Object.assign({}, res);
                    this.regData.person = {
                        organization: res.id
                    };
                    this.$store.dispatch('setRegData', this.regData);
                    this.next();
                }).catch(err => {
                    node.setErrors(
                        [err.detail],
                    );
                    this.showLoaderSending = false;
                    this.$store.dispatch('showError', err);
                    console.error(err);
                });
            },
            submitPersonHandler(data, node) {
                this.showLoaderSending = true;
                this.$store.dispatch('setRegData', this.regData);
                let params = Object.assign({}, this.regData.person);
                api.addProfile(params).then(res => {
                    console.log(res);
                    if (res.access && res.refresh) {
                        this.$store.dispatch('setToken', res);
                        api.getMyProfile().then(res => {
                            this.showLoaderSending = false;
                            this.$store.dispatch('setUser', res);
                            this.next();
                        }).catch(err => {
                            this.showLoaderSending = false;
                            this.$store.dispatch('showError', err);
                            console.error(err);
                        });
                    } else {
                        this.showLoaderSending = false;
                        this.$store.dispatch('showError', 'Ошибка получения токена');
                    }
                }).catch(err => {
                    console.log(err)
                    node.setErrors(
                        [err.detail || ''],
                        {
                            email: '',
                            login: ''
                        }
                    );
                    this.showLoaderSending = false;
                    this.$store.dispatch('showError', err);
                    console.error(err);
                });
            },
        }
    };
</script>
