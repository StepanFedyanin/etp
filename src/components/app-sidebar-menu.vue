<template>
    <div class="sidebar__menu">
        <template
            v-for="(item, key) in menu[typeMenu]"
        >
            <template
                v-if="item.name === 'devider'"
            >
                <div 
                    :key="key"
                    class="sidebar__menu-devider" 
                />
            </template>
            <template
                v-else
            >
                <router-link
                    v-if="(!item.access && !item.forbiden && !item.condition) || ((item.access && user[item.access]) || (item.forbiden && !user[item.forbiden]) || (item.condition && showMenuItem(item.condition)))"
                    :key="key"
                    v-slot="{ href, isActive, isExactActive }"
                    :to="{ name: item.name }"
                    custom
                >
                    <div 
                        v-if="item.titlePfx"
                        class="sidebar__menu-title"
                    >
                        {{ item.titlePfx }}
                    </div>
                    <div 
                        :class="menuOpenedItems[item.name] ? 'is-opened' : ''"
                        class="sidebar__menu-item"
                    >
                        <a 
                            :href="href"
                            :class="[isActive && 'is-active', `m--icon-${item.icon}`]"
                            class="sidebar__menu-link"
                            @click.prevent="onClickMenuItem(item)"
                        >
                            {{ item.title }}
                            <template
                                v-if="item.name === 'chat' && roomUnreadCount"
                            >
                                <div class="sidebar__menu-count">{{ roomUnreadCount }}</div>
                            </template>
                            <template
                                v-if="item.name === 'notifications' && notificationsCount"
                            >
                                <div class="sidebar__menu-count">{{ notificationsCount }}</div>
                            </template>
                            <div
                                v-if="item.items"
                                class="sidebar__menu-item-arrow"
                            />
                        </a>
                        <template
                            v-if="item.items"
                        >
                            <transition name="fade">
                                <div 
                                    v-if="menuOpened(item.name, isActive)"
                                    class="sidebar__menu-item-block"
                                >
                                    <template
                                        v-for="(sitem, skey) in item.items"
                                        :key="`sitem-${sitem.name}`"
                                    >
                                        <template v-if="sitem.dynamic">
                                            <Promised :promise="sitem.items()">
                                                <!-- Use the "pending" slot to display a loading message -->
                                                <template v-slot:pending>
                                                </template>
                                                <!-- The default scoped slot will be used as the result -->
                                                <template v-slot="data">
                                                    <router-link
                                                        v-for="group in data"
                                                        :key="`ditem-${group.slug}`"
                                                        v-slot="{ href, navigate, isActive }"
                                                        :to="{ name: sitem.name, params: { slug: group.slug } }"
                                                        custom
                                                    >
                                                        <div class="sidebar__menu-subitem">
                                                            <a 
                                                                :href="href"
                                                                :class="['sidebar__menu-sublink', isActive && 'is-active']"
                                                                @click="navigate"
                                                            >
                                                                {{ group.name }}
                                                            </a>
                                                        </div>
                                                    </router-link>
                                                </template>
                                                <!-- The "rejected" scoped slot will be used if there is an error -->
                                                <template v-slot:rejected="error">
                                                    <div class="sidebar__menu-subitem">Error: {{ error.message }}</div>
                                                </template>
                                            </Promised>
                                        </template>
                                        <template v-else>
                                            <router-link
                                                v-if="!sitem.access || (sitem.access && user[sitem.access])"
                                                :key="skey"
                                                v-slot="{ href, navigate, isActive }"
                                                :to="{ name: sitem.name, hash: sitem.hash }"
                                                custom
                                            >
                                                <div class="sidebar__menu-subitem">
                                                    <a 
                                                        :href="href"
                                                        :class="['sidebar__menu-sublink', (isActive && (sitem.hash === $route.hash || !sitem.hash)) && 'is-active', (isExactActive && sitem.hash === $route.hash) && 'is-subactive']"
                                                        @click="navigate"
                                                    >
                                                        {{ sitem.title }}
                                                        <template
                                                            v-if="sitem.name === 'participant-invites' && invitesCount"
                                                        >
                                                            <div class="sidebar__menu-count">{{ invitesCount }}</div>
                                                        </template>
                                                    </a>
                                                </div>
                                            </router-link>
                                        </template>
                                    </template>
                                </div>
                            </transition>
                        </template>
                    </div>
                </router-link>
            </template>
        </template>
    </div>
</template>

