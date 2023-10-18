<template>
    <div class="profile__user">
        <template v-if="showLoaderSending">
            <div class="profile__loader loader">
                <div class="spinner" /> Загрузка данных
            </div>
        </template>
        <template v-else>
            <FormKit
                v-model="formData"
                name="form-person"
                preserve
                type="form"
                autocomplete="off"
                data-loading="busyForm"
                form-class="$reset profile__form form"
                :actions="false"
                :disabled="busyForm"
                :loading="busyForm ? true : undefined"
                @submit="submitHandler"
            >
                <div v-if="personId" class="h2">
                    {{ person.last_name }} {{ person.first_name }} {{ person.patronymic }}
                </div>
                <div class="form profile__form-block">
                    <div class="profile__form-main">
                        <FormKitSchema 
                            :schema="schema" 
                        />
                    </div>
                    <div 
                        v-if="personId"
                        class="profile__form-logo"
                    >
                        <div class="field__input m--hidden">
                            <input
                                id="photo"
                                ref="photoInput" 
                                accept=".jpg,.png,.svg" 
                                class="input" 
                                type="file" 
                                name="photo"
                            >
                        </div>
                        <div class="profile__form-logo-block">
                            <div class="profile__form-logo-inner">
                                <button
                                    v-if="!formData.photo"
                                    href="#"
                                    class="button button-outline-green button-width-auto m--small"
                                    @click.prevent="onClickUploadPhoto"
                                >
                                    Загрузить фото
                                </button>
                                <img 
                                    v-else
                                    :src="formData.photo"
                                />
                            </div>
                        </div>
                        <div 
                            v-if="formData.photo"
                            class="profile__form-logo-links" 
                        >
                            <a
                                href="#"
                                class="profile__form-logo-link"
                                @click.prevent="onClickUploadPhoto"
                            >
                                Изменить фото
                            </a>
                            <a
                                href="#"
                                class="profile__form-logo-link m--color-red"
                                @click.prevent="onClickDeletePhoto"
                            >
                                Удалить
                            </a>
                        </div>
                        Рекомендуемый размер: 600х600px. jpg, png, svg
                    </div>
                </div>
                <div   
                    class="form__submit profile__form-submit" 
                    data-type="submit"
                >
                    <button
                        type="submit"
                        :disabled="busyForm"
                        class="button button-green m--nowrap"
                    >
                        {{ personId ? 'Сохранить изменения' : 'Добавить пользователя' }}
                    </button>
                </div>  
            </FormKit>
        </template>
    </div>
