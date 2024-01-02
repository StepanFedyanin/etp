<template>
    <q-no-ssr>
        <div class="app__sidebar sidebar">
            <div class="sidebar__inner">
                <AppSidebarMenu />
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
                    <AppSidebarClock />
                </div>
            </div>
        </div>
    </q-no-ssr>
</template>

<script>
    import { push as Push } from '@/services';
    import AppSidebarMenu from '@/components/app-sidebar-menu.vue';
    import AppSidebarClock from '@/components/app-sidebar-clock.vue';

    export default {
        name: 'Sidebar',
        components: {
            AppSidebarMenu,
            AppSidebarClock,
        },
        data() {
            return {
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
        },
        destroyed() {
            this.push.closePush();
        },
        methods: {
            onClickMenuItem(item) {
                this.$router.push({ name: item.name });
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
