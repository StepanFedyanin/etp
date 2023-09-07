<template>
    <div 
        class="header"
        :class="(!$route.meta.requiresAuth && $route.name !== 'home' && !($route.meta.showSidebarAuth && user && user.id)) ? 'm--cabinet' : $route.meta.requiresAuth || ($route.meta.showSidebarAuth && user && user.id) ? 'm--cabinet' : 'm--cabinet'"
    >
        <div class="container m--header">
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
                    <ul class="header__menu">
                        <li
                            v-for="(item, key) in menu"
                            :key="key"
                            class="header__menu-item"
                        >
                            <router-link
                                :to="{ name: item.name }"
                                class="header__menu-link"
                            >
                                {{ item.title }}
                            </router-link>
                        </li>
                    </ul>
                </div>
                <div class="header__right">
                    <!--div class="header__contacts">
                        <a
                            :href="$helpers.formatTel(phone)"
                            class="header__contacts-phone"
                        >{{ phone }}</a>
                        <a
                            :href="`mailto:${email}`"
                            class="header__contacts-email"
                        >{{ email }}</a>
                    </div-->
                    <!--div 
                        v-if="user && user.id"
                        class="header__timer"
                    >
                        <div class="header__timer-time">
                            {{ `${currentTime} МСК` }}
                        </div>
                        <div class="header__timer-date">
                            {{ currentDate }}
                        </div>
                    </div-->
                    <template
                        v-if="user && user.id"
                    >
                        <div 
                            class="header__info"
                            @click.stop="onClickPopup"
                        >
                            <div 
                                v-if="user.organization.name"
                                class="header__info-organization"
                            >
                                {{ user.organization.name }}
                            </div>
                            <div class="header__info-user">{{ user.last_name }} {{ user.first_name ? user.first_name[0] + '.' : '' }} {{ user.patronymic ? user.patronymic[0] + '.' : '' }}</div>
                        </div>
                        <div 
                            :class="['header__user', showPopup ? 'is-active' : '', user.organization?.logo ? '' : 'm--no-logo']"
                            @click.stop="onClickPopup"
                        >
                            <img 
                                v-if="user.organization?.logo"
                                :src="`http://tugan.flexidev.ru/${user.organization?.logo}`" 
                                :alt="user.organization.name" 
                            />
                        </div>
                        <div 
                            v-if="showPopup"
                            class="app__overlay" 
                        />
                        <transition name="fade">
                            <div 
                                v-if="showPopup"
                                v-click-out.prevent="onClickPopup"
                                class="header__popup"
                            >
                                <div 
                                    v-if="showPopupHeader"
                                    class="header__popup-title"
                                >
                                    {{ user.last_name }} {{ user.first_name ? user.first_name[0] + '.' : '' }} {{ user.patronymic ? user.patronymic[0] + '.' : '' }}
                                    <a 
                                        href="#" 
                                        class="header__popup-close"
                                        @click.stop="onClickPopup"
                                    />
                                </div>
                                <div class="header__popup-body">
                                    <div 
                                        v-for="(block, index) in menuUser"
                                        :key="`block-${index}`"
                                        class="header__popup-menu"
                                    >
                                        <router-link
                                            v-for="(item, key) in block"
                                            v-slot="{ href, navigate, isActive, isExactActive }"
                                            :key="`block-${index}-${key}`"
                                            :to="{ name: item.name, hash: item.hash }"
                                            custom
                                        >
                                            <div 
                                                :class="['header__popup-menu-item', item.name || item.action ? '' : 'm--title']"
                                                @click="onClickPopupItem"
                                            >
                                                <a 
                                                    v-if="item.name"
                                                    :href="href"
                                                    :class="['header__popup-menu-link', (isActive && item.hash === $route.hash) && 'is-active', (isExactActive && item.hash === $route.hash) && 'is-subactive']"
                                                    @click="navigate"
                                                >
                                                    {{ item.title }}
                                                </a>
                                                <div 
                                                    v-else-if="item.action"
                                                    @click="onClickAction(item.action)"
                                                >
                                                    {{ item.title }}
                                                </div>
                                                <div v-else>
                                                    {{ item.title }}
                                                </div>
                                            </div>
                                        </router-link>
                                    </div>
                                </div>
                                <div 
                                    v-if="showPopupFooter"
                                    class="header__popup-footer"
                                >
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
                        <div class="header__contacts">
                            <a
                                :href="$helpers.formatTel(phone)"
                                class="header__contacts-link m--phone"
                            >{{ phone }}</a>
                            <a
                                :href="`mailto:${email}`"
                                class="header__contacts-link m--mail"
                            >{{ email }}</a>
                        </div>
                    </template>
                </div>
            </div>
        </div>
        <!--div 
            v-if="$route.meta.showSubHeader && !($route.meta.showSidebarAuth && user && user.id)"
            class="header__sub"
        >
            <div class="container">
                <div class="header__breadcrumbs">
                    <router-link
                        :to="{ name: 'home' }"
                        class=""
                    >
                        Главная
                    </router-link>
                </div>
                <div class="header__title h1">
                    {{ $route.meta.name || $route.meta.title }} {{ $route.name === 'registration' ? $store.state.stepRegistration || 1 : '' }}
                </div>
            </div>
        </div-->
    </div>
