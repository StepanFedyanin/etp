<template>
    <div class="header">
        <div class="container">
            <div class="header__content">
                <div class="header__left">
                    <div class="header__logo">
                        <router-link
                            :to="''"
                            class="header__logo-link"
                        >
                            <img
                                src="@/assets/img/logo.svg"
                                alt=""
                                class="header__logo-img"
                            >
                        </router-link>
                    </div>
                    <div class="header__contacts">
                        <a
                            :href="phone"
                            class="header__contacts-phone"
                        >{{ phone }}</a>
                        <a
                            :href="`mailto:${email}`"
                            class="header__contacts-email"
                        >{{ email }}</a>
                    </div>
                </div>
                <div class="header__right">
                    <ul class="header__menu">
                        <li
                            v-for="(item, key) in menu"
                            :key="key"
                            class="header__menu-item"
                        >
                            <router-link
                                :to="item.link"
                                class="header__menu-link"
                                v-text="item.name"
                            />
                        </li>
                    </ul>
                    <router-link
                        :to="''"
                        class="header__login"
                    >
                        Войти
                    </router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Header",
        data() {
            return {
                phone: '8 (800) 123-45-67',
                email: 'info@tugan.ru',
                menu: [
                    {
                        name: 'торги',
                        link: ''
                    },
                    {
                        name: 'Товарные группы',
                        link: ''
                    },
                    {
                        name: 'О площадке',
                        link: ''
                    },
                    {
                        name: 'Регистрация',
                        link: ''
                    },
                ]
            }
        }
    }
</script>

<style>

</style>