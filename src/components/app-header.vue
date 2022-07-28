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
                            :to="{ name: user && user.id ? 'cabinet' : 'home' }"
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
                        v-if="user && user.id"
                    >
                        <a 
                            href="#"
                            class="header__user"
                            :class="showPopup ? 'is-active' : ''"
                            @click="onClickPopup"
                        />
                        <div 
                            v-if="showPopup"
                            class="app__overlay" 
                        />
                        <transition name="fade">
                            <div 
                                v-if="showPopup"
                                class="header__popup"
                            >
                                <div class="header__popup-title">
                                    {{ user.last_name }} {{ user.first_name ? user.first_name[0] + '.' : '' }} {{ user.patronymic ? user.patronymic[0] + '.' : '' }}
                                    <a 
                                        href="#" 
                                        class="header__popup-close"
                                        @click="onClickPopup"
                                    />
                                </div>
                                <div class="header__popup-body">
                                    <div class="header__popup-menu">
                                        <router-link
                                            v-for="(item, key) in menuUser"
                                            v-slot="{ href, navigate, isActive, isExactActive }"
                                            :key="key"
                                            :to="{ name: item.name }"
                                            custom
                                        >
                                            <div 
                                                class="header__popup-menu-item"
                                                @click="onClickPopupItem"
                                            >
                                                <a 
                                                    :href="href"
                                                    :class="[isActive && 'is-active', isExactActive && 'is-subactive']"
                                                    class="header__popup-menu-link"
                                                    @click="navigate"
                                                >
                                                    {{ item.title }}
                                                </a>
                                            </div>
                                        </router-link>
                                    </div>
                                </div>
                                <div class="header__popup-footer">
                                    <a 
                                        href="#"
                                        class="button button-outline-red"
                                        @click="onClickExit"
                                    >
                                        Выйти
                                    </a>
                                </div>
                            </div>                            
                        </transition>
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
                        href="/"
                        class="header__breadcrumbs-link"
                    >Главная страница</a>
                </div>
                <div class="header__title h1">
                    {{ $route.meta.title }} {{ $route.name === 'registration' ? $store.state.stepRegistration || 1 : '' }}
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { headerMenu, headerMenuUser, userMenu } from '@/settings';

    export default {
        name: 'Header',
        data() {
            return {
                phone: '8 (800) 123-45-67',
                email: 'info@tugan.ru',
                menuUser: userMenu,
                showPopup: false
            };
        },
        computed: {
            user() {
                return this.$store.state.user;
            },
            menu() {
                return (this.$store.state.user) ? headerMenuUser : headerMenu;
            }
        },
        methods: {
            onClickPopup() {
                this.showPopup = !this.showPopup;
            },
            onClickPopupItem() {
                this.showPopup = false;
            },
            onClickExit() {
                this.showPopup = false;
                this.$store.dispatch('deathUser');
                this.$store.dispatch('setStepRegistration', 1);
            },
        }
    };
</script>

<style></style>
