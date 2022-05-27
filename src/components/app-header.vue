<template>
    <div 
        class="header"
        :class="(!$route.meta.requiresAuth && $route.name !== 'home') ? 'm--seconds' : $route.meta.requiresAuth ? 'm--cabinet' : ''"
    >
        <div class="container">
            <div class="header__content">
                <div class="header__left">
                    <div class="header__logo">
                        <router-link
                            :to="{ name: 'home' }"
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
                            :href="$helpers.formatTel(phone)"
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
                                :to="{ name: item.name }"
                                class="header__menu-link"
                                v-text="item.title"
                            />
                        </li>
                    </ul>
                    <template
                        v-if="user"
                    >
                        <router-link
                            :to="{ name: 'cabinet' }"
                            class="header__user"
                        />
                    </template>
                    <template
                        v-else
                    >
                        <router-link
                            :to="{ name: 'auth' }"
                            class="button header__login"
                        >
                            Войти
                        </router-link>
                    </template>
                </div>
            </div>
        </div>
        <div 
            v-if="!$route.meta.requiresAuth && $route.name !== 'home'"
            class="header__sub"
        >
            <div class="container">
                <div class="header__breadcrumbs">
                    <a
                        href="#"
                        class="header__breadcrumbs-link"
                    >Главная страница</a>
                </div>
                <div class="header__title h1">
                    {{ $route.meta.title }}
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { headerMenu } from '@/settings';

    export default {
        name: 'Header',
        data() {
            return {
                phone: '8 (800) 123-45-67',
                email: 'info@tugan.ru',
                menu: headerMenu,
            };
        },
        computed: {
            user() {
                return this.$store.state.user;
            }
        },
    };
</script>

<style></style>
