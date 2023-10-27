<template>
    <div class="app__main">
        <div 
            class="cabinet organization"
        >
            <div class="container">
                <app-breadcrumbs 
                    :breadcrumbs="[
                        { name: 'Главная', route: { name: 'home' } },
                        { name: 'Кабинет', route: { name: 'cabinet' } },
                    ]"
                />
                <div class="h1">
                    Регистрация организации
                </div>
                <template v-if="stepRegistration === 1">
                    <div class="registration__step m--step-1">
                        <div class="registration__step-alert text">
                            <p>Юридические лица из Российской Федерации проходят проверку в системе Контур.Светофор.</p>
                            <p>Если организация имеет <span class="m--color-red">красный</span> рейтинг, мы не сможем ее зарегистрировать.</p>
                        </div>
                        <regOrganizationSearch 
                            :loading="showLoaderSending"
                            @submitHandler="submitSearchHandler"
                            @clearSearchResult="clearSearchResult"
                        />
                    </div>
                    <div class="organization__form">
                        <template v-if="organizations.length">
                            <template v-if="organizationsEnabled.length">
                                <div class="h2">Можно зарегистрировать:</div> 
                                <div class="organization__items"> 
                                    <template 
                                        v-for="(item, index) in organizationsEnabled"
                                    >
                                        <regOrganizationItem
                                            v-if="!item.error"
                                            :key="`org-${item.inn}-${index}`"
                                            :organization="item"
                                            @registerCompany="registerCompany"
                                        />
                                        <div 
                                            v-if="item.error"
                                            :key="`org-error-${item.inn}-${index}`"
                                            class="organization__error"
                                        > 
                                            <p>{{ item.error.detail }}</p>
                                        </div>
                                    </template>
                                </div>
                            </template>
                            <template v-if="organizationsDisabled.length">
                                <div class="h2">Проверка не пройдена:</div> 
                                <div class="organization__items"> 
                                    <template 
                                        v-for="(item, index) in organizationsDisabled"
                                    >
                                        <regOrganizationItem
                                            v-if="!item.error"
                                            :key="`org-${item.inn}-${index}`"
                                            :organization="item"
                                            @registerCompany="registerCompany"
                                        />
                                        <div 
                                            v-if="item.error"
                                            :key="`org-error-${item.inn}-${index}`"
                                            class="organization__error"
                                        > 
                                            <p>{{ item.error.detail }}</p>
                                        </div>
                                    </template>
                                </div>
                            </template>
                        </template>
                        <template v-else-if="searchSended">
                            <div class="organization__error"> 
                                <p>По Вашему запросу ничего не найдено.</p>
                            </div>
                        </template>
                        <div
                            v-if="organizations.length === 1 && organizationsDisabled.length"
                            class="organization__alert"
                        >
                            <div class="organization__alert-title">Организация не может быть зарегистрирована</div>
                            <div class="text">
                                <p>К сожалению, организация с указанным ИНН имеет «красный» рейтинг в системе Контур.Светофор и не может быть зарегистрирована на платформе.</p>
                                <p>Организации с «красным» рейтингом Светофора не допускаются на платформу TUGAN.</p>
                            </div>
                        </div>
                    </div>
                </template>
                <template v-if="stepRegistration === 2 && organization">
                    <div class="registration__step m--step-2">
                        <template v-if="organization.created">
                            <div class="registration__step-alert text">
                                <p>Организация <b>{{ organization.name }}</b> зарегистрирована на платформе TUGAN!</p>
                                <p>Вы назначены <b>администратором</b> организации. Теперь вы можете:</p>
                                <ul class="m--dots">
                                    <li>проводить тендеры и участвовать в них,</li>
                                    <li>размещать на платформе товары и услуги,</li>
                                    <li>управлять карточкой организации,</li>
                                    <li>управлять правами сотрудников.</li>
                                </ul>
                                <p>Войдите в качестве сотрудника организации, чтобы пользоваться всеми возможностями платформы для юридических лиц.</p>
                                <p>Можно сделать это в любой момент, а также свободно переключаться между режимами частного лица и сотрудника организации.</p>
                            </div>
                        </template>
                        <template v-else>
                            <div class="registration__step-alert text">
                                <p>Вы присоединились к организации <b>{{ organization.name }}</b> на платформе TUGAN!</p>
                                <p>Владелец организации — <b>{{ organization.head_name }}</b>. Вы назначены <b>сотрудником</b> организации. Обратитесь к владельцу, чтобы:</p>
                                <ul class="m--dots">
                                    <li>проводить тендеры и участвовать в них,</li>
                                    <li>размещать на платформе товары и услуги,</li>
                                    <li>управлять карточкой организации.</li>
                                </ul>
                                <p>Войдите в качестве сотрудника организации, чтобы пользоваться всеми возможностями платформы для юридических лиц.</p>
                                <p>Можно сделать это в любой момент, а также свободно переключаться между режимами частного лица и сотрудника организации.</p>
                            </div>                            
                        </template>
                    </div>
                </template>
                <!--template v-if="stepRegistration === 2 && organization">
                    <div class="registration__step m--step-2">
                        <div class="h2">
                            Сведения об организации
                        </div>
                        <regOrganization
                            :loading="showLoaderSending"
                            :formData="organization"
                            :disabled="regFormReadOnly"
                            @prevStep="prevStep"
                            @submitHandler="submitOrganizationHandler"
                        />
                    </div>
                </template-->
                <!--div
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
                </div-->
            </div>
        </div>
    </div>
