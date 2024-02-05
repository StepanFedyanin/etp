<template>
    <div class="profile__user">
        <template v-if="showLoaderSending">
            <div class="profile__loader loader">
                <div class="spinner" /> Загрузка данных
            </div>
        </template>
        <template v-else>
            <FormKit 
                id="profileEdit"
                v-model="formData"
                name="form-profile-edit"
                preserve
                type="form"
                data-loading="loading"
                form-class="$reset profile__form"
                :actions="false"
                :disabled="busyForm"
                :loading="busyForm ? true : undefined"
                @submit="submitHandler"
            >
                <div class="form profile__form-block">
                    <div class="profile__form-main">
                        <FormKitSchema 
                            :schema="schema" 
                        />
                    </div>
                    <div class="profile__form-logo">
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
                        class="button button-green"
                    >
                        Сохранить изменения
                    </button>
                </div> 
            </FormKit>
        </template>
    </div>
</template>

<script>
    import { cabinet as api, geo as geoApi } from "@/services";

    function phoneLen(node) {
        const value = node.value;
        return value.number?.length === 15 || value.number?.length === 0;
    }

    export default {
        name: 'ProfileEdit',
        data() {
            return {
                formData: {},
                person: {},
                busyForm: false,
                showLoaderSending: false,
                schema: [
                    {
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
                        // validation: 'required',
                        // outerClass: 'field--inline'
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
                        label: 'Должность/специализация',
                    }
                ],
            }
        },
        computed: {
            user() {
                return this.$store.state.user;
            },
        },
        created() {
            this.getMyProfile();
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
            getMyProfile() {
                this.showLoaderSending = true;
                api.getMyProfile().then(res => {
                    this.formData = res;
                    this.person = Object.assign({}, res);
                    if (!this.formData.contact_phone?.number) {
                        this.formData.contact_phone = {
                            country: {
                                label: this.person.contact_phone?.substring(0, this.person.contact_phone?.length - 10),
                                value: {
                                    id: this.person.country,
                                    code_phone: this.person.contact_phone?.substring(0, this.person.contact_phone?.length - 10),
                                    name: this.person.country_name
                                }
                            },
                            number: this.person.contact_phone?.substring(this.person.contact_phone?.length - 10)
                        };
                    }
                    this.showLoaderSending = false;
                }).catch(err => {
                    this.showLoaderSending = false;
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
                api.updateMyProfilePhoto(this.formData.id, data).then(res => {
                    api.getMyProfile().then(res => {
                        this.busyForm = false;
                        this.$store.dispatch('setUser', res);
                        this.formData.photo = res.photo;
                    }).catch(err => {
                        this.busyForm = false;
                        this.$store.dispatch('showError', err);
                        console.error(err);
                    });
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
                    api.updateMyProfilePhoto(this.formData.id, data).then(res => {
                        api.getMyProfile().then(res => {
                            this.busyForm = false;
                            this.$store.dispatch('setUser', res);
                            this.formData.photo = res.photo;
                        }).catch(err => {
                            this.busyForm = false;
                            this.$store.dispatch('showError', err);
                            console.error(err);
                        });
                    }).catch(err => {
                        this.busyForm = false;
                        this.$store.dispatch('showError', err);
                        console.error(err);
                    });
                }
            },
            submitHandler(data, node) {
                this.busyForm = true;
                let params = Object.assign({}, this.formData);
                delete params.photo;
                params.country = params.contact_phone.country?.value?.id;
                params.contact_phone = params.contact_phone?.country?.value?.code_phone + params.contact_phone?.number;
                params.contact_phone = params.contact_phone?.replace(/ /g,'').replace(/-/g,'').replace(/\(/g,'').replace(/\)/g,'');
                api.updateMyProfilePartial(params).then(res => {
                    api.getMyProfile().then(res => {
                        this.busyForm = false;
                        this.$store.dispatch('setUser', res);
                    }).catch(err => {
                        this.busyForm = false;
                        this.$store.dispatch('showError', err);
                        console.error(err);
                    });
                }).catch(err => {
                    node.setErrors(
                        err.response.data
                    );
                    this.busyForm = false;
                });
            },
        },
    }
</script>