<template>
    <FormKit
        v-model="formData"
        name="form-search"
        preserve
        type="form"
        :actions="false"
        data-loading="loading"
        form-class="$reset organization__form form"
        :disabled="loading"
        :loading="loading ? true : undefined"
        @submit="submitHandler"
    >
        <div class="form__block">
            <FormKit 
                type="multiselect"
                name="country"
                label="Страна"
                validation="required"
                :canClear="false"
                :options="getCountries"
                :readonly="true"
            /> 
            <div 
                class="form__submit organization__form-submit" 
                data-type="submit"
            >
                <FormKit 
                    type="maska"
                    name="inn"
                    label="ИНН"
                    placeholder="Ваш ИНН"
                    :validation="[['required'], ['matches', /^(\d{10}|\d{12})$/]]"
                    :validationMessages="{
                        required: 'Пожалуйста, укажите ИНН вашей организации: 10 цифр для юридических лиц и 12 цифр для ИП',
                        matches: 'Пожалуйста, укажите ИНН вашей организации: 10 цифр для юридических лиц и 12 цифр для ИП',
                    }"
                    :maska="{ mask: '##########00', tokens: '0:[0-9]:optional' }"
                    outerClass="field--required"
                /> 
                <button
                    type="submit"
                    :disabled="loading"
                    class="button button-outline-green"
                >
                    Проверить
                </button>
            </div>
        </div>
    </FormKit>
</template>
<script>
    import { geo as geoApi } from "@/services";

    export default {
        props: {
            loading: {
                type: Boolean,
                default() { return false; }
            },
        },
        /*
        watch: {
            'formValues.inn': {
                handler() {
                    if (this.formValues.inn === '') {
                        this.$emit('clearSearchResult');
                    }
                },
            },
        },
        */
        computed: {
            user() {
                return this.$store.state.user;
            },
        },     
        data() {
            return {
                formData: {},
            }
        },
        created() {
            this.formData = {
                country: this.user.country
            };
        },
        methods: {
            async getCountries() {
                return await geoApi.getCountries()
                    .then(countries => {
                        if (countries) {
                            let options = countries.map( country => {
                                return { 
                                    label: country.name, 
                                    value: country.id,
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
            submitHandler(data, node) {
                console.log(data);
                this.$emit('submitHandler', data);
            },
        }
    };
</script>
