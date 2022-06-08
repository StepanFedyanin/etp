<template>
    <FormKit 
        :value="formData" 
        type="form" 
        @submit="submit"
    >
        <FormKit
            type="text"
            label="Email (Логин)*"
            name="login"
            placeholder="info@example.ru"
            validation="required|email"
            autocomplete="off"
        />
        <FormKit
            type="password"
            name="password"
            label="Пароль*"
            validation="required"
        />
        <FormKit
            type="password"
            name="password_confirm"
            label="Повтор пароля*"
            validation="required|confirm"
            validation-label="Password confirmation"
        />
        <FormKit
            type="text"
            label="Фамилия*"
            name="last_name"
            placeholder="Петров"
            validation="required|length:2,15|alphanumeric"
            autocomplete="off"
        />
        <FormKit
            type="text"
            label="Имя*"
            name="first_name"
            placeholder="Иван"
            validation="required|length:2,15|alphanumeric"
            autocomplete="off"
        />
        <FormKit
            type="text"
            label="Отчество"
            name="patronymic"
            placeholder="Васильевич"
            validation="length:2,15|alphanumeric"
            autocomplete="off"
        />
        <FormKit
            type="text"
            label="Должность"
            name="post"
            placeholder="Директор"
            validation="length:2,15|alphanumeric"
            autocomplete="off"
        />
        <FormKit
            type="text"
            label="Email (контактный)"
            name="email"
            placeholder="info@example.ru"
            validation="email"
            autocomplete="off"
        />
        <FormKit
            type="text"
            label="Телефон (контактный)"
            name="phone"
            placeholder="x-xxx-xxx-xxxx"
            validation="['matches', /^\d{3}-\d{3}-\d{4}$/]"
            :validation-messages="{matches: 'Phone number must be formatted: x-xxx-xxx-xxxx',}"
            validation-visibility="dirty"
            autocomplete="off"
        />
        <FormKit
            type="button"
            class="button button-red"
            @click="onClickCancel"
        >
            Отменить
        </FormKit>
        <!-- <FormKit
            type="button"
            help="You can bind event listeners."
            class="button button-green"
            @click="onClickUpdateUser"
        >
            Сохранить
        </FormKit> -->
    </FormKit>
</template>
<script>
    import { user as api } from "@/services";

    export default {
        data() {
            return {
                formData: {
                    username: 'b@dExampleUsername',
                    password: 'test_password',
                    password_confirm: 'tst_password',
                    phone: undefined,
                },
            }
        },
        created(){
            api.getMyProfile().then(res => {
                console.log(res);
                this.profile = res
            }).catch(err => {
                // this.showLoaderSending = false;
                // this.$store.dispatch('showError', err);
                console.error(err);
            });
            console.log(this.formData);
        },
        methods: {
            async submit() {
                return new Promise((r) => setTimeout(r, 2000))
                // alert('submitted successfully!')
            },
            onClickCancel() {
                this.$router.push({ name: 'profile'});
            }
            // onClickUpdateUser(){}
        },
    }
</script>