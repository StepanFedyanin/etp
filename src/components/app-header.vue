<template>
    <div 
        class="header"
        :class="(!$route.meta.requiresAuth && $route.name !== 'home' && !($route.meta.showSidebarAuth && user && user.id)) ? 'm--seconds' : $route.meta.requiresAuth || ($route.meta.showSidebarAuth && user && user.id) ? 'm--cabinet' : ''"
    >
        <div class="container">
            <div class="header__content">
                <div class="header__left">
                    <a 
                        href="#"
                        class="header__burger"
                        :class="showSidebar ? 'is-active' : ''"
                        @click.stop="onClickBurger"
                    />

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
                </div>
                <div class="header__right">
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
                    <div class="header__timer">
                        <div class="header__timer-time">
                            {{ `${currentTime} МСК` }}
                        </div>
                        <div class="header__timer-date">
                            {{ currentDate }}
                        </div>
                    </div>
                    <template
                        v-if="user && user.id"
                    >
                        <a 
                            href="#"
                            class="header__user"
                            :class="showPopup ? 'is-active' : ''"
                            @click.stop="onClickPopup"
                        />
                        <div 
                            v-if="showPopup"
                            class="app__overlay" 
                        />
                        <transition name="fade">
                            <div 
                                v-if="showPopup"
                                class="header__popup"
                                v-click-out="onClickPopup"
                            >
                                <div class="header__popup-title">
                                    {{ user.last_name }} {{ user.first_name ? user.first_name[0] + '.' : '' }} {{ user.patronymic ? user.patronymic[0] + '.' : '' }}
                                    <a 
                                        href="#" 
                                        class="header__popup-close"
                                        @click.stop="onClickPopup"
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
                                        @click.stop="onClickExit"
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
            v-if="!$route.meta.requiresAuth && $route.name !== 'home' && $route.name !== 'page404' && !($route.meta.showSidebarAuth && user && user.id)"
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
    import { headerMenu, headerMenuUser } from '@/settings';

    export default {
        name: 'Header',
        props: {
            showSidebar: {
                type: Boolean,
                default() { return false; }
            },
        },
        data() {
            return {
                phone: '+7 (343) 344-83-83',
                email: 'info@etptugan.ru',
                timer: null,
                currentDate: null,
                currentTime: null,
                menuUser: [
                    {
                        name: 'profile',
                        role: 'all',
                        title: 'Мой профиль'
                    }, {
                        name: 'organization',
                        role: 'all',
                        title: 'Моя организация',
                    }, {
                        name: 'notifications-settings',
                        role: 'all',
                        title: 'Настройка уведомлений',
                    }
                ],
                showPopup: false,
            };
        },
        computed: {
            user() {
                return this.$store.state.user;
            },
            menu() {
                return (this.$store.state.user && this.$store.state.user.id) ? headerMenuUser : headerMenu;
            }
        },
        mounted() {
            this.timer = setInterval(() => {
                let date = new Date();
                this.currentTime = date.toLocaleTimeString('ru', { timeZone: 'Europe/Moscow', hour: '2-digit', minute:'2-digit' });
                this.currentDate = date.toLocaleDateString('ru', { timeZone: 'Europe/Moscow' });
            }, 1000);
        },
        destroyed() {
            clearTimeout(this.timer);
        },
        methods: {
            onClickPopup() {
                this.showPopup = !this.showPopup;
            },
            onClickBurger() {
                this.$emit('showSidebar', !this.showSidebar);
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