</template>

<script>
    import { user as api, cabinet } from "@/services";
    import regOrganizationSearch from '@/components/forms/reg-organization-search';
    //import regOrganization from '@/components/forms/reg-organization';
    //import regPersonForm from '@/components/forms/reg-person-form';
    import regOrganizationItem from '@/components/reg-organization-item';
    

    export default {
        components: {
            regOrganizationSearch,
            //regOrganization,
            //regPersonForm,
            regOrganizationItem,
            //inviteAddForm
        },
        props: {
        },        
        data() {
            return {
                searchSended: false,
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
                organization: null,
            };
        },
        computed: {
            organizationsEnabled() {
                return this.organizations.filter(item => { return item.color_status !== 'red' });
            },
            organizationsDisabled() {
                return this.organizations.filter(item => { return item.color_status === 'red' });
            },
            user() {
                return this.$store.state.user;
            },
        },
        created() {
        },
        mounted() {
            //console.log(!this.regData.organization.created);
            if (this.stepRegistration === 2) {
                if (this.regData.organization.created === false) {
                    this.regFormReadOnly = true;
                }
                if (!this.organization) {
                    this.prevStep();
                }
            }
            //if (this.$metrika) this.$metrika.reachGoal('reg_1');
        },
        methods: {
            getMyProfile() {
                this.showLoaderSending = true;
                cabinet.getMyProfile().then(res => {
                    console.log(res);
                    this.showLoaderSending = false;
                    this.$store.dispatch('setUser', res);
                    //if (this.$metrika) this.$metrika.reachGoal('reg_3');
                }).catch(err => {
                    this.showLoaderSending = false;
                    this.$store.dispatch('showError', err);
                    console.error(err);
                });
            },
            submitSearchHandler(data) {
                this.searchSended = false;
                this.showLoaderSending = true;
                let params = Object.assign({}, data);
                delete params.owner_type;
                cabinet.searchOrganizationKontur(params).then(res => {
                    console.log(res);
                    this.organizations = res;
                    console.log(this.organizations);
                    this.searchSended = true;
                    this.showLoaderSending = false;
                    this.$store.dispatch('setRegData', this.regData);
                }).catch(err => {
                    this.searchSended = true;
                    this.showLoaderSending = false;
                    this.$store.dispatch('showError', err);
                    console.error(err);
                });
            },
            clearSearchResult() {
                this.organizations = [];
            },
            registerCompany(organization) {
                this.showLoaderSending = true;
                organization.country = this.user.country;
                cabinet.addOrganizationKontur(organization).then(res => {
                    console.log(res);
                    if (res.id) {
                        this.organization = res;
                        this.nextStep();
                        this.getMyProfile();
                        console.log(this.stepRegistration);
                        /*
                        if (this.stepRegistration === 2 && !res.created) {
                            this.regFormReadOnly = true;
                            console.log(this.regFormReadOnly);
                        }
                        */
                        this.showLoaderSending = false;
                    }
                    //if (this.$metrika) this.$metrika.reachGoal('reg_1');
                }).catch(err => {
                    this.showLoaderSending = false;
                    this.$store.dispatch('showError', err);
                    console.error(err);
                });
                // this.nextStep();
            },
            submitOrganizationHandler(data, node){
                api.applyOrganization(data).then(res => {
                    this.showLoaderSending = false;
                    console.log(res);
                    this.regData.organization = Object.assign({}, res);
                    this.regData.person = {
                        organization: res.id
                    };
                    this.$store.dispatch('setRegData', this.regData);
                    if (this.$metrika) this.$metrika.reachGoal('reg_2');
                    this.nextStep();
                }).catch(err => {
                    node.setErrors(
                        [err.detail],
                    );
                    this.showLoaderSending = false;
                    this.$store.dispatch('showError', err);
                    console.error(err);
                });
            },
            /*
            submitPersonHandler(data, node) {
                this.showLoaderSending = true;
                this.$store.dispatch('setRegData', this.regData);
                let params = Object.assign({}, this.regData.person);
                api.addProfile(params).then(res => {
                    console.log(res);
                    if (res.access && res.refresh) {
                        this.$store.dispatch('setToken', res);
                        cabinet.getMyProfile().then(res => {
                            this.showLoaderSending = false;
                            this.$store.dispatch('setUser', res);
                            if (this.$metrika) this.$metrika.reachGoal('reg_3');
                            this.nextStep();
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
                        err.response.data
                    );
                    this.showLoaderSending = false;
                    console.error(err);
                });
            },
            */
            prevStep() {
                this.$store.dispatch('setStepRegistration', this.stepRegistration - 1);
                this.stepRegistration = this.$store.state.stepRegistration;
                if (this.stepRegistration === 1) {
                    this.regData.organization = {};
                    this.regData.person = {};
                } else if (this.stepRegistration === 2) {
                    this.regData.person = {};
                    this.organization = this.regData.organization;
                    if (!this.regData.organization.created) {
                        this.regFormReadOnly = true;
                    }
                }
                this.$store.dispatch('setRegData', this.regData);
            },
            nextStep() {
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
        }
    };
</script>
