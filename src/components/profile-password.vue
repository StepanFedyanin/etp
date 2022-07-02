<template>
    <div>
        <FormKit 
            id="profileEdit"
            type="form" 
            :value="formData"
            form-class="$reset profile-edit__form form__edit"
            :actions="false"
            @submit="updatePassword"
        >
            <!-- data-loading="showLoaderSending"
            :loading="showLoaderSending ? true : undefined" -->
            <FormKit
                type="password"
                name="password"
                label="Старый пароль*"
                validation="required:trim|length:5"
                :validation-messages="{
                    length: 'Минимальная длинна пароля 5 символов',
                }"
                placeholder="Введите пароль"
                outerClass="field--inline"
            />
            <FormKit
                type="password"
                name="password_new"
                label="Новый пароль*"
                validation="required:trim|length:5"
                :validation-messages="{
                    length: 'Минимальная длинна пароля 5 символов',
                }"
                placeholder="Введите пароль"
                outerClass="field--inline"
            />
            <FormKit
                type="password"
                name="password_confirm"
                label="Повтор пароля*"
                validation="required:trim|length:5"
                :validation-messages="{
                    length: 'Минимальная длинна пароля 5 символов',
                }"
                placeholder="Введите пароль"
                outerClass="field--inline"
            />
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
            updatePassword(formData, node) {
                api.updatePassword(formData).then(res => {
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
                this.$router.go(-1);                
            },

        },
    }
</script>