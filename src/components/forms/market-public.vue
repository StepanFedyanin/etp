<template>
    <div class="profile__user">
        <template v-if="showLoaderSending">
            <div class="profile__loader loader">
                <div class="spinner" /> Загрузка данных
            </div>
        </template>
        <template v-else>
            <FormKit 
                id="marketEdit"
                v-model="formData"
                name="marketEdit"
                preserve
                type="form"
                data-loading="loading"
                form-class="$reset profile__form"
                :actions="false"
                :disabled="busyForm || !user.is_access_organization"
                :loading="busyForm ? true : undefined"
                @submit="submitHandler"
            >
                <div class="form profile__form-block">
                    <div class="profile__form-main">
                        <FormKitSchema 
                            :schema="schema" 
                        />
                    </div>
                    <div class="profile__form-logo m--big">
                        <div class="field__input m--hidden">
                            <input
                                id="logo"
                                ref="logoInput" 
                                accept=".jpg,.png,.svg" 
                                class="input" 
                                type="file" 
                                name="logo"
                            >
                        </div>
                        <div class="profile__form-logo-block">
                            <div class="profile__form-logo-inner">
                                <button
                                    v-if="!formData.logo && user.is_access_organization"
                                    href="#"
                                    class="button button-outline-green button-width-auto m--small"
                                    @click.prevent="onClickUploadLogo"
                                >
                                    Загрузить лого
                                </button>
                                <img 
                                    v-else-if="formData.logo"
                                    :src="formData.logo"
                                />
                            </div>
                        </div>
                        <div 
                            v-if="formData.logo && user.is_access_organization"
                            class="profile__form-logo-links" 
                        >
                            <a
                                href="#"
                                class="profile__form-logo-link"
                                @click.prevent="onClickUploadLogo"
                            >
                                Изменить лого
                            </a>
                            <a
                                href="#"
                                class="profile__form-logo-link m--color-red"
                                @click.prevent="onClickDeleteLogo"
                            >
                                Удалить
                            </a>
                        </div>
                        Рекомендуемый размер: 600х600px. jpg, png, svg
                        <!--p>
                            Ваш профиль виден всем по ссылке:<br>
                            <router-link
                                v-slot="{ href, navigate }"
                                :to="{ name: 'contragent', params: { id: marketUser.id } }"
                            >
                                <a 
                                    :href="href"
                                    target="_blank"
                                    @click="navigate"
                                >
                                    {{ selfPath }}{{ href }}
                                </a>
                            </router-link>
                        </p-->

                    </div>
                </div>
                <div   
                    class="form__submit profile__form-submit" 
                    data-type="submit"
                >
                    <button
                        type="submit"
                        :disabled="busyForm || !this.user.is_access_organization"
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
    import { selfPath } from '@/settings';
    import { cabinet, geo as geoApi } from '@/services';

    function phoneLen(node) {
        const value = node.value;
        return value.number?.length === 15 || value.number?.length === 0;
    }

    export default {
        name: 'MarketEdit',
        props: {
            readonly: {
                type: Boolean,
                default() { return false; }
            },
        },
        data() {
            return {
                selfPath,
                formData: {},
                addressMatches: false,
                disabledCountry: false,
                busyForm: false,
                showLoaderSending: false,
                schema: [
                    {
                        $formkit: 'text',
                        name: 'name',
                        label: 'Продавец',
                        help: 'Имя продавца будет показано в описании ваших товаров',
                        placeholder: '',
                        validation: 'required',
                        outerClass: 'field--required',
                    }, {
                        $formkit: 'phoneWithCode',
                        name: 'phone',
                        maska: { mask: '(###) ###-##-##' },
                        label: 'Контактный телефон',
                        placeholder: '(XXX) XXX-XX-XX',
                        validationRules: { phoneLen },
                        validation: 'phoneLen',
                        options: async () => { return await this.getCountryList() },
                        disabledCountry: this.$store.state.user.organization.country ? true : false,
                        classes: { multiselect: 'multiselect m--phone-code' },
                    }, {
                        $formkit: 'text',
                        name: 'email',
                        label: 'Контактный email',
                        placeholder: 'mail@example.ru',
                        // outerClass: 'field--required',
                    }, {
                        $formkit: 'text',
                        name: 'site',
                        label: 'Сайт',
                        placeholder: 'https://example.ru',
                        // outerClass: 'field--required',
                    }, {
                        $formkit: 'text',
                        name: 'city',
                        label: 'Город',
                        placeholder: 'Ваш город',
                        // outerClass: 'field--required',
                    }, {
                        $formkit: 'textarea',
                        name: 'about',
                        label: 'О компании',
                        placeholder: '',
                        // outerClass: 'field--required',
                    }
                ],
            };
        },
        computed: {
            marketUser() {
                return this.$store.state.user.marketplace_user || {};
            },
            user() {
                return this.$store.state.user || {};
            },
        },
        created() {
            this.getMarketProfile();
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
            getMarketProfile() {
                this.showLoaderSending = true;
                cabinet.getMarketOrganizationProfile().then(res => {
                    this.formData = res || {};
                    let marketUser = Object.assign({}, res);
                    if (!this.formData.phone?.number) {
                        this.formData.phone = {
                            country: {
                                label: marketUser.phone?.substring(0, marketUser.phone?.length - 10) || '+7',
                                value: {
                                    id: marketUser.country || 1,
                                    code_phone: marketUser.phone?.substring(0, marketUser.phone?.length - 10) || '+7',
                                    name: marketUser.country_name || 'Россия'
                                }
                            },
                            number: marketUser.phone?.substring(marketUser.phone?.length - 10)
                        };
                        if (marketUser.country) this.disabledCountry = true;
                    }
                    this.showLoaderSending = false;
                }).catch(err => {
                    this.showLoaderSending = false;
                    console.error(err);
                });
            },
            onClickUploadLogo() {
                let logoInput = this.$refs.logoInput;
                let click = new MouseEvent('click');

                logoInput.onchange = this.uploaLogoComplete;
                logoInput.dispatchEvent(click);
            },
            onClickDeleteLogo() {
                const data = new FormData();
                data.append('logo', '');
                this.busyForm = true;
                cabinet.updateMarketOrganizationProfilePhoto(this.formData.id, data).then(res => {
                    cabinet.getMyProfile().then(res => {
                        this.busyForm = false;
                        this.$store.dispatch('setUser', res);
                        this.formData.logo = res.marketplace_user.logo;
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
            uploaLogoComplete(event) {
                let file = event.target.files ? event.target.files[0] : null
                if (file) {
                    const data = new FormData();
                    data.append('logo', file);
                    this.busyForm = true;
                    cabinet.updateMarketOrganizationProfilePhoto(this.formData.id, data).then(res => {
                        cabinet.getMyProfile().then(res => {
                            this.busyForm = false;
                            this.$store.dispatch('setUser', res);
                            this.formData.logo = res.marketplace_user.logo;
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
            submitHandler(formData, node) {
                this.busyForm = true;
                let params = Object.assign({}, this.formData);
                const data = new FormData();
                this.schema.forEach(item => {
                    if (item.name) {
                        if (item.name === 'phone') {
                            params.country = params.phone.country?.value?.id;
                            data.append('country', params.country);
                            params.phone = params.phone?.country?.value?.code_phone + params.phone?.number;
                            params.phone = params.phone?.replace(/ /g,'').replace(/-/g,'').replace(/\(/g,'').replace(/\)/g,'');
                            data.append('phone', params.phone);
                        } else {
                            if (params[item.name]) data.append(item.name, params[item.name]);
                        }
                    }
                });
                console.log(data);
                cabinet.updateMarketOrganizationProfilePartial(formData.id, data).then(res => {
                    cabinet.getMyProfile().then(res => {
                        this.busyForm = false;
                        this.$store.dispatch('setUser', res);
                        this.$emit('updateData', res);
                    }).catch(err => {
                        this.busyForm = false;
                        this.$store.dispatch('showError', err);
                        console.error(err);
                    });
                }).catch(err => {
                    node.setErrors(
                        err.response.data,
                    );
                    this.busyForm = false;
                });
            },
        }
    };
</script>