<template>
    <div class="app__main">
        <div class="cabinet">
            <div class="registration m--block">
                <div class="container">
                    <div class="registration__title h2">
                        Сведения о пользователе
                    </div>
                    <div class="add-person">
                        <regPersonForm 
                            :loading="showLoaderSending"
                            :formData="regData.person"
                            @prevStep="prevStep"
                            @submitPersonHandler="submitHandler"
                        />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { user as api } from "@/services";
    import regPersonForm from '@/components/forms/reg-person-form';

    export default {
        components: {
            regPersonForm,
        },
        data() {
            return {
                showLoaderSending: false,
                regData: { search: {}, organization: {}, person: {} },
                person: {}
            }
        },
        created() {
            api.getUser().then(res => {
                this.profile = res;
                if (res.organization?.id) {
                    this.regData.person.organization = res.organization.id;
                    console.log(res.organization);
                }
                console.log(this.regData.person);
            }).catch(err => {
                console.error(err);
            });
        },
        methods: {
            submitHandler(data, node) {
                this.showLoaderSending = true;
                let params = Object.assign({}, this.regData.person);
                api.addProfile(params).then(res => {
                    console.log(res);
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
                    this.$store.dispatch('showError', err);
                    console.error(err);
                });
                this.$router.go(-1);
            },
            prevStep() {
                this.$router.go(-1);
            },
        }
    }
</script>