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
    </FormKit>
</template>
<script>
    export default {
        data() {
            return {
                formData: {
                    username: 'b@dExampleUsername',
                    password: 'test_password',
                    password_confirm: 'tst_password',
                    phone: undefined,
                    twitter_handle: 'forgotTheAt',
                },
            }
        },
        methods: {
            async submit() {
                return new Promise((r) => setTimeout(r, 2000))
                // alert('submitted successfully!')
            },
        },
    }
</script>