<template>
    <div class="profile__user">
        <template v-if="showLoaderSending">
            <div class="profile__loader loader">
                <div class="spinner" /> Загрузка данных
            </div>
        </template>
        <template v-else>
            <FormKit 
                id="organizationEdit"
                v-model="formData"
                name="organizationEdit"
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
                        <p>
                            Ваш профиль виден всем по ссылке:<br>
                            <router-link
                                v-slot="{ href, navigate }"
                                :to="{ name: 'contragent', params: { id: organization.id } }"
                            >
                                <a 
                                    :href="href"
                                    target="_blank"
                                    @click="navigate"
                                >
                                    {{ selfPath }}{{ href }}
                                </a>
                            </router-link>
                        </p>

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
        name: 'OrganizationEdit',
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
                        $formkit: 'hidden',
                        name: 'legal_address',
                        disabled: true,
                    }, {
                        $formkit: 'textarea',
                        id: 'address',
                        name: 'actual_address',
                        disabled: this.addressMatches ? true : this.$store.state.user.is_access_organization ? false : true,
                        label: 'Фактический адрес организации',
                        placeholder: 'Свердловская обл., г. Артемовский, ул. Дзержинского, Д. 1, К. Д, 623784',
                    }, {
                        $formkit: 'checkbox',
                        id: 'address_matches',
                        name: 'address_matches',
                        label: 'Совпадает с юридическим',
                        outerClass: 'm--left'
                    }, {
                        $formkit: 'text',
                        name: 'website',
                        label: 'Сайт',
                        placeholder: 'https://example.ru',
                        // outerClass: 'field--required',
                    }, {
                        $formkit: 'phoneWithCode',
                        name: 'contact_phone',
                        maska: { mask: '(###) ###-##-##' },
                        label: 'Контактный телефон организации',
                        placeholder: '(XXX) XXX-XX-XX',
                        validationRules: { phoneLen },
                        validation: 'phoneLen',
                        options: async () => { return await this.getCountryList() },
                        disabledCountry: this.$store.state.user.organization.country ? true : false,
                        classes: { multiselect: 'multiselect m--phone-code' },
                    }, {
                        $formkit: 'text',
                        name: 'contact_email',
                        label: 'Контактный email организации',
                        placeholder: 'mail@example.ru',
                        // outerClass: 'field--required',
                    }, {
                        $formkit: 'textarea',
                        name: 'about_company',
                        label: 'О компании',
                        placeholder: '',
                        // outerClass: 'field--required',
                    }, {         
                        $el: 'div',
                        children: 'Статус предприятия',
                        attrs: {
                            class: 'field__label'
                        },
                    }, {
                        $el: 'div',
                        attrs: {
                            class: 'organization__form-checkboxes'
                        },
                        children: [
                            {
                                $formkit: "checkbox",
                                label: "Производитель",
                                name: "manufacturer",
                            },{
                                $formkit: "checkbox",
                                label: "Дилер / дистрибьютор",
                                name: 'dealer',
                            },{
                                $formkit: "checkbox",
                                label: "Генподрядчик",
                                name: 'gen_contractor',
                            },{
                                $formkit: "checkbox",
                                label: "Подрядчик",
                                name: 'contractor',
                            },
                        ],
                    }
                ],
            };
        },
        computed: {
            organization() {
                return this.$store.state.user.organization || {};
            },
            user() {
                return this.$store.state.user || {};
            },
        },
        watch: {
            'formData.address_matches': {
                handler() {
                    this.addressMatches = this.formData.address_matches;
                    const node = this.$formkit.get('address');
                    if (node) {
                        node.props.disabled = this.addressMatches;
                        if (!this.user.is_access_organization) node.props.disabled = true;
                    }
                    if (this.addressMatches) {
                        this.formData.actual_address = this.formData.legal_address;
                    }
                },
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
                cabinet.getMyProfile().then(res => {
                    this.formData = res.organization || {};
                    let organization = Object.assign({}, res.organization);
                    if (!this.formData.contact_phone?.number) {
                        this.formData.contact_phone = {
                            country: {
                                label: organization.contact_phone?.substring(0, organization.contact_phone?.length - 10) || '+7',
                                value: {
                                    id: organization.country || 1,
                                    code_phone: organization.contact_phone?.substring(0, organization.contact_phone?.length - 10) || '+7',
                                    name: organization.country_name || 'Россия'
                                }
                            },
                            number: organization.contact_phone?.substring(organization.contact_phone?.length - 10)
                        };
                        if (organization.country) this.disabledCountry = true;
                    }
                    this.showLoaderSending = false;
                    this.$nextTick(() => {
                        if (this.formData.actual_address === this.formData.legal_address) {
                            this.formData.address_matches = true;
                        }
                    });
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
                cabinet.updateOrganizationKonturLogo(this.formData.id, data).then(res => {
                    cabinet.getMyProfile().then(res => {
                        this.busyForm = false;
                        this.$store.dispatch('setUser', res);
                        this.formData.logo = res.organization.logo;
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
                    cabinet.updateOrganizationKonturLogo(this.formData.id, data).then(res => {
                        cabinet.getMyProfile().then(res => {
                            this.busyForm = false;
                            this.$store.dispatch('setUser', res);
                            this.formData.logo = res.organization.logo;
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
                        if (item.name === 'contact_phone') {
                            params.country = params.contact_phone.country?.value?.id;
                            data.append('country', params.country);
                            params.contact_phone = params.contact_phone?.country?.value?.code_phone + params.contact_phone?.number;
                            params.contact_phone = params.contact_phone?.replace(/ /g,'').replace(/-/g,'').replace(/\(/g,'').replace(/\)/g,'');
                            data.append('contact_phone', params.contact_phone);
                        } else {
                            if (params[item.name]) data.append(item.name, params[item.name]);
                        }
                    }
                    if (item.children && Array.isArray(item.children)) {
                        item.children.forEach(sitem => {
                            data.append(sitem.name, params[sitem.name]);
                        });
                    }
                });
                cabinet.updateOrganizationKonturPartial(formData.id, data).then(res => {
                    cabinet.getMyProfile().then(res => {
                        this.busyForm = false;
                        this.$store.dispatch('setUser', res);
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