<template>
    <div class="app__main">
        <div class="cabinet chat">
            <div class="container">
                <app-breadcrumbs 
                    :breadcrumbs="[
                        { name: 'Главная', route: { name: 'home' } },
                        { name: 'Кабинет', route: { name: 'cabinet' } },
                    ]"
                />
                <h1 class="h1">Чаты</h1>
                <div class="chat__block">
                    <div class="chat__users">
                        <div class="chat__tabs tabs m--50">
                            <button 
                                v-for="item in tabsItems"
                                :key="`tab-${item.name}`"
                                class="tabs__item"
                                :class="currentTabsItem === item.name && 'is-active'"
                                :disabled="item.disabled"
                                @click.prevent="changeTab(item.name)"
                            >
                                {{ item.label }}
                            </button>
                        </div>

                        <!-- <div
                            v-show="scrollbarVisible['users']"
                            class="chat__block-up"
                            @click="scrollUp('users')"
                        />
                        <div
                            v-show="scrollbarVisible['users']"
                            class="chat__block-down"
                            @click="scrollDown('users')"
                        /> -->
                        <template v-if="showLoaderList">
                            <div class="chat__loader loader">
                                <div class="spinner" /> Загрузка чатов
                            </div>
                        </template>
                        <div 
                            v-else-if="chatId || rooms.length"
                            ref="users"
                            class="chat__users-inner"
                        >
                            <div 
                                v-for="room in sortedChats"
                                :key="`chat-user-${room}`"
                                class="chat__user"
                                :class="{'is-active': isActive(room.id)}"
                                @click.prevent="onSelectRecipient(room.id, room)"
                            >
                                <!--div class="chat__user-name">
                                    {{ room.chat_partner.last_name }} {{ room.chat_partner.first_name }}
                                </div-->
                                <template v-if="room.type === 'tender'">
                                    <div class="chat__user-info">
                                        <div class="chat__user-info-organization">
                                            {{ room.chat_partner?.full_name }}
                                        </div>
                                        <div class="chat__user-info-date">
                                            <template v-if="$helpers.formatDate(new Date(room.last_update), 'DD.MM.YY') === $helpers.formatDate(new Date(), 'DD.MM.YY')">
                                                {{ $helpers.formatDate(new Date(room.last_update), 'HH:mm') }}
                                            </template>
                                            <template v-else>
                                                {{ $helpers.formatDate(new Date(room.last_update), 'DD.MM') }}
                                            </template>
                                        </div>
                                    </div>
                                    <div class="chat__user-tender">
                                        <div :class="['chat__user-status', room.unread_message_count && 'is-unread']" />
                                        <span>№{{ room.tender?.id }} {{ room.tender?.name }}</span>
                                    </div>
                                </template>
                                <template v-else-if="room.type === 'product'">
                                    <div class="chat__user-info">
                                        <div class="chat__user-info-organization">
                                            {{ room.participants[0].name }}
                                        </div>
                                        <div class="chat__user-info-date">
                                            <template v-if="$helpers.formatDate(new Date(room.last_update), 'DD.MM.YY') === $helpers.formatDate(new Date(), 'DD.MM.YY')">
                                                {{ $helpers.formatDate(new Date(room.last_update), 'HH:mm') }}
                                            </template>
                                            <template v-else>
                                                {{ $helpers.formatDate(new Date(room.last_update), 'DD.MM') }}
                                            </template>
                                        </div>
                                    </div>
                                    <div class="chat__user-tender">
                                        <div :class="['chat__user-status', room.unread_message_count && 'is-unread']" />
                                        <span>{{ room.participants[1].name }}</span>
                                    </div>
                                </template>
                            </div>
                        </div>
                    </div>

                    <div class="chat__board">
                        <!-- <div
                            v-show="scrollbarVisible['board']"
                            class="chat__block-up"
                            @click="scrollUp('board')"
                        />
                        <div
                            v-show="scrollbarVisible['board']"
                            class="chat__block-down"
                            @click="scrollDown('board')"
                        /> -->
                        <div
                            ref="board"
                            class="chat__board-inner"
                            @wheel="scroll"
                        >
                            <template v-if="chatInfo">
                                <template v-if="chatInfo.type === 'tender'">
                                    <div class="chat__board-tender tender">
                                        <div class="tender__info m--column m--100">
                                            <!-- <div class="tender__info-number">
                                                Аукцион №{{ chatInfo.tender && chatInfo.tender.id }}
                                            </div> -->
                                            <router-link
                                                :to="{ name: 'tender', params: { id: chatInfo.tender?.id } }"
                                                class="tender__info-title"
                                            >
                                                {{ chatInfo.tender?.name }}
                                            </router-link>
                                            <!-- <div class="tender__info-title">
                                                {{ chatInfo.tender.name }}
                                            </div> -->
                                            <div class="tender__info-param">
                                                <span>Организация: </span> 
                                                <router-link
                                                    :to="{ name: 'contragent', params: { id: chatInfo.tender?.organization.id } }"
                                                    class="tenders__item-organization"
                                                >
                                                    {{ chatInfo.tender?.organization.name }}
                                                </router-link>
                                            </div>
                                            <div class="tender__info-param">
                                                <span>Директор:</span> {{ chatInfo.tender?.organization.head_name }}
                                            </div>
                                        </div>
                                    </div>
                                </template>
                                <template v-else-if="chatInfo.type === 'product'">
                                    <div class="chat__board-tender product">
                                        <div class="tender__info m--column m--100">
                                            {{ chatInfo }}
                                        </div>
                                    </div>
                                </template>
                                <!-- ref="area" -->
                                <div class="chat__messages">
                                    <template
                                        v-for="(message) in messages"
                                    >
                                        <div 
                                            v-if="message.type === 'time'"
                                            :key="`message-${message.id}`"
                                            class="chat__messages-date"
                                        >
                                            {{ $helpers.formatDate(new Date(message.date), 'DD.MM.YY') }}
                                        </div>
                                        <div
                                            v-else
                                            :key="`message-${message.id}`"
                                            :class="['chat__messages-item', !message.seen && 'is-unread', message.user !== $store._state.data.user.id ? 'is-left' : 'is-right']"
                                        >
                                            <div class="chat__messages-item-inner">
                                                <template v-if="message.deleted">
                                                    <div class="chat__messages-item-text m--deleted">
                                                        Сообщение удалено
                                                    </div>
                                                </template>
                                                <template v-else>
                                                    <div class="chat__messages-item-top">
                                                        <div 
                                                            v-if="message.user_name"
                                                            class="chat__messages-item-user"
                                                        >
                                                            {{ message.user_name }}
                                                        </div>
                                                        <div class="chat__messages-item-member">
                                                            <span :class="`m--${message.user_status}`">
                                                                {{ message.user_status_detail }}
                                                            </span>
                                                            <router-link
                                                                v-if="message.user_status !== 'admin' && message.organization && message.organization.id"
                                                                :to="{ name: 'contragent', params: { id: message.organization.id } }"
                                                            >
                                                                {{ message.organization.name }}
                                                            </router-link>
                                                        </div>
                                                        <div class="chat__messages-item-time">
                                                            {{ $helpers.formatDate(new Date(message.date_publication), 'HH:mm:ss') }} МСК
                                                        </div>
                                                        <!--button
                                                            v-if="(user.is_access_tender && user.organization?.id === tender.creator) || user.is_staff || user.id === message.id_user"
                                                            class="chat__messages-item-delete"
                                                            @click.prevent="onDeleteMessage(message.id)"
                                                        /-->
                                                    </div>
                                                    <div 
                                                        class="chat__messages-item-text"
                                                        v-html="message.text"
                                                    />                                        
                                                </template>
                                            </div>
                                            <!--div class="chat__messages-item-inner">
                                                <div 
                                                    class="chat__messages-item-text"
                                                    v-html="message.text"
                                                />
                                                <div class="chat__messages-item-time">
                                                    {{ $helpers.formatDate(new Date(message.date_publication), 'HH:mm') }}
                                                </div>
                                            </div-->
                                        </div>
                                    </template>
                                </div>
                                <form 
                                    class="chat__board-form form"
                                    @submit.prevent="onSendMessage(chatInfo.id, form.message)"
                                >
                                    <textarea
                                        v-model="form.message"
                                        name="message"
                                        placeholder="Напишите сообщение"
                                        class="chat__board-form-message"
                                        @keydown.enter.exact.prevent
                                        @keyup.enter.exact="onSendMessage(chatInfo.id, form.message)"
                                    />
                                    <button
                                        type="submit"
                                        class="chat__board-form-button"
                                    />
                                </form>
                            </template>
                            <template v-else-if="!showLoaderList">
                                <template v-if="currentTabsItem === 'tender'">
                                    <blockHint 
                                        classModifier="chat__board-empty"
                                        :slug="`chats_${currentTabsItem}`"
                                    />
                                    <button
                                        v-if="!rooms.length"
                                        class="button button-outline-green"
                                        @click="linkToTenders"
                                    >
                                        Перейти к тендерам
                                    </button>
                                </template>
                                <template v-if="currentTabsItem === 'product'">
                                    <blockHint 
                                        classModifier="chat__board-empty"
                                        :slug="`chats_${currentTabsItem}`"
                                    />
                                    <button
                                        v-if="!rooms.length"
                                        class="button button-outline-green"
                                        @click="linkToMarket"
                                    >
                                        Перейти в маркет
                                    </button>
                                </template>
                            </template>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { chat as Chat } from "@/services";
    import _find from 'lodash/find';
    import blockHint from '@/components/block-hint';

    export default {
        name: 'CabinetChat',
        components: {
            blockHint
        },
        /*
        props: {
            chatId: {
                type: Number,
                default() { return 0; }
            },
        },
        */
        data() {
            return {
                tabsItems: [
                    {
                        name: 'product',
                        label: 'Маркет'
                    }, {
                        name: 'tender',
                        label: 'Тендеры'
                    }
                ],
                currentTabsItem: this.$route.hash?.replace('#', '') || 'product',
                chatId: +this.$route.query?.chatId,
                chat: null,
                chat_messages: [],
                form: {},
                connection: null,
                scrollbarVisible: {
                    users: false,
                    board: false
                },
                canScroll: false,
                showLoaderList: false,
                currentRecipient: null,
                isLoading: false,
                rooms: [],
                limit: 8,
                offset: 0,
                touchStartX: 0,
                touchStartY: 0,
                touchEndX: 0,
                touchEndY: 0
            }
        },
        computed: {
            sortedChats: function() {
                return [...this.rooms].sort((a, b) => {
                    if (!a.last_update || !b.last_update) {
                        return !a.last_update ? 1 : !b.last_update ? -1 : 0;
                    }
                    return (a.last_update > b.last_update) ? -1 : ((a.last_update > b.last_update) ? 1 : 0);
                });
            },
            messages: function () {
                let items = [...this.chat_messages];
                let length = items.length
                let date;
                for (let i = 0; i < length; i++) {
                    let message = items[i];
                    if (i === 0 || this.dateDiff(date, message.date_publication) > 0) {
                        items.splice(i, 0, {
                            type: 'time',
                            date: message.date_publication
                        });
                        i++;
                        length++;
                        date = message.date_publication;
                    }
                }
                return items;
            },
            chatInfo: function() {
                if (this.chat) {
                    return _find(this.rooms, { id: this.chat });
                }
                return undefined
            }
        },
        watch: {
            'chat': function (newVal, oldVal) {
                if (!oldVal && newVal > 0) {
                    this.$nextTick(() => {
                        const el = this.$refs.board;
                        this.addSwipeListener(el);
                        
                    });
                }
            }
        },
        mounted() {
            this.resizeObserver = new ResizeObserver(this.onResize);
            if (this.$refs['users'] && this.$refs['board']) {
                this.resizeObserver.observe(this.$refs['users']);
                this.resizeObserver.observe(this.$refs['board']);
            }
        },
        created() {
            this.connectionChat();
            this.fetchChats(this.chatId);
        },
        beforeUnmount() {
            if (this.connection) {
                this.connection.closeChat();
            }
        },
        methods: {
            isActive(roomId) {
                return this.chat && roomId === this.chat;
            },
            dateDiff(oldDate, newDate) {
                let msPerDay = 8.64e7;
                let oldAsDate = new Date(oldDate);
                let newAsDate = new Date(newDate);
                oldAsDate.setHours(12,0,0);
                newAsDate.setHours(12,0,0);
                return Math.round( (newAsDate - oldAsDate) / msPerDay );
            },
            fetchChats(chatId, lazy = false) {
                if (!lazy) this.showLoaderList = true;
                Chat.getChatList(this.currentTabsItem).then(res => {
                    this.rooms = res;
                    if (chatId) {
                        this.onSelectRecipient(chatId, this.findChat(chatId));
                    }
                    this.showLoaderList = false;
                }).catch(err => {
                    console.error(err);
                    this.showLoaderList = false;
                });
            },
            appendMessages(type, chatId) {
                this.isLoading = true;
                Chat.getMessages(type, chatId, this.offset, this.limit).then(res => {
                    this.chat_messages = res.results.reverse().concat(this.chat_messages);
                    this.canScroll = res.count > this.offset;
                    const el = this.$refs.board;
                    const scrollHeight = el.scrollHeight;
                    this.$nextTick(() => {
                        el.scrollTop = el.scrollHeight - scrollHeight;
                        // el.scrollTo({ 
                        //     top: scrollHeight, 
                        //     behavior: 'smooth'
                        // });
                        this.offset += this.limit;
                        this.isLoading = false;
                    });
                }).catch(err => {
                    console.error(err);
                    this.isLoading = false;
                });
            },
            onResize() {
                Object.keys(this.scrollbarVisible).forEach(key => {
                    if (this.$refs[key]) {
                        this.scrollbarVisible[key] = this.$refs[key].scrollHeight > this.$refs[key].clientHeight;
                    }
                });
            },
            scroll: function (el) {
                let delta = Math.max(-1, Math.min(1, (el.wheelDelta || -el.detail)));
                const board = this.$refs.board;
                if (board.scrollTop === 0 && delta === 1 && this.isLoading === false && this.canScroll) {
                    this.appendMessages(this.currentTabsItem, this.chat);
                }
            },
            // scrollUp(target) {
            //     if (this.$refs[target]) {
            //         this.$refs[target].scrollTo(
            //             {image.png
            //                 'top': this.$refs[target].scrollTop - 240,
            //                 'behavior': 'smooth'
            //             }
            //         )
            //     }
            // },
            // scrollDown(target) {
            //     if (this.$refs[target]) {
            //         this.$refs[target].scrollTo(
            //             {
            //                 'top': this.$refs[target].scrollTop + 240,
            //                 'behavior': 'smooth'
            //             }
            //         )
            //     }
            // },
            onSelectRecipient(chatId) {
                console.log(this.chat, chatId);
                if (chatId && this.chat !== Number(chatId)) {
                    this.chat = Number(chatId);
                    this.clearChat();
                    this.appendMessages(this.currentTabsItem, chatId);   
                }
            },
            onSendMessage(room, text) {
                if (text) {
                    Chat.createMessages(this.currentTabsItem, room, {'text': text}).then(() => {
                        this.fetchChats(null, true);
                        this.form = {};
                    }).catch(err => {
                        console.error(err);
                    });
                }
            },
            closeWindow() {
                this.windowActive = false;
            },
            clearChat() {
                this.offset = 0;
                this.chat_messages = [];
                this.canScroll = true;
            },
            linkToTenders() {
                this.$router.push({ name: 'tenders'});
            },
            linkToMarket() {
                this.$router.push({ name: 'market'});
            },
            handleMessage(msg) {
                if (msg.room === this.chat) {
                    msg.seen = true;
                    this.chat_messages.push(msg);
                    this.offset++;
                    if (msg.user !== this.$store.state.user.id) {
                        this.connection.sendMessage({
                            room: this.chat,
                            id: msg.id,
                        })
                    }
                    const el = this.$refs.board;
                    this.$nextTick(() => {
                        // el.scrollTop = el.scrollHeight;
                        el.scrollTo({ 
                            top: el.scrollHeight, 
                            behavior: 'smooth'
                        });
                    });
                } else {
                    this.fetchChats();
                }
            },
            findChat(id) {
                return _find(this.rooms, { id });
            },
            connectionChat() {
                if (this.connection) {
                    this.connection.closeChat();
                }
                this.connection = new Chat();

                this.connection.onEvent('open', () => {
                    console.log('Chat is opened');
                });
                this.connection.onEvent('close', (isOK, e) => {
                    if (isOK) {
                        console.log('Chat is closed');
                    } else {
                        console.warn(`Chat is closed with code ${e.code}: ${e.reason}`);
                    }
                });
                this.connection.onEvent('error', () => {
                    console.error('Chat has received an error');
                });
                this.connection.onEvent('message', (data) => {
                    console.log('Chat has received a message', data);
                    this.handleMessage(data);
                });
                this.connection.openChat();
            },
            addSwipeListener(el) {
                el.addEventListener('touchstart', (event) => {
                    this.touchStartX = event.changedTouches[0].screenX;
                    this.touchStartY = event.changedTouches[0].screenY;
                }, false);

                el.addEventListener('touchend', (event) => {
                    this.touchEndX = event.changedTouches[0].screenX;
                    this.touchEndY = event.changedTouches[0].screenY;
                    this.handleSwipe(this.touchStartX, this.touchStartY, this.touchEndX, this.touchEndY);
                }, false);
            },
            handleSwipe(touchStartX, touchStartY, touchEndX, touchEndY) {
                let x = touchEndX - touchStartX;
                let y = touchEndY - touchStartY;
                let xy = Math.abs(x / y);
                let yx = Math.abs(y / x);

                if (Math.abs(x) > this.swipeThreshold || Math.abs(y) > this.swipeThreshold) {
                    if (yx <= this.swipeLimit) {
                        if (x > 0) {
                            this.closeWindow(0)
                        }
                    }
                    if (xy <= this.swipeLimit) {
                        if (y > 0) {
                            this.bottomSwipe()
                        }
                    }
                }
            },
            bottomSwipe() {
                const el = this.$refs.board;
                if (el.scrollTop === 0 && this.isLoading === false && this.canScroll) {
                    this.appendMessages(this.currentTabsItem, this.chat);
                }
            },
            changeTab(name) {
                this.currentTabsItem = name;
                this.$router.push({ name: this.$route.name, hash: `#${name}` });
                this.fetchChats();
            },
        }
    };
</script>
