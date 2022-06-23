<template>
    <div>
        <FormKit 
            id="profileEdit"
            type="form" 
            :value="formData"
            form-class="$reset profile-edit__form form__edit"
            :actions="false"
            @submit="updateUserProfile"
        >
            <!-- data-loading="showLoaderSending"
            :loading="showLoaderSending ? true : undefined" -->
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
                    outer-class="form__button"
                    :input-class="{
                        'button': true,
                        'button-red': true
                    }"
                    @click="onClickCancel"
                />
                <FormKit
                    type="submit"
                    label="Сохранить"
                    outer-class="form__button"
                    :input-class="{
                        'button': true,
                        'button-green': true
                    }"
                />
                <!-- data-loading="showLoaderSending"
                :disabled="showLoaderSending"
                :loading="showLoaderSending ? true : undefined" -->
                <!-- :disabled="loading || !isValid" -->
            </div>
        </FormKit>
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
                // showLoaderSending: false,
            }
        },

        created() {
            this.formData = this.item
        },
        methods: {

            onClickCancel() {
                this.$router.go(-1);
            },
            updateUserProfile(formData, node) {
                api.updateMyProfile(formData).then(res => {
                    console.log(res);
                    // this.showLoaderSending = false;
                }).catch(err => {
                    node.setErrors(
                        [err.detail],
                    );
                    // this.showLoaderSending = false;
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