</template>
<script>
    import { cabinet, geo as geoApi } from "@/services";

    function phoneLen(node) {
        const value = node.value;
        return value.number?.length === 15 || value.number?.length === 0;
    }

    export default {
        name: 'PersonAdd',
        props: {
            personId: {
                type: [String, Number],
                default() { return null; }
            },
        },
        data() {
            return {
                formData: {},
                person: {},
                countryList: [],
                busyForm: false,
                showLoaderSending: false,
                schema: [
                    {
                        $formkit: 'email',
                        name: 'email',
                        label: 'Email (аккаунт)',
                        validation: 'required',
                        disabled: this.personId ? true : false,
                        outerClass: 'field--required'
                    }, {
                        $formkit: 'phoneWithCode',
                        name: 'phone',
                        maska: { mask: '(###) ###-##-##' },
                        label: 'Телефон (аккаунт)',
                        placeholder: '(XXX) XXX-XX-XX',
                        validationRules: { phoneLen },
                        validation: 'required|phoneLen',
                        options: async () => { return await this.getCountryList() },
                        outerClass: 'field--required',
                        classes: { multiselect: 'multiselect m--phone-code' },
                    }, {
                    /*
                        $formkit: 'password',
                        name: 'password',
                        label: 'Пароль',
                        validation: 'required',
                        outerClass: 'field--required'
                    }, {
                        $formkit: 'password',
                        name: 'password_confirm',
                        label: 'Повтор пароля',
                        validation: 'required|confirm',
                        outerClass: 'field--required'
                    }, {
                    */
                        $formkit: 'text',
                        name: 'last_name',
                        label: 'Фамилия',
                        validation: 'required',
                        outerClass: 'field--required'
                    }, {
                        $formkit: 'text',
                        name: 'first_name',
                        label: 'Имя',
                        validation: 'required',
                        outerClass: 'field--required'
                    }, {
                        $formkit: 'text',
                        name: 'patronymic',
                        label: 'Отчество',
                        validation: 'required',
                        outerClass: 'field--required'
                    }, {
                        $formkit: 'email',
                        name: 'contact_email',
                        label: 'Контактный email',
                        placeholder: "info@example.ru",
                        //validation: 'required',
                        // outerClass: 'field--inline'
                    }, {
                        $formkit: 'phoneWithCode',
                        name: 'contact_phone',
                        maska: { mask: '(###) ###-##-##' },
                        label: 'Контактный телефон',
                        placeholder: '(XXX) XXX-XX-XX',
                        validationRules: { phoneLen },
                        validation: 'phoneLen',
                        options: async () => { return await this.getCountryList() },
                        classes: { multiselect: 'multiselect m--phone-code' },
                    }, {
                        $formkit: 'text',
                        name: 'city',
                        label: 'Город',
                    }, {
                        $formkit: 'text',
                        name: 'post',
                        label: 'Должность',
                        validation: 'required',
                        outerClass: 'field--required'
                    }
                ],
            }
        },
        computed: {
            organization() {
                return this.$store.state.user.organization || {};
            },
            user() {
                return this.$store.state.user || {};
            },
        },
        created() {
            if (this.personId) this.getPerson();
        },
        methods: {
            async getCountryList() {
                return await geoApi.getCountries().then(countries => {
                    if (countries) {
                        let options = countries.map( country => {
                            return { 
                                label: country.code_phone, 
                                value: {
                                    id: country.id,
                                    name: country.name,
                                    code_phone: country.code_phone,
                                }, 
                            }
                        });
                        return options;
                    } else {
                        console.log('No getCountries data')
                    }
                }).catch(err => {
                    console.error(err)
                })
            },
            getPerson() {
                console.log('getPerson');
                this.showLoaderSending = true;
                cabinet.getMyOrganizationMember(this.personId || this.formData.id).then(res => {
                    this.formData = res;
                    this.person = Object.assign({}, res);
                    if (!this.formData.phone?.number) {
                        this.formData.phone = {
                            country: {
                                label: this.person.phone?.substring(0, this.person.phone?.length - 10),
                                value: {
                                    id: this.person.country || this.organization.country,
                                    code_phone: this.person.phone?.substring(0, this.person.phone?.length - 10),
                                    name: this.person.country_name || this.organization.country_name
                                }
                            },
                            number: this.person.phone?.substring(this.person.phone?.length - 10)
                        };
                    }
                    if (!this.formData.contact_phone?.number) {
                        this.formData.contact_phone = {
                            country: {
                                label: this.person.contact_phone?.substring(0, this.person.contact_phone?.length - 10),
                                value: {
                                    id: this.person.country || this.organization.country,
                                    code_phone: this.person.contact_phone?.substring(0, this.person.contact_phone?.length - 10),
                                    name: this.person.country_name || this.organization.country_name
                                }
                            },
                            number: this.person.contact_phone?.substring(this.person.contact_phone?.length - 10)
                        };
                    }
                    this.showLoaderSending = false;
                    this.busyForm = false;
                }).catch(err => {
                    this.showLoaderSending = false;
                    this.busyForm = false;
                    console.error(err);
                });
            },
            onClickUploadPhoto() {
                let photoInput = this.$refs.photoInput;
                let click = new MouseEvent('click');

                photoInput.onchange = this.uploaPhotoComplete;
                photoInput.dispatchEvent(click);
            },
            onClickDeletePhoto() {
                const data = new FormData();
                data.append('photo', '');
                this.busyForm = true;
                cabinet.updateMyOrganizationMemberPhoto(this.formData.id, data).then(res => {
                    this.getPerson();
                }).catch(err => {
                    this.busyForm = false;
                    this.$store.dispatch('showError', err);
                    console.error(err);
                });
            },
            uploaPhotoComplete(event) {
                let file = event.target.files ? event.target.files[0] : null
                if (file) {
                    const data = new FormData();
                    data.append('photo', file);
                    this.busyForm = true;
                    cabinet.updateMyOrganizationMemberPhoto(this.formData.id, data).then(res => {
                        this.getPerson();
                    }).catch(err => {
                        this.busyForm = false;
                        this.$store.dispatch('showError', err);
                        console.error(err);
                    });
                }
            },
            submitHandler(data, node) {
                this.busyForm = true;
                let params = Object.assign({});
                this.schema.forEach(item => {
                    params[item.name] = this.formData[item.name];
                });
                params.id = this.formData.id;
                params.country = this.formData.phone?.country?.value?.id;
                params.phone = params.phone?.country?.value?.code_phone + params.phone?.number;
                params.phone = params.phone?.replace(/ /g,'').replace(/-/g,'').replace(/\(/g,'').replace(/\)/g,'');
                params.contact_phone = params.contact_phone?.country?.value?.code_phone + params.contact_phone?.number;
                params.contact_phone = params.contact_phone?.replace(/ /g,'').replace(/-/g,'').replace(/\(/g,'').replace(/\)/g,'');
                if (this.personId) {
                    delete params.email;
                    cabinet.updateMyOrganizationMemberPartial(params).then(res => {
                        this.getPerson();
                    }).catch(err => {
                        node.setErrors(
                            err.response.data
                        );
                        this.busyForm = false;
                    });
                } else {
                    params.organization = this.organization.id;
                    cabinet.addMyOrganizationMember(params).then(res => {
                        //this.formData = res;
                        //this.getPerson();
                        this.busyForm = false;
                        this.$router.push({ name: 'organization', hash: '#persons' })
                    }).catch(err => {
                        node.setErrors(
                            err.response.data
                        );
                        this.busyForm = false;
                    });
                }
            },
        }
    };
</script>
