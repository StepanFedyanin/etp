<template>
    <div class="profile__user">
        <template
            v-if="showLoaderSending"
        >
            <div class="profile__loader loader">
                <div class="spinner" /> Загрузка данных
            </div>
        </template>
        <template
            v-else
        >
            <FormKit 
                id="organizationEdit"
                v-model="formData"
                name="organizationEdit"
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
                                    v-if="!formData.logo"
                                    href="#"
                                    class="button button-outline-green button-width-auto m--small"
                                    @click.prevent="onClickUploadLogo"
                                >
                                    Загрузить лого
                                </button>
                                <img 
                                    v-else
                                    :src="formData.logo"
                                />
                            </div>
                        </div>
                        <div 
                            v-if="formData.logo"
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
    import { selfPath } from '@/settings';
    import { user as api } from '@/services';
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
                        disabled: !this.addressMatches ? false : true,
                        label: 'Фактический адрес организации',
                        placeholder: 'Свердловская обл., г. Артемовский, ул. Дзержинского, Д. 1, К. Д, 623784',
                    }, {
                        $formkit: 'checkbox',
                        id: 'address_matches',
                        name: 'address_matches',
                        disabled: false,
                        label: 'Совпадает с юридическим',
                        outerClass: 'm--left'
                    }, {
                        $formkit: 'text',
                        name: 'website',
                        label: 'Сайт',
                        placeholder: 'https://example.ru',
                        // outerClass: 'field--required',
                    }, {
                        $formkit: 'maska',
                        name: 'contact_phone',
                        label: 'Контактный телефон организации',
                        placeholder: '+7 (999) 999 99 99',
                        // disabled: this.busyForm,
                        // outerClass: 'field--required',
                        maska: { mask: 'P*', tokens: { 'P': { pattern: /\+|-|\(|\)|[0-9]/ }}}
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
        },
        watch: {
            'formData.address_matches': {
                handler() {
                    this.addressMatches = this.formData.address_matches;
                    const node = this.$formkit.get('address');
                    if (node) {
                        node.props.disabled = this.addressMatches;
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
            getMyProfile() {
                this.showLoaderSending = true;
                api.getUser().then(res => {
                    this.formData = res.organization || {};
                    if (this.formData.actual_address === this.formData.legal_address) {
                        this.formData.address_matches = true;
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
                api.updateOrganizationLogo(this.formData.id, data).then(res => {
                    api.getUser().then(res => {
                        this.busyForm = false;
                        this.$store.dispatch('setUser', res);
                        this.formData.logo = res.logo;
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
                    api.updateOrganizationLogo(this.formData.id, data).then(res => {
                        api.getUser().then(res => {
                            this.busyForm = false;
                            this.$store.dispatch('setUser', res);
                            this.formData.logo = res.logo;
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
                const data = new FormData();
                this.schema.forEach(item => {
                    if (item.name) {
                        data.append(item.name, formData[item.name]);
                    }
                    if (item.children && Array.isArray(item.children)) {
                        item.children.forEach(sitem => {
                            data.append(sitem.name, formData[sitem.name]);
                        });
                    }
                });
                api.updateOrganizationPartial(formData.id, data).then(res => {
                    api.getUser().then(res => {
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