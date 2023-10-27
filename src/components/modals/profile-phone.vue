<template>
    <q-no-ssr>
        <vue-final-modal 
            v-model="show"
            class="modal__container" 
            content-class="modal__block m--small"
            content-transition="vfm-fade"
            overlay-transition="vfm-fade"
            :clickToClose="false"
            @click-outside="$emit('hideModal', false)"
        >
            <button 
                class="modal__close" 
                @click="$emit('hideModal', false)"
            >
                <span />
            </button>
            <span class="modal__title">Новый телефон аккаунта</span>
            <div class="modal__content">
                <div class="text">
                    <p class="m--mb-1">
                        <strong>{{ user.full_name }}</strong>
                    </p>
                </div>
                <FormKit
                    v-model="formData"
                    name="form-email"
                    preserve
                    type="form"
                    data-loading="loading"
                    form-class="$reset form m--width-100 m--no--comments"
                    :actions="false"
                    :disabled="showLoaderSending"
                    :loading="showLoaderSending ? true : undefined"
                    @submit="submitHandler"
                >
                    <div
                        v-if="changedSended" 
                        class="text"
                    >
                        <p class="m--mb-1">
                            <strong>Ваш телефон аккаунта изменен!</strong>
                        </p>
                    </div>
                    <FormKitSchema 
                        v-else
                        :schema="schema" 
                    />
                    <div 
                        class="form__submit" 
                        data-type="submit"
                    >
                        <button
                            v-if="changedSended"
                            :disabled="showLoaderSending"
                            class="button button-green button-center"
                            @click.prevent="$emit('hideModal', false)"
                        >
                            Закрыть окно
                        </button>
                        <button
                            v-else
                            type="submit"
                            :disabled="showLoaderSending"
                            class="button button-green button-center"
                        >
                            Изменить телефон
                        </button>
                    </div>
                </FormKit>
            </div>
        </vue-final-modal>
    </q-no-ssr>
</template>

<script>
    import { cabinet, geo as geoApi } from "@/services"

    function phoneLen(node) {
        const value = node.value;
        return value.number?.length === 15 || value.number?.length === 0;
    }

    export default {
        props: {
            showModal: {
                type: Boolean,
                default() { return false; }
            },
        },
        data() {
            return {
                formData: {},
                schema: [
                    {
                        $formkit: 'phoneWithCode',
                        name: 'phone',
                        maska: { mask: '(###) ###-##-##' },
                        label: 'Контактный телефон',
                        placeholder: '(XXX) XXX-XX-XX',
                        validationRules: { phoneLen },
                        validation: 'phoneLen',
                        options: async () => {
                            return await geoApi.getCountries()
                                .then(countries => {
                                    if (countries) {
                                        let options = countries.map( country => {
                                            // if (!this.formData.phone?.country && country.name === 'Россия') this.formData.phone.country = { label: country.code_phone, value: country, country: country.name };
                                            return { label: country.code_phone, 
                                                value: {
                                                    id: country.id,
                                                    name: country.name,
                                                    code_phone: country.code_phone,
                                                }, 
                                                country: country.name 
                                            }
                                        });
                                        return options
                                    } else {
                                        console.log('No getCountries data')
                                    }
                                }).catch(err => {
                                    console.error(err)
                                })
                        },
                        classes: { multiselect: 'multiselect m--phone-code' },    
                    }
                ],
                showLoaderSending: false,
                changedSended: false,
            };
        },
        computed: {
            show() {
                return this.showModal;
            },
            user() {
                return this.$store.state.user;
            },
        },
        mounted() {
        },
        methods: {
            submitHandler(data, node) {
                this.showLoaderSending = true;
                let params = Object.assign({}, this.formData);
                params.id = this.user.id;
                params.phone = params.phone?.country?.code_phone + params.phone?.number;
                params.phone = params.phone?.replace(/ /g,'').replace(/-/g,'').replace(/\(/g,'').replace(/\)/g,'');
                cabinet.updateMyProfilePartial(params).then(res => {
                    cabinet.getMyProfile().then(res => {
                        this.showLoaderSending = false;
                        this.$store.dispatch('setUser', res);
                        this.changedSended = true;
                    }).catch(err => {
                        this.showLoaderSending = false;
                        this.$store.dispatch('showError', err);
                        console.error(err);
                    });
                }).catch(err => {
                    node.setErrors(
                        err.response.data
                    );
                    this.showLoaderSending = false;
                });
            },
        }
    };
</script>
