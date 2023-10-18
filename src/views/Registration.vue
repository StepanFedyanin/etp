<template>
    <div class="app__main">
        <div class="registration">
            <div 
                :class="['container m--1460']"
            >
                <div class="registration__block">
                    <div class="registration__tabs tabs-buttons m--50">
                        <a 
                            v-for="item in regTabs"
                            :key="`tab-${item.name}`"
                            href="#" 
                            :class="['tabs-buttons__item', item.name === $route.name ? 'is-active' : '']"
                            @click.prevent="next(item.name)"
                        >
                            {{ item.title }}
                        </a>
                    </div>
                    <FormKit
                        v-model="formData"
                        type="form"
                        data-loading="showLoaderSending"
                        form-class="$reset registration__form form"
                        submit-label="Зарегистрироваться"
                        :disabled="showLoaderSending"
                        :loading="showLoaderSending ? true : undefined"
                        :submit-attrs="{
                            inputClass: '$reset button button-green m--w-100',
                            wrapperClass: '$reset registration__form-submit form__submit',
                            outerClass: '$reset',
                        }"
                        @submit="submitHandler"
                    >
                        <FormKitSchema :schema="regForm" />
                    </FormKit>
                </div>
            </div>

        </div>
    </div>
</template>

<script>
    import { user as api, geo as geoApi, cabinet } from "@/services";
//    import regSearchForm from '@/components/forms/reg-search-form';
//    import regOrganizationForm from '@/components/forms/reg-organization-form';
//    import regPersonForm from '@/components/forms/reg-person-form';
//    import regOrganizationItem from '@/components/reg-organization-item';
    
    function phoneLen(node) {
        const value = node.value;
        return value.number?.length === 15;
    }

    export default {
        components: {
            //regSearchForm,
            //regOrganizationForm,
            //regPersonForm,
            //regOrganizationItem,
            //inviteAddForm
        },
        props: {
        },        
        data() {
            return {
                formData: {
                    phone: {
                        country: {
                            id: 1,
                            cond_phone: '+7',
                            name: 'Россия'
                        }
                    }
                },
                regTabs: [
                    {
                        name: 'auth',
                        title: 'Вход'
                    }, {
                        name: 'registration',
                        title: 'Регистрация'
                    }
                ],
                regForm: [
                    {
                        $formkit: 'text',
                        name: 'email',
                        label: 'Электронная почта',
                        placeholder: 'mail@domain.ru',
                        validation: 'required',
                        outerClass: 'field--required'
                    }, {
                        $formkit: 'password',
                        name: 'password',
                        label: 'Пароль',
                        placeholder: 'Не менее 8 символов',
                        validation: 'required',
                        outerClass: 'field--required'
                    }, {
                        $formkit: 'password',
                        name: 'password_confirm',
                        label: 'Повторите пароль',
                        placeholder: 'Не менее 8 символов',
                        validation: 'required',
                        outerClass: 'field--required'
                    }, {
                        $formkit: 'phoneWithCode',
                        name: 'phone',
                        maska: { mask: '(###) ###-##-##' },
                        label: 'Телефон',
                        placeholder: '(XXX) XXX-XX-XX',
                        validationRules: { phoneLen },
                        validation: 'required|phoneLen',
                        options: async () => {
                            return await geoApi.getCountries()
                                .then(countries => {
                                    if (countries) {
                                        let options = countries.map( country => {
                                            // if (!this.formData.phone?.country && country.name === 'Россия') this.formData.phone.country = { label: country.code_phone, value: country, country: country.name };
                                            return { 
                                                label: country.code_phone, 
                                                value: {
                                                    id: country.id,
                                                    name: country.name,
                                                    code_phone: country.code_phone,
                                                }, 
                                                country: country.name 
                                            }
                                        })
                                        /*
                                        console.log(options[0]);
                                        this.formData.phone = {
                                            country: options[0].value
                                        };
                                        */
                                        return options
                                    } else {
                                        console.log('No getCountries data')
                                    }
                                }).catch(err => {
                                    console.error(err)
                                })
                        },
                        classes: { multiselect: 'multiselect m--phone-code' },
                        outerClass: 'field--required',
                    }, {
                        $formkit: 'text',
                        name: 'last_name',
                        label: 'Фамилия',
                        placeholder: 'Иванов',
                        validation: 'required',
                        outerClass: 'field--required'
                    }, {
                        $formkit: 'text',
                        name: 'first_name',
                        label: 'Имя',
                        placeholder: 'Иван',
                        validation: 'required',
                        outerClass: 'field--required'
                    }, {
                        $formkit: 'text',
                        name: 'patronymic',
                        label: 'Отчество',
                        placeholder: 'Иванович',
                        validation: 'required',
                        outerClass: 'field--required'
                    }
                ],
                showLoaderSending: false,
            };
        },
        computed: {
        },
        created() {
        },
        mounted() {
            this.$store.dispatch('deathUser');
        },
        methods: {
            submitHandler(data, node) {
                this.showLoaderSending = true;
                let params = Object.assign({}, this.formData);
                params.country = params.phone.country.id;
                params.phone = params.phone.country.code_phone + params.phone.number;
                params.phone = params.phone?.replace(/ /g,'').replace(/-/g,'').replace(/\(/g,'').replace(/\)/g,'');
                console.log(params);
                api.addUser(params).then(res => {
                    console.log(res);
                    if (res.access && res.refresh) {
                        this.$store.dispatch('setToken', res);
                        cabinet.getMyProfile().then(res => {
                            this.showLoaderSending = false;
                            this.$store.dispatch('setUser', res);
                            //if (this.$metrika) this.$metrika.reachGoal('reg_3');
                            this.next('home');
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
                    node.setErrors(
                        err.response.data
                    );
                    this.showLoaderSending = false;
                    console.error(err);
                });
            },
            next(name) {
                this.$router.push({ name: name });
            },
        }
    };
</script>
