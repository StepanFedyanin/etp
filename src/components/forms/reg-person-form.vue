<template>
    <div class="profile__user">
        <FormKit
            v-model="formValues"
            name="form-person"
            preserve
            type="form"
            autocomplete="off"
            data-loading="lading"
            form-class="$reset profile__form form"
            :actions="false"
            :disabled="loading"
            :loading="loading ? true : undefined"
            @submit="submitHandler"
        >
            <div class="form profile__form-block">
                <div class="profile__form-main">
                    <FormKitSchema 
                        :schema="schema" 
                    />
                </div>
            </div>
            <div   
                class="form__submit profile__form-submit" 
                data-type="submit"
            >
                <button
                    :disabled="busyForm"
                    class="button button-red"
                    @click="backHandler"
                >
                    Назад
                </button>
                <button
                    type="submit"
                    :disabled="busyForm"
                    class="button button-green"
                >
                    Далее
                </button>
            </div> 
        </FormKit>                  
    </div>
</template>
<script>
    export default {
        props: {
            loading: {
                type: Boolean,
                default() { return false; }
            },
            formData: {
                type: Object,
                default() { return {}; }
            },
        },
        data() {
            return {
                formValues: this.formData,
                schema: [
                    {
                        $formkit: 'hidden',
                        name: 'organization',
                    }, {
                        $formkit: 'email',
                        name: 'email',
                        label: 'Email (Логин)',
                        validation: 'required',
                        outerClass: 'field--required'
                    }, {
                        $formkit: 'password',
                        name: 'password',
                        label: 'Пароль',
                        validation: 'required',
                        outerClass: 'field--required'
                    }, {
                        $formkit: 'password',
                        name: 'password_confirm',
                        label: 'Повтор пароля',
                        validation: 'required|confirm',
                        outerClass: 'field--required'
                    }, {
                        $formkit: 'text',
                        name: 'last_name',
                        label: 'Фамилия',
                        validation: 'required',
                        outerClass: 'field--required'
                    }, {
                        $formkit: 'text',
                        name: 'first_name',
                        label: 'Имя',
                        validation: 'required',
                        outerClass: 'field--required'
                    }, {
                        $formkit: 'text',
                        name: 'patronymic',
                        label: 'Отчество',
                        validation: 'required',
                        outerClass: 'field--required'
                    }, {
                        $formkit: 'text',
                        name: 'post',
                        label: 'Должность',
                        validation: 'required',
                        outerClass: 'field--required'
                    }, {
                        $formkit: 'email',
                        name: 'contact_email',
                        label: 'Email (контактный)',
                        //validation: 'required',
                    }, {
                        $formkit: 'text',
                        name: 'phone',
                        label: 'Телефон (контактный)',
                        placeholder: "x-xxx-xxx-xxxx",
                        validation: 'required',
                        validationVisibility: 'dirty',
                        outerClass: 'field--required'
                    }
                ],
            }
        },
        methods: {
            backHandler(data, node) {
                this.$emit('prevStep');
            },
            submitHandler(data, node) {
                this.$emit('submitPersonHandler', this.formValues, node);
            },
        }
    };
</script>
