<template>
    <div>
        <FormKit 
            id="organizationEdit"
            v-model="formValues"
            name="organizationEdit"
            preserve
            type="form"
            data-loading="loading"
            form-class="$reset organization__form form__public"
            :actions="false"
            :disabled="loading"
            :loading="loading ? true : undefined"
            @submit="updateOrganization"
        >
            <div class="form__block">
                <FormKitSchema 
                    :schema="schema" 
                />
            </div>
            <div 
                class="form__submit edit__form-submit" 
                data-type="submit"
            >
                <button
                    :disabled="loading"
                    class="button button-red"
                    @click="onClickCancel"
                >
                    Отменить
                </button>
                <button
                    type="submit"
                    :disabled="loading"
                    class="button button-green"
                >
                    Сохранить
                </button>
            </div> 
        </FormKit>
        <div class="organization__form form__public">
            <div class="organization__form-logo">
                <div class="field">
                    <div class="field__inner">
                        <label class="field__label" for="logo">Логотип</label>
                        <div class="field__input m--hidden">
                            <input
                                ref="logoInput"
                                accept=".jpg,.png,.svg" 
                                class="input" 
                                type="file" 
                                name="logo" 
                                id="logo"
                            >
                        </div>
                    </div>
                    <div 
                        class="form__submit edit__form-submit m--start" 
                    >
                        <button
                            :disabled="loading"
                            class="button button-outline-green button-width-auto"
                            @click.prevent="onClickUploadLogo"
                        >
                            Загрузить новый
                        </button>
                        <button
                            v-if="organization.logo"
                            :disabled="loading"
                            class="button button-outline-red button-width-auto"
                            @click.prevent="onClickDeleteLogo"
                        >
                            Удалить
                        </button>
                    </div>
                    <div 
                        v-if="organization.logo"
                        class="field__text m--color-green"
                    >
                        Загружен файл: {{ organization.logo.split('/').at(-1) }}
                    </div>
                    <div class="field__text">
                        Рекомендуемый размер: 600х600px. jpg, png, svg
                    </div>
                </div>
                <div class="organization__form-logo-pic">
                    <img
                        v-if="organization.logo"
                        :src="organization.logo" 
                        alt="" 
                    />
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import { user as api } from "@/services";
    export default {
        name: 'OrganizationEdit',
        props: {
            /*
            loading: {
                type: Boolean,
                default() { return false; }
            },
            */
            readonly: {
                type: Boolean,
                default() { return false; }
            },
            user: {
                type: Object,
                default() { 
                    return {} 
                }
            },
            organization: {
                type: Object,
                default() { return {}; }
            },
        },
        data() {
            return {
                formValues: this.organization,
                addressMatches: false,
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
                    /*
                    }, {
                        $formkit: 'file',
                        name: 'logo',
                        label: 'Логотип',
                        accept: '.jpg,.png,.svg',
                        help: 'Рекомендуемый размер: 600х600px. jpg, png, svg',
                        // placeholder: 'https://example.ru',
                        // outerClass: 'field--required',
                        // maska: { mask: ['########', '##########']},
                    */
                    }, {
                        $formkit: 'text',
                        name: 'website',
                        label: 'Сайт',
                        placeholder: 'https://example.ru',
                        // outerClass: 'field--required',
                        // maska: { mask: ['########', '##########']},
                    }, {
                        $formkit: 'text',
                        name: 'contact_phone',
                        label: 'Контактный телефон организации',
                        placeholder: '+7 (999) 999 99 99',
                        // outerClass: 'field--required',
                        // maska: { mask: ['########', '##########']},
                    }, {
                        $formkit: 'text',
                        name: 'contact_email',
                        label: 'Контактный email организации',
                        placeholder: 'mail@example.ru',
                        // outerClass: 'field--required',
                        // maska: { mask: ['########', '##########']},
                    }, {
                        $formkit: 'textarea',
                        name: 'about_company',
                        label: 'О компании',
                        placeholder: '',
                        // outerClass: 'field--required',
                        // maska: { mask: ['########', '##########']},
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
                loading: false
            };
        },
        watch: {
            'formValues.address_matches': {
                handler() {
                    this.addressMatches = this.formValues.address_matches;
                    const node = this.$formkit.get('address');
                    node.props.disabled = this.addressMatches;
                    this.formValues.actual_address = this.formValues.legal_address;
                },
            }
        },
        mounted() {
            if (this.formValues.actual_address === this.formValues.legal_address) {
                this.formValues.address_matches = true;
            }
        },
        methods: {
            onClickUploadLogo() {
                let logoInput = this.$refs.logoInput;
                let click = new MouseEvent('click');

                logoInput.onchange = this.uploaLogoComplete;
                logoInput.dispatchEvent(click);
            },
            onClickDeleteLogo() {
                console.log('onClickDeleteLogo');
                const data = new FormData();
                data.append('logo', '');
                this.loading = true;
                api.updateOrganization(this.organization.id, data).then(res => {
                    // this.showLoaderSending = false;
                    // this.$router.go(-1);
                    this.$emit('getMyProfile');
                    this.loading = false;
                }).catch(err => {
                    this.loading = false;
                    this.$store.dispatch('showError', err);
                    console.error(err);
                });
            },
            uploaLogoComplete(event) {
                console.log(event.target);
                let file = event.target.files ? event.target.files[0] : null
                if (file) {
                    const data = new FormData();
                    data.append('logo', file);
                    this.loading = true;
                    api.updateOrganization(this.organization.id, data).then(res => {
                        // this.showLoaderSending = false;
                        // this.$router.go(-1);
                        this.$emit('getMyProfile');
                        this.loading = false;
                    }).catch(err => {
                        this.loading = false;
                        this.$store.dispatch('showError', err);
                        console.error(err);
                    });
                }
            },
            onClickCancel() {
                this.$router.go(-1);
            },
            updateOrganization(formData, node) {
                console.log(formData);

                const data = new FormData();
                //formData.append("file", file)
                //formData.append("description", this.tenderForm[`description_${file.id}`] || file.name)
                //formData.append("publication", true)
                this.schema.forEach(item => {
                    if (formData[item.name] && formData[item.name].length) {
                        if (item.name === 'logo') {
                            data.append(item.name, formData[item.name][0].file);
                        } else {
                            data.append(item.name, formData[item.name]);
                        }
                    }
                    if (item.children && Array.isArray(item.children)) {
                        item.children.forEach(sitem => {
                            //console.log(sitem.name, formData[sitem.name]);
                            data.append(sitem.name, formData[sitem.name]);
                        });
                    }
                });
                console.log(data);
                api.updateOrganization(formData.id, data).then(res => {
                    // this.showLoaderSending = false;
                    // this.$router.go(-1);
                    this.$emit('getMyProfile');
                }).catch(err => {
                    node.setErrors(
                        [err.detail],
                    );
                    // this.showLoaderSending = false;
                    this.$store.dispatch('showError', err);
                    console.error(err);
                });
            },
        }
    };
</script>