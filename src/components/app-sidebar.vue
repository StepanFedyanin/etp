<template>
    <div class="app__sidebar sidebar">
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
                                    v-if="item.name === 'chat' && roomUnreadCount !== 0"
                                >
                                    <div class="sidebar__menu-count">{{ roomUnreadCount }}</div>
                                </template>
                                <template
                                    v-if="item.name === 'notifications' && notificationsCount !== 0"
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
                                        v-if="menuOpenedItems[item.name]"
                                        class="sidebar__menu-item-block"
                                    >
                                        <router-link
                                            v-for="(sitem, key) in item.items"
                                            :key="key"
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
                                                        v-if="sitem.name === 'participant-invites' && invitesCount !== 0"
                                                    >
                                                        <div class="sidebar__menu-count">{{ invitesCount }}</div>
                                                    </template>
                                                </a>
                                            </div>
                                        </router-link>
                                    </div>
                                </transition>
                            </template>
                        </div>
                    </router-link>
                </template>
            </template>
        </div>
    </div>
</template>

<script>
    import { sidebarMenu } from '@/settings';
    import { push as Push } from '@/services';

    export default {
        name: 'Sidebar',
        data() {
            return {
                menu: sidebarMenu,
                menuOpenedItems: {},
                push: undefined,
                roomUnreadCount: 0,
                invitesCount: 0,
                notificationsCount: 0
            };
        },
        watch: {
            '$route' (value) {
                // this.getCount()
                if (this.hasNotification && value.name === 'notifications') {
                    this.hasNotification = false;
                }
                // this.close();
            }
        },
        mounted() {
            this.connectToPushWS()
        },
        destroyed() {
            this.push.closePush();
        },
        methods: {
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
                //console.log(event);
                if (event.invites_count) {
                    this.invitesCount = event.invites_count;
                }
                if (event.notifications_count) {
                    this.notificationsCount = event.notifications_count;
                }
                // let route_path = this.$route.path
                switch(event.push_reason) {
                // case 'notification':
                //     if (!route_path.includes('notification')) {
                //         this.hasNotification = true;
                //     }
                //     break;
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
            },

        }
    };
</script>
