<template>
    <div class="app__main">
        <div class="registration">
            <div class="container">
                {{ regData }}
                <div
                    v-if="stepRegistration === 1"
                >
                    <div class="registration__title h2">
                        Укажите инн и кпп вашей организации
                    </div>
                    <FormKit
                        name="form-search"
                        v-model="regData.search"
                        preserve
                        type="form"
                        data-loading="showLoaderSending"
                        form-class="$reset registration__form form"
                        submit-label="Далее"
                        :disabled="showLoaderSending"
                        :loading="showLoaderSending ? true : undefined"
                        :submit-attrs="{
                            inputClass: '$reset button button-green',
                            wrapperClass: '$reset form__submit',
                            outerClass: '$reset',
                        }"
                        @submit="submitSearchHandler"
                    >
                        <div class="form__block">
                            <FormKitSchema :schema="regSearchForm" />
                        </div>
                    </FormKit>
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
                            v-if="regData.organization"
                            class="registration__organization"
                        >
                            {{ regData.organization.name }} {{ regData.organization.inn }}
                        </div>
                        <FormKit
                            name="form-organization"
                            v-model="regData.organization"
                            preserve
                            type="form"
                            data-loading="showLoaderSending"
                            form-class="$reset registration__form form"
                            :actions="false"
                            :disabled="showLoaderSending"
                            :loading="showLoaderSending ? true : undefined"
                            @submit="submitOrganizationHandler"
                        >
                            <div class="form__block">
                                <FormKitSchema :schema="regOrganizationForm" />
                            </div>
                            <div class="form__submit registration__form-submit" data-type="submit">
                                <button
                                    :disabled="showLoaderSending"
                                    class="button button-red"
                                    @click="prev"
                                >
                                    Назад
                                </button>
                                <button
                                    type="submit"
                                    :disabled="showLoaderSending"
                                    class="button button-green"
                                    @click="submitForm"
                                >
                                    Далее
                                </button>
                            </div> 
                        </FormKit>
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
                        <FormKit
                            name="form-person"
                            v-model="regData.person"
                            preserve
                            type="form"
                            data-loading="showLoaderSending"
                            form-class="$reset registration__form form"
                            :actions="false"
                            :disabled="showLoaderSending"
                            :loading="showLoaderSending ? true : undefined"
                            @submit="submitPersonHandler"
                        >
                            <div class="form__block">
                                <FormKitSchema :schema="regPersonForm" />
                            </div>
                            <div class="form__submit registration__form-submit" data-type="submit">
                                <button
                                    :disabled="showLoaderSending"
                                    class="button button-red"
                                    @click="prev"
                                >
                                    Назад
                                </button>
                                <button
                                    type="submit"
                                    :disabled="showLoaderSending"
                                    class="button button-green"
                                    @click="submitForm"
                                >
                                    Далее
                                </button>
                            </div> 
                        </FormKit>                  
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
                        name="form-invite"
                        v-model="regData.invite"
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
                            <div class="form__submit registration__form-submit" data-type="submit">
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
    //import organizationSearchForm from '@/components/registration/organization-search-form';
    //import organizationAddForm from '@/components/registration/organization-add-form';
    //import personAddForm from '@/components/registration/person-add-form';
    //import inviteAddForm from '@/components/registration/invite-add-form';
    //import modal from "@/components/modal";

    export default {
        components: {
            //modal,
            //organizationSearchForm,
            //organizationAddForm,
            //personAddForm,
            //inviteAddForm
        },
        props: {
        },        
        data() {
            return {
                regData: this.$store.state.regData || { search: {}, organization: {}, person: {} },
                showLoaderSending: false,
                regSearchForm: [
                    {
                        $formkit: 'text',
                        name: 'inn',
                        label: 'ИНН',
                        placeholder: 'Ваш ИНН',
                        validation: 'required',
                        outerClass: 'field--inline field--required'
                    }, {
                        $formkit: 'text',
                        name: 'kpp',
                        label: 'КПП',
                        placeholder: 'Ваш КПП',
                        validation: 'required',
                        outerClass: 'field--inline field--required'
                    }
                ],
                regOrganizationForm: [
                    {
                        $formkit: 'text',
                        name: 'inn',
                        //readonly: true,
                        label: 'ИНН',
                        placeholder: 'Ваш ИНН',
                        validation: 'required',
                        outerClass: 'field--inline field--required'
                    }, {
                        $formkit: 'text',
                        name: 'kpp',
                        //readonly: true,
                        label: 'КПП',
                        placeholder: 'Ваш КПП',
                        validation: 'required',
                        outerClass: 'field--inline field--required'
                    }, {
                        $formkit: 'text',
                        name: 'ogrn',
                        label: 'ОГРН',
                        placeholder: 'ОГРН организации',
                        validation: 'required',
                        outerClass: 'field--inline field--required'
                    }, {
                        $formkit: 'text',
                        name: 'name',
                        label: 'Название организации',
                        validation: 'required',
                        outerClass: 'field--inline field--required'
                    }, {
                        $formkit: 'text',
                        name: 'full_name',
                        label: 'Полное название организации',
                        validation: 'required',
                        outerClass: 'field--inline field--required'
                    }, {
                        $formkit: 'date',
                        name: 'date_registration',
                        label: 'Дата регистрации организации',
                        validation: 'required',
                        outerClass: 'field--inline field--required'
                    }, {
                        $formkit: 'text',
                        name: 'head_name',
                        label: 'ФИО руководителя организации',
                        validation: 'required',
                        outerClass: 'field--inline field--required'
                    }, {
                        $formkit: 'text',
                        name: 'head_post',
                        label: 'Должность руководителя организации',
                        validation: 'required',
                        outerClass: 'field--inline field--required'
                    }, {
                        $formkit: 'text',
                        name: 'accountant_name',
                        label: 'ФИО бухгалтера организации',
                        outerClass: 'field--inline'
                    }, {
                        $formkit: 'text',
                        name: 'legal_address',
                        label: 'Юридический адрес организации',
                        validation: 'required',
                        outerClass: 'field--inline field--required'
                    }, {
                        $formkit: 'text',
                        name: 'actual_address',
                        label: 'Фактический адрес организации',
                        validation: 'required',
                        outerClass: 'field--inline field--required'
                    }, {
                        $formkit: 'text',
                        name: 'okpo',
                        label: 'ОКПО',
                        validation: 'required',
                        outerClass: 'field--inline field--required'
                    }, {
                        $formkit: 'text',
                        name: 'capital',
                        label: 'Сумма уставного капитала',
                        validation: 'required',
                        outerClass: 'field--inline field--required'
                    }, {
                        $formkit: 'text',
                        name: 'principal_activity',
                        label: 'Основной виде деятельности (ОКВЭД)',
                        validation: 'required',
                        outerClass: 'field--inline field--required'
                    }
                ],
                regPersonForm: [
                    {
                        $formkit: 'hidden',
                        name: 'organization',
                    }, {
                        $formkit: 'email',
                        name: 'email',
                        label: 'Email (Логин)',
                        validation: 'required',
                        outerClass: 'field--inline field--required'
                    }, {
                        $formkit: 'password',
                        name: 'password',
                        label: 'Пароль',
                        validation: 'required',
                        outerClass: 'field--inline field--required'
                    }, {
                        $formkit: 'password',
                        name: 'password_confirm',
                        label: 'Повтор пароля',
                        validation: 'required|confirm',
                        outerClass: 'field--inline field--required'
                    }, {
                        $formkit: 'text',
                        name: 'last_name',
                        label: 'Фамилия',
                        validation: 'required',
                        outerClass: 'field--inline field--required'
                    }, {
                        $formkit: 'text',
                        name: 'first_name',
                        label: 'Имя',
                        validation: 'required',
                        outerClass: 'field--inline field--required'
                    }, {
                        $formkit: 'text',
                        name: 'patronymic',
                        label: 'Отчество',
                        validation: 'required',
                        outerClass: 'field--inline field--required'
                    }, {
                        $formkit: 'text',
                        name: 'post',
                        label: 'Должность',
                        validation: 'required',
                        outerClass: 'field--inline field--required'
                    }, {
                        $formkit: 'email',
                        name: 'contact_email',
                        label: 'Email (контактный)',
                        //validation: 'required',
                        outerClass: 'field--inline'
                    }, {
                        $formkit: 'text',
                        name: 'phone',
                        label: 'Телефон (контактный)',
                        outerClass: 'field--inline'
                    }
                ],
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
        },
        methods: {
            addInvite() {
                this.inviteNumbers++;
            },
            prev() {
                this.$store.dispatch('setStepRegistration', this.stepRegistration - 1);
                this.stepRegistration = this.$store.state.stepRegistration;
                //this.regData = this.$store.state.regData;
                //this.$emit('prev', this.serialize());
            },
            next() {
                if (this.stepRegistration !== 4) {
                    this.$store.dispatch('setStepRegistration', this.stepRegistration + 1);
                    this.stepRegistration = this.$store.state.stepRegistration;
                    //this.$emit('next', this.serialize());
                } else {
                    this.$store.dispatch('setStepRegistration', null);
                    this.$store.dispatch('setRegData', null);
                    this.$router.push({ name: 'cabinet' });
                }
            },
            submitSearchHandler(data, node) {
                //this.regData.search = Object.assign({}, this.formData);
                //this.$store.dispatch('setRegData', this.regData);
                this.showLoaderSending = true;
                let params = Object.assign({}, this.regData.search);
                api.searchOrganization(params).then(res => {
                    this.showLoaderSending = false;
                    if (res.inn) {
                        this.regData.organization = Object.assign({}, res);
                    } else {
                        this.regData.organization = Object.assign({}, params);
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
                this.showLoaderSending = true;
                let params = Object.assign({}, this.regData.organization);
                api.addOrganization(params).then(res => {
                    this.showLoaderSending = false;
                    console.log(res);
                    this.regData.organization = Object.assign({}, res);
                    this.regData.person = {
                        organization: res.id
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
                    //this.regData.person = Object.assign({}, res);
                    //this.$store.dispatch('setRegData', this.regData);
                    //this.next();
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
                    //this.$store.dispatch('showError', err);
                    console.error(err);
                });
            },
        }
    };
</script>
