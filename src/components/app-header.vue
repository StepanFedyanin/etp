<template>
    <div 
        class="header"
        :class="(!$route.meta.requiresAuth && $route.name !== 'home' && !($route.meta.showSidebarAuth && user && user.id)) ? 'm--cabinet' : $route.meta.requiresAuth || ($route.meta.showSidebarAuth && user && user.id) ? 'm--cabinet' : 'm--cabinet'"
    >
        <div class="container m--header">
            <div class="header__content">
                <div class="header__left">
                    <q-no-ssr>
                        <a 
                            v-if="user?.id"
                            href="#"
                            :class="['header__burger', showSidebar && 'is-active']"
                            aria-label="Открыть меню"
                            @click.prevent="onClickBurger"
                        />
                    </q-no-ssr>
                    <div class="header__logo">
                        <router-link
                            :to="{ name: 'home' }"
                            class="header__logo-link"
                            aria-label="На главную страницу"
                        >
                            <img
                                src="@/assets/img/logo.svg"
                                width="240"
                                height="60"
                                alt=""
                                class="header__logo-img"
                            >
                        </router-link>
                    </div>
                    <ul class="header__menu">
                        <li
                            v-for="(item, key) in menu"
                            :key="key"
                            :class="['header__menu-item', item.class]"
                        >
                            <template v-if="item.noSSR">
                                <q-no-ssr>
                                    <router-link
                                        :to="{ name: item.name }"
                                        class="header__menu-link"
                                    >
                                        {{ item.title }}
                                    </router-link>
                                </q-no-ssr>
                            </template>
                            <template v-else>
                                <router-link
                                    :to="{ name: item.name }"
                                    class="header__menu-link"
                                >
                                    {{ item.title }}
                                </router-link>
                            </template>
                        </li>
                    </ul>
                </div>
                <q-no-ssr>
                    <div class="header__right">
                        <template v-if="user?.id">
                            <div 
                                class="header__info"
                                @click.stop="onClickPopup"
                            >
                                <template v-if="user.im_auth_type === 'person'">
                                    <div class="header__info-user">
                                        <span>{{ user.last_name }}</span> 
                                        {{ user.first_name }} {{ user.patronymic }}
                                    </div>
                                </template>
                                <template v-else>
                                    <div 
                                        v-if="user.organization?.name"
                                        class="header__info-organization"
                                    >
                                        {{ user.organization?.name }}
                                    </div>
                                    <div class="header__info-user">{{ user.last_name }} {{ user.first_name ? user.first_name[0] + '.' : '' }} {{ user.patronymic ? user.patronymic[0] + '.' : '' }}</div>
                                </template>
                            </div>
                            <div class="header__right-user">
                                <div 
                                    :class="['header__user', showPopup ? 'is-active' : '', user.photo || user.organization?.logo ? '' : 'm--no-logo']"
                                    @click.stop="onClickPopup"
                                >
                                    <img 
                                        v-if="user.organization?.logo"
                                        :src="`${user.organization?.logo}`" 
                                        :alt="user.organization?.name" 
                                    />
                                    <img 
                                        v-else-if="user.photo"
                                        :src="`${user.photo}`" 
                                        :alt="`${user.last_name} ${user.first_name}`" 
                                    />
                                </div>
                            </div>
                            <div 
                                v-if="showPopup"
                                class="app__overlay" 
                            />
                            <transition name="fade">
                                <div 
                                    v-if="showPopup"
                                    v-on-click-outside.prevent="onClickPopup"
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
                                            v-for="(block, index) in menuUser[user.im_auth_type]"
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
                                                    v-if="showMenuItem(item.condition)"
                                                    :class="['header__popup-menu-item', item.name || item.action ? '' : 'm--title', item.icon ? `m--icon m--${item.icon}` : '']"
                                                    @click="onClickPopupItem"
                                                >
                                                    <a 
                                                        v-if="item.name"
                                                        :href="href"
                                                        :class="['header__popup-menu-link', (isActive && (item.hash === $route.hash || !item.hash)) && 'is-active', (isExactActive && item.hash === $route.hash) && 'is-subactive']"
                                                        @click="navigate"
                                                    >
                                                        {{ item.title }}
                                                    </a>
                                                    <div 
                                                        v-else-if="item.action"
                                                        class="header__popup-menu-link"
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
                        <template v-else>
                            <div v-if="hideHeaderContacts" class="header__right-menu m--desktop">
                                <div
                                    v-for="(item, key) in headerMenuAdv"
                                    :key="key"
                                    class="header__right-menu-item"
                                >
                                    <router-link
                                        :to="{ name: item.name }"
                                        class="header__right-menu-link"
                                    >
                                        {{ item.title }}
                                    </router-link>
                                </div>
                            </div>
                            <div v-else class="header__contacts">
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
                </q-no-ssr>
            </div>
        </div>
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
                        name: 'products',
                        role: 'all',
                        title: 'Товары'
                    }, {
                        name: 'registration',
                        role: 'all',
                        title: 'Регистрация',
                        class: 'm--mobile'
                    }, {
                        name: 'auth',
                        role: 'all',
                        title: 'Вход',
                        class: 'm--mobile'
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
                        name: 'products',
                        role: 'all',
                        title: 'Товары'
                    }, {
                        name: 'cabinet',
                        role: 'all',
                        title: 'Кабинет',
                        noSSR: true
                    }
                ],
                headerMenuAdv: [
                    {
                        name: 'registration',
                        role: 'all',
                        title: 'Регистрация',
                    }, {
                        name: 'auth',
                        role: 'all',
                        title: 'Вход',
                    }
                ],
                hideHeaderContacts: true,
                showPopup: false,
                showPopupHeader: false,
                showPopupFooter: false,
            };
        },
        computed: {
            user() {
                return this.$store.state.user || {};
            },
            menu() {
                return (this.$store.state.user && this.$store.state.user.id) ? this.headerMenuUser : this.headerMenu;
            },
            menuUser() {
                return {
                    person: [
                        [{
                            name: 'cabinet',
                            role: 'all',
                            title: 'Мой кабинет',
                        }], 
                        [{
                            name: null,
                            role: 'all',
                            title: 'Настройки организации',
                        }, {
                            name: 'organization-registration',
                            //hash: '#registration',
                            icon: 'tugan',
                            role: 'all',
                            title: 'Зарегистрировать организацию',
                            condition: 'organization__null'
                        }, {
                            name: 'organization',
                            hash: '#public',
                            role: 'all',
                            title: 'Публичный профиль',
                            condition: 'organization'
                        }, {
                            name: 'organization',
                            hash: '#goods',
                            role: 'all',
                            title: 'Товары',
                            condition: 'organization'
                        }, {
                            name: 'organization',
                            hash: '#persons',
                            role: 'all',
                            title: 'Сотрудники',
                            condition: 'organization'
                        }],
                        [{
                            name: null,
                            role: 'all',
                            title: 'Профиль',
                        }, {
                            name: 'profile',
                            hash: '#account',
                            role: 'all',
                            title: `Аккаунт (${this.$store.state.user?.email})`
                        }, {
                            name: 'profile',
                            hash: '#public',
                            role: 'all',
                            title: 'Публичный профиль'
                        }, {
                            name: 'profile',
                            hash: '#notifications',
                            role: 'all',
                            title: 'Настройка уведомлений',
                        }, {
                            name: null,
                            action: 'onClickExit',
                            role: 'all',
                            title: 'Выход',
                        }]
                    ],
                    organization: [
                        [{
                            name: 'cabinet',
                            role: 'all',
                            title: 'Мой кабинет',
                        }], 
                        [{
                            name: null,
                            role: 'all',
                            title: 'Организация',
                        }, {
                            name: 'organization',
                            hash: '#public',
                            role: 'all',
                            title: 'Публичный профиль'
                        }, {
                            name: 'organization',
                            hash: '#persons',
                            role: 'all',
                            title: 'Сотрудники'
                        }],
                        [{
                            name: null,
                            role: 'all',
                            title: 'Маркет',
                        }, {
                            name: 'market',
                            hash: '#public',
                            role: 'all',
                            title: 'Публичный профиль',
                            condition: 'is_access_product'
                        }, {
                            name: 'market',
                            hash: '#goods',
                            role: 'all',
                            title: 'Товары'
                        }, {
                            name: 'market',
                            hash: '#orders',
                            role: 'all',
                            title: 'Заказы'
                        }],
                        [{
                            name: null,
                            role: 'all',
                            title: 'Профиль',
                        }, {
                            name: 'profile',
                            hash: '#account',
                            role: 'all',
                            title: `Аккаунт (${this.$store.state.user?.email})`
                        }, {
                            name: 'profile',
                            hash: '#public',
                            role: 'all',
                            title: 'Публичный профиль'
                        }, {
                            name: 'profile',
                            hash: '#notifications',
                            role: 'all',
                            title: 'Настройка уведомлений',
                        }, {
                            name: null,
                            action: 'onClickExit',
                            role: 'all',
                            title: 'Выход',
                        }]
                    ],
                };
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
            showMenuItem(condition) {
                if (!condition) return true;
                const cond = condition.split('__');
                if (!cond[1]) {
                    if (this.user[cond[0]]) return true;
                } else {
                    if (cond[1] === 'null') {
                        if (!this.user[cond[0]]) return true;
                    }
                }
                return false;
            },
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
                this[action]();
            },
            onClickExit() {
                this.showPopup = false;
                this.$store.dispatch('deathUser');
                this.$store.dispatch('setStepRegistration', 1);
                this.$router.push({ name: 'auth' });
            },
        }
    };
</script>

<style></style>