<script>
    import { category as categoryApi } from '@/services';
    import { Promised, usePromise } from 'vue-promised';

    export default {
        name: 'SidebarMenu',
        components: {
            Promised
        },
        data() {
            return {
                menu: {
                    default: [{
                        titlePfx: 'Тендеры',
                        name: 'tenders',
                        role: 'all',
                        title: 'Поиск тендеров',
                        icon: 'search'
                    }, {
                        name: 'customer',
                        role: 'all',
                        title: 'Я - заказчик',
                        icon: 'customer',
                        access: 'organization',
                        items: [
                            {
                                name: 'customer-current',
                                role: 'all',
                                title: 'Текущие торги',
                            }, {
                                name: 'customer-private',
                                role: 'all',
                                title: 'Закрытые торги',
                            }, {
                                name: 'customer-closed',
                                role: 'all',
                                title: 'Завершенные',
                            }, {
                                name: 'customer-drafts',
                                role: 'all',
                                title: 'Черновики',
                                access: 'is_access_tender'
                            }, {
                                name: 'tender-start',
                                role: 'all',
                                title: 'Объявить тендер',
                                icon: 'loudspeaker',
                                access: 'is_access_tender'
                            }
                        ]
                    }, {
                        name: 'participant',
                        role: 'all',
                        title: 'Я - поставщик',
                        icon: 'provider',
                        access: 'organization',
                        items: [
                            {
                                name: 'participant-invites',
                                role: 'all',
                                title: 'Приглашения',
                                access: 'is_access_tender'
                            }, {
                                name: 'participant-current',
                                role: 'all',
                                title: 'Текущие торги',
                            }, {
                                name: 'participant-closed',
                                role: 'all',
                                title: 'Завершенные',
                            }
                        ]
                    }, {
                        titlePfx: 'Маркет',
                        name: 'products',
                        role: 'all',
                        title: 'Каталог',
                        icon: 'market',
                        items: [
                            {
                                name: 'products-group',
                                role: 'all',
                                dynamic: true,
                                items: async () => {
                                    let params = {
                                        limit: 12,
                                        offset: 0,
                                    }
                                    let tempStoriesArr = await categoryApi.getCategoryListProducts(params).then(res => {
                                        return res.results;
                                    });
                                    console.log('Get sidebar groups', tempStoriesArr);
                                    return tempStoriesArr;
                                }
                            }, {
                                name: 'products-groups',
                                role: 'all',
                                title: 'Все категории',
                            }
                        ]
                    }, {
                        name: 'market',
                        role: 'all',
                        title: 'Я - продавец',
                        icon: 'seller',
                        access: 'is_access_product',
                        condition: 'im_auth_type__person',
                        items: [
                            {
                                name: 'market',
                                hash: '#public',
                                role: 'all',
                                title: 'Публичный профиль',
                            }, {
                                name: 'market',
                                hash: '#goods',
                                role: 'all',
                                title: 'Товары',
                            }, {
                                name: 'market',
                                hash: '#orders',
                                role: 'all',
                                title: 'Заказы',
                            }, {
                                name: 'market',
                                hash: '#settings',
                                role: 'all',
                                title: 'Настройки',
                            }, {
                                name: 'market-good-add',
                                role: 'all',
                                title: 'Добавить товар',
                            }
                        ]
                    }, {
                        titlePfx: 'Организации',
                        name: 'contragents',
                        role: 'all',
                        title: 'Все организации',
                        icon: 'peoples'
                    }, {
                        name: 'organization-registration',
                        role: 'all',
                        title: 'Моя организация',
                        icon: 'organization',
                        forbiden: 'organization'
                    }, {
                        name: 'organization',
                        role: 'all',
                        title: 'Моя организация',
                        icon: 'organization',
                        access: 'is_access_organization',
                        items: [
                            {
                                name: 'organization',
                                hash: '#public',
                                role: 'all',
                                title: 'Публичный профиль',
                            }, {
                                name: 'organization',
                                hash: '#persons',
                                role: 'all',
                                title: 'Сотрудники',
                            }
                        ]
                    }],
                    market: [{
                        name: 'products',
                        role: 'all',
                        title: 'Каталог',
                        icon: 'market',
                        items: [
                            {
                                name: 'products-group',
                                role: 'all',
                                dynamic: true,
                                items: async () => {
                                    let params = {
                                        limit: 12,
                                        offset: 0,
                                    }
                                    let tempStoriesArr = await categoryApi.getCategoryListProducts(params).then(res => {
                                        return res.results;
                                    });
                                    console.log('Get sidebar groups', tempStoriesArr);
                                    return tempStoriesArr;
                                }
                            }, {
                                name: 'products-groups',
                                role: 'all',
                                title: 'Все категории',
                            }
                        ]
                    }, {
                        name: 'market',
                        role: 'all',
                        title: 'Я - продавец',
                        icon: 'seller',
                        access: 'is_access_product',
                        condition: 'im_auth_type__person',
                        items: [
                            {
                                name: 'market',
                                hash: '#public',
                                role: 'all',
                                title: 'Публичный профиль',
                            }, {
                                name: 'market',
                                hash: '#goods',
                                role: 'all',
                                title: 'Товары',
                            }, {
                                name: 'market',
                                hash: '#orders',
                                role: 'all',
                                title: 'Заказы',
                            }, {
                                name: 'market',
                                hash: '#settings',
                                role: 'all',
                                title: 'Настройки',
                            }, {
                                name: 'market-good-add',
                                role: 'all',
                                title: 'Добавить товар',
                            }
                        ]
                    }]
                },
                menuOpenedItems: {},
            };
        },
        computed: {
            typeMenu() {
                return (this.$route.matched.some(record => record.name === 'products' || record.name.match(/^market/))) ? 'market' : 'default';
            },
            user() {
                return this.$store.state.user;
            },
        },
        watch: {
            '$route.name': {
                immediate: true,
                handler() {
                    this.menuOpenedItems = {};
                },
            },
        },
        mounted() {
        },
        destroyed() {
        },
        methods: {
            showMenuItem(condition) {
                console.log('CONDITION: ', condition);
                if (!condition) return true;
                const cond = condition.split('__');
                if (!cond[1]) {
                    if (this.user[cond[0]]) return true;
                } else {
                    if (cond[1] === 'null') {
                        if (!this.user[cond[0]]) return true;
                    } else {
                        if (this.user[cond[0]] === cond[1]) return true;
                    }
                }
                return false;
            },
            menuOpened(name, active) {
                if (active && !this.menuOpenedItems[name]) this.menuOpenedItems[name] = 1;
                return this.menuOpenedItems[name];
            },
            onClickMenuItem(item) {
                if (!this.menuOpenedItems[item.name]) {
                    this.menuOpenedItems[item.name] = 1;
                } else {
                    delete this.menuOpenedItems[item.name];
                }
                if (!item.items) {
                    this.$router.push({ name: item.name });
                }
            },
        }
    };
</script>
