<template>
    <div>
        <FormKit 
            id="profileEdit"
            v-model="formValues"
            name="form-profile-edit"
            preserve
            type="form"
            data-loading="loading"
            :value="formData"
            form-class="$reset profile-edit__form form__edit"
            :actions="false"
            :disabled="loading"
            :loading="loading ? true : undefined"
            @submit="updateUserProfile"
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
        <!-- <FormKit
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
        /> -->
        <!-- validation="matches:/^[0-9]{1}-[0-9]{3}-[0-9]{3}-[0-9]{4}$/" -->
        <!-- <div class="double">
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
            </div> -->
        <!-- </FormKit> -->
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
                    //     $formkit: 'hidden',
                    //     name: 'organization',
                    // }, {
                        $formkit: 'text',
                        name: 'last_name',
                        label: 'Фамилия',
                        validation: 'required',
                        outerClass: 'field--inline field--required'
                    }, {
                        $formkit: 'text',
                        name: 'first_name',
                        label: 'Имя',
                        validation: 'required',
                        outerClass: 'field--inline field--required'
                    }, {
                        $formkit: 'text',
                        name: 'patronymic',
                        label: 'Отчество',
                        // validation: 'required',
                        outerClass: 'field--inline field--required'
                    }, {
                        $formkit: 'text',
                        name: 'post',
                        label: 'Должность',
                        validation: 'required',
                        outerClass: 'field--inline field--required'
                    }, {
                        $formkit: 'email',
                        name: 'contact_email',
                        label: 'Email (контактный)',
                        placeholder: "info@example.ru",
                        //validation: 'required',
                        outerClass: 'field--inline'
                    }, {
                        $formkit: 'text',
                        name: 'phone',
                        label: 'Телефон (контактный)',
                        outerClass: 'field--inline',
                        placeholder: "x-xxx-xxx-xxxx",
                        // :validation-messages: "{
                        //     matches: 'Телефон должен быть в формате x-xxx-xxx-xxxx',
                        // }",
                        // validation-visibility: "dirty"
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
            updateUserProfile(formData, node) {
                api.updateProfile(formData).then(res => {
                    console.log(res);
                }).catch(err => {
                    node.setErrors(
                        [err.detail],
                    );
                    this.$store.dispatch('showError', err);
                    console.error(err);
                });
                this.$router.go(-1);
            },

        },
    }
</script>