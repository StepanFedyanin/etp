<template>
    <div>
        <FormKit 
            id="profileEdit"
            type="form" 
            :value="formData"
            form-class="$reset profile-edit__form"
            :actions="false"
            data-loading="showLoaderSending"
            :loading="showLoaderSending ? true : undefined"
            @submit="updateUserProfile"
        >
            <FormKit
                type="text"
                label="Фамилия*"
                name="last_name"
                placeholder="Петров"
                validation="required:trim"
                autocomplete="off"
            />
            <FormKit
                type="text"
                label="Имя*"
                name="first_name"
                placeholder="Иван"
                validation="required:trim"
                autocomplete="off"
            />
            <FormKit
                type="text"
                label="Отчество"
                name="patronymic"
                placeholder="Васильевич"
                
                autocomplete="off"
            />
            <FormKit
                type="text"
                label="Должность"
                name="post"
                placeholder="Директор"
                autocomplete="off"
            />
            <FormKit
                type="text"
                label="Email (контактный)"
                name="contact_email"
                placeholder="info@example.ru"
                validation="email"
                autocomplete="off"
            />
            <FormKit
                type="tel"
                label="Телефон (контактный)"
                name="phone"
                placeholder="x-xxx-xxx-xxxx"

                :validation-messages="{
                    matches: 'Телефон должен быть в формате x-xxx-xxx-xxxx',
                }"
                validation-visibility="dirty"
            />
            <!-- validation="matches:/^[0-9]{1}-[0-9]{3}-[0-9]{3}-[0-9]{4}$/" -->
            <div class="double">
                <FormKit
                    type="button"
                    label="Отменить"
                    outer-class="profile-edit__button"
                    :input-class="{
                        'button': true,
                        'button-red': true
                    }"
                    @click="onClickCancel"
                />
                <FormKit
                    type="submit"
                    label="Сохранить"
                    outer-class="profile-edit__button"
                    :input-class="{
                        'button': true,
                        'button-green': true
                    }"
                    data-loading="showLoaderSending"
                    :disabled="showLoaderSending"
                    :loading="showLoaderSending ? true : undefined"
                />
                <!-- :disabled="loading || !isValid" -->
            </div>
        </FormKit>
        <!-- <div v-if="submitted">
            <h2>Submission successful!</h2>
        </div> -->
        <!-- <pre wrap>{{ formData }}</pre> -->
    </div>
</template>

<script>
    import { user as api } from "@/services";

    export default {
        name: 'ProfileEdit',
        props: {
            item: {
                type: Object,
                default() { return {} }
            },
        },
        data() {
            return {
                formData: undefined,
                showLoaderSending: false,
            }
        },

        created() {
            this.formData = this.item
        },
        methods: {

            onClickCancel() {
                this.$router.push({ name: 'profile'});
            },
            // submitForm() {
            //     this.$formkit.submit('profileEdit');
            // },
            updateUserProfile(formData, node) {
                console.log(formData);
                api.updateMyProfile(formData).then(res => {
                    console.log(res);
                    this.showLoaderSending = false;
                    this.$router.push({ name: 'profile'});
                }).catch(err => {
                    node.setErrors(
                        [err.detail],
                    );
                    this.showLoaderSending = false;
                    this.$store.dispatch('showError', err);
                    console.error(err);
                    // this.$store.dispatch('showError', err);
                    // console.error(err);
                });
                // alert(`Submitted ${formData.last_name} successfully!`)
                
            },

        },
    }
</script>