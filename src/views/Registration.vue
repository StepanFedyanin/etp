<template>
    <div class="app__main">
        <div class="registration">
            <div class="container">
                <div
                    v-if="stepRegistration === 1"
                >
                    <div class="registration__title h2">
                        Укажите инн и кпп вашей организации
                    </div>
                    <div
                        class="registration__form form"
                    >
                        <regSearchForm 
                            :loading="showLoaderSending"
                            :formData="regData.search"
                            @submitSearchHandler="submitSearchHandler"
                        />
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
                        <div
                            v-if="regData.organization && regData.organization.id"
                            class="registration__organization"
                        >
                            <span>{{ regData.organization.name }}</span>, дата регистрации {{ $helpers.parseDate(regData.organization.date_registration, 'YYYY-MM-DD').toLocaleDateString('ru') }}
                        </div>
                        <regOrganizationForm 
                            :loading="showLoaderSending"
                            :formData="regData.organization"
                            :readonly="regFormReadOnly"
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
                <div
                    v-if="stepRegistration === 4"
                >
                    <div class="registration__title h2">
                        Пригласите ваших партнеров
                    </div>
                    <div class="registration__content text">
                        <p>Вы сможете найти себе проверенных поставщиков или поучаствовать в тендере ....<br> Укажите ФИО и email, площадка отправит приглашения на указанную почту.</p>
                    </div>
                    <FormKit
                        v-model="regData.invite"
                        name="form-invite"
                        preserve
                        type="form"
                        data-loading="showLoaderSending"
                        form-class="$reset registration__form form"
                        :actions="false"
                        :disabled="showLoaderSending"
                        :loading="showLoaderSending ? true : undefined"
                        @submit="submitPersonHandler"
                    >
                        <div
                            v-for="invite in inviteNumbers"
                            :key="invite"
                        >
                            <div 
                                class="registration__subtitle h3"
                            >
                                Приглашение №{{ invite }}
                            </div>
                            <div class="form__block">
                                <FormKitSchema :schema="regInviteForm" />
                            </div>
                            <div 
                                class="form__submit registration__form-submit" 
                                data-type="submit"
                            >
                                <button
                                    class="button button-green"
                                    @click="addInvite"
                                >
                                    Добавить приглашение
                                </button>
                                <button
                                    class="button button-green"
                                    @click="sendInvite"
                                >
                                    Отправить приглашение
                                </button>
                                <button
                                    class="button button-red"
                                    @click="next"
                                >
                                    Завершить регистрацию
                                </button>
                            </div> 
                        </div>
                    </FormKit>
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

    export default {
        components: {
            regSearchForm,
            regOrganizationForm,
            regPersonForm,
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
            };
        },
        computed: {
        },
        created() {
        },
        mounted() {
            if (this.stepRegistration === 2 && this.regData.organization.id) {
                this.regFormReadOnly = true;
            }
        },
        methods: {
            addInvite() {
                this.inviteNumbers++;
            },
            prevStep() {
                this.$store.dispatch('setStepRegistration', this.stepRegistration - 1);
                this.stepRegistration = this.$store.state.stepRegistration;
                if (this.stepRegistration === 1) {
                    this.regData.organization = {};
                    this.regData.person = {};
                } else if (this.stepRegistration === 2) {
                    this.regData.person = {};
                    if (this.regData.organization.id) {
                        this.regFormReadOnly = true;
                    }
                }
                this.$store.dispatch('setRegData', this.regData);
            },
            next() {
                if (this.stepRegistration !== 4) {
                    this.$store.dispatch('setStepRegistration', this.stepRegistration + 1);
                    this.stepRegistration = this.$store.state.stepRegistration;
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
                    this.showLoaderSending = false;
                    if (res.id) {
                        this.regData.organization = Object.assign({}, res);
                        this.regFormReadOnly = true;
                    } else {
                        this.regData.organization = Object.assign({}, params);
                        this.regFormReadOnly = false;
                    }
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
            submitOrganizationHandler(data, node) {
                if (this.regFormReadOnly) {
                    this.regData.person = {
                        organization: this.regData.organization.id
                    };
                    this.$store.dispatch('setRegData', this.regData);
                    this.next();
                } else {
                    this.showLoaderSending = true;
                    let params = Object.assign({}, this.regData.organization);
                    api.addOrganization(params).then(res => {
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
                }
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
