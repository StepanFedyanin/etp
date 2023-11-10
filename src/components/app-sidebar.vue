<template>
    <q-no-ssr>
        <div class="app__sidebar sidebar">
            <div class="sidebar__inner">
                <div class="sidebar__menu">
                    <template
                        v-for="(item, key) in menu"
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
                                :key="key"
                                v-slot="{ href, isActive }"
                                :to="{ name: item.name }"
                                custom
                            >
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
                                                >
                                                    <router-link
                                                        v-if="!sitem.access || (sitem.access && user[sitem.access])"
                                                        :key="skey"
                                                        v-slot="{ href, navigate, isActive }"
                                                        :to="{ name: sitem.name }"
                                                        custom
                                                    >
                                                        <div class="sidebar__menu-subitem">
                                                            <a 
                                                                :href="href"
                                                                :class="[isActive && 'is-active']"
                                                                class="sidebar__menu-sublink"
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
                                            </div>
                                        </transition>
                                    </template>
                                </div>
                            </router-link>
                        </template>
                    </template>
                </div>
                <div class="sidebar__bottom">
                    <div class="sidebar__bottom-menu">
                        <router-link
                            v-for="(item, key) in menuBottom"
                            :key="key"
                            v-slot="{ href, isActive, isExactActive }"
                            :to="{ name: item.name }"
                            custom
                        >
                            <a 
                                :href="href"
                                :class="[(isActive || isExactActive) && 'is-active', `m--icon-${item.icon}`, (item.name === 'chat' && roomUnreadCount) || (item.name === 'notifications' && notificationsCount) ? 'is-alert' : '']"
                                class="sidebar__bottom-menu-link"
                                @click.prevent="onClickMenuItem(item)"
                            >
                                <template
                                    v-if="item.name === 'chat' && roomUnreadCount"
                                >
                                    <div class="sidebar__bottom-menu-count">{{ roomUnreadCount }}</div>
                                </template>
                                <template
                                    v-if="item.name === 'notifications' && notificationsCount"
                                >
                                    <div class="sidebar__bottom-menu-count">{{ notificationsCount }}</div>
                                </template>
                            </a>
                        </router-link>
                    </div>
                    <div class="sidebar__bottom-date">
                        <pre>{{ currentDate }}</pre>
                        <pre>{{ currentTime }} ({{ this.currentTimeZone }} GMT)</pre>
                    </div>
                </div>
            </div>
        </div>
    </q-no-ssr>
</template>

<script>
    import { push as Push } from '@/services';

    export default {
        name: 'Sidebar',
        data() {
            return {
                menu: [{
                    name: 'tenders',
                    role: 'all',
                    title: 'Поиск тендеров',
                    icon: 'search'
                }, {
                    name: 'customer',
                    role: 'all',
                    title: 'Я - заказчик',
                    icon: 'customer',
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
                    name: 'contragents',
                    role: 'all',
                    title: 'Организации',
                    icon: 'peoples'
                /*
                }, {
                    name: 'favorites-contragents',
                    role: 'all',
                    title: 'Избранное',
                    icon: 'favorites',
                    items: [
                        {
                            name: 'favorites-contragents',
                            role: 'all',
                            title: 'Контрагенты',
                        }, {
                            name: 'favorites-tenders',
                            role: 'all',
                            title: 'Тендеры',
                        }
                    ]
                }, {
                        name: 'devider',
                */
                // {
                //     name: 'help',
                //     role: 'all',
                //     title: 'Помощь',
                //     icon: 'info'
                }
                ],
                menuBottom: [
                    {
                        name: 'chat',
                        role: 'all',
                        title: 'Чат',
                        icon: 'chats'
                    }, {
                        name: 'favorites',
                        role: 'all',
                        title: 'Избранное',
                        icon: 'favorites'
                    }, {
                        name: 'notifications',
                        role: 'all',
                        title: 'Уведомления',
                        icon: 'notifications'
                    },
                ],
                timer: null,
                currentDate: null,
                currentTime: null,
                currentTimeZone: null,
                menuOpenedItems: {},
                push: undefined,
                roomUnreadCount: 0,
                invitesCount: 0,
                notificationsCount: 0
            };
        },
        computed: {
            user() {
                return this.$store.state.user;
            },
        },
        /*
        watch: {
            '$route' (value) {
                // this.getCount()
                // if (this.hasNotification && value.name === 'notifications') {
                //    this.hasNotification = false;
                // }
                if (this.push) {
                    //this.push.closePush();
                }
                //this.connectToPushWS();
                // this.close();
            }
        },
        */
        mounted() {
            this.connectToPushWS();
            this.timer = setInterval(() => {
                let date = new Date();
                this.currentTime = date.toLocaleTimeString('ru', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
                this.currentTimeZone = -1 * date.getTimezoneOffset() / 60;
                this.currentTimeZone = this.currentTimeZone > 0 ? '+' + this.currentTimeZone : this.currentTimeZone;
                this.currentDate = date.toLocaleDateString('ru');
            }, 1000);
        },
        unmounted() {
            clearTimeout(this.timer);
        },
        destroyed() {
            this.push.closePush();
        },
        methods: {
            menuOpened(name, active) {
                if (active) this.menuOpenedItems[name] = 1;
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
            connectToPushWS() {
                console.log("Starting connection to WebSocket Server")
                this.push = new Push();
                this.push.onEvent('open', (res) => {
                    console.log('Push is active', res);
                    this.isConnected = true;
                    // this.getCount()
                });
                this.push.onEvent('close', (isOK, e) => {
                    if (isOK) {
                        console.log('Chat is closed');
                    } else {
                        console.warn(`Chat is closed with code ${e.code}: ${e.reason}`, e);
                    }
                    this.isConnected = false;
                });
                this.push.onEvent('error', (e) => {
                    console.error('Chat has received an error', e);
                });
                this.push.onEvent('message', (data) => {
                    console.log('Chat has received a message', data);
                    this.handlePush(data);
                });

                this.push.openPush();
            },
            handlePush(event) {
                this.invitesCount = event.invites_count || 0;
                this.notificationsCount = event.notifications_count || 0;
                this.roomUnreadCount = event.unread_room_count || 0;
                /*
                switch(event.push_reason) {
                case 'chat_update':
                    this.roomUnreadCount = event.unread_room_count;
                    break;
                case 'initial_info':
                    this.roomUnreadCount = event.unread_room_count;
                    break;
                case 'chat_read':
                    this.roomUnreadCount = event.unread_room_count;
                    break;
                }
                */
            },

        }
    };
</script>
