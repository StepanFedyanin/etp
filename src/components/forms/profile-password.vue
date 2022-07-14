<template>
    <div>
        <!-- <FormKit 
            id="profileEditPassword"
            type="form" 
            :value="formData"
            form-class="$reset profile-edit__form form__edit"
            :actions="false"
            @submit="updatePassword"
        >
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
        </FormKit> -->
        <FormKit 
            id="profileEditPassword"
            v-model="formValues"
            name="form-profile-password"
            preserve
            type="form"
            data-loading="loading"
            :value="formData"
            form-class="$reset profile-edit__form form__edit"
            :actions="false"
            :disabled="loading"
            :loading="loading ? true : undefined"
            @submit="updatePassword"
        >
            <div class="form__block">
                <FormKitSchema 
                    :schema="schema" 
                />
            </div>
            <div   
                class="form__submit form__button" 
                data-type="submit"
            >
                <button
                    type="button"
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
    </div>
</template>

<script>
    import { user as api } from "@/services";

    export default {
        name: 'ProfileEdit',
        props: {
            loading: {
                type: Boolean,
                default() { return false; }
            },
            item: {
                type: Object,
                default() { return {} }
            },
        },
        data() {
            return {
                formData: undefined,
                // showLoaderSending: false,
                formValues: this.formData,
                schema: [
                    {
                        $formkit: 'password',
                        name: 'password',
                        label: 'Старый Пароль',
                        placeholder: "Введите пароль",
                        validation: 'required',
                        outerClass: 'field--inline field--required'
                    }, {
                        $formkit: 'password',
                        name: 'password_new',
                        label: 'Новый Пароль',
                        placeholder: "Введите пароль",
                        validation: 'required',
                        outerClass: 'field--inline field--required'
                    }, {
                        $formkit: 'password',
                        name: 'password_confirm',
                        label: 'Повтор пароля',
                        placeholder: "Введите пароль",
                        validation: 'required|confirm',
                        outerClass: 'field--inline field--required'
                    }
                ],
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