</template>

<script>
    export default {
        name: 'AppHeader',
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
                headerMenu: [
                    {
                        name: 'tenders',
                        role: 'all',
                        title: 'Тендеры'
                    }, {
                        name: 'contragents',
                        role: 'all',
                        title: 'Организации'
                    }, {
                        name: 'groups',
                        role: 'all',
                        title: 'Товары'
                    }, {
                        name: 'registration',
                        role: 'all',
                        title: 'Регистрация',
                    }, {
                        name: 'auth',
                        role: 'all',
                        title: 'Вход',
                    }
                ],
                headerMenuUser: [
                    {
                        name: 'tenders',
                        role: 'all',
                        title: 'Тендеры'
                    }, {
                        name: 'contragents',
                        role: 'all',
                        title: 'Организации'
                    }, {
                        name: 'groups',
                        role: 'all',
                        title: 'Товары'
                    }, {
                        name: 'cabinet',
                        role: 'all',
                        title: 'Кабинет',
                    }
                ],
                menuUser: [
                    [{
                        name: null,
                        role: 'all',
                        title: 'Настройки организации',
                    }, {
                        name: 'organization',
                        hash: '#public',
                        role: 'all',
                        title: 'Публичный профиль'
                    }, {
                        name: 'organization',
                        hash: '#goods',
                        role: 'all',
                        title: 'Товары'
                    }, {
                        name: 'organization',
                        hash: '#persons',
                        role: 'all',
                        title: 'Сотрудники'
                    }],
                    [{
                        name: 'profile',
                        hash: '',
                        role: 'all',
                        title: 'Мой профиль'
                    }, {
                        name: 'notifications-settings',
                        hash: '',
                        role: 'all',
                        title: 'Настройка уведомлений',
                    }, {
                        name: null,
                        action: 'onClickExit',
                        role: 'all',
                        title: 'Выход',
                    }]
                ],
                showPopup: false,
                showPopupHeader: false,
                showPopupFooter: false,
            };
        },
        computed: {
            user() {
                return this.$store.state.user;
            },
            menu() {
                return (this.$store.state.user && this.$store.state.user.id) ? this.headerMenuUser : this.headerMenu;
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
            onClickAction(action) {
                this[action];
            },
            onClickExit() {
                this.showPopup = false;
                this.$store.dispatch('deathUser');
                this.$store.dispatch('setStepRegistration', 1);
                this.$route.go();
            },
        }
    };
</script>

<style></style>
