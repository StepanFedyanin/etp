<template>
    <div class="app__main">
        <div class="cabinet chat">
            <div class="container">
                <div 
                    v-if="chatId || rooms.length"
                    class="chat__block"
                >
                    <div class="chat__users">
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
                        <div 
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
                                <div 
                                    class="chat__user-status" 
                                    :class="[room.seen ? '' : 'is-unread']"
                                />
                                <div class="chat__user-name">
                                    {{ room.chat_partner.last_name }} {{ room.chat_partner.first_name }}
                                </div>
                                <div class="chat__user-info">
                                    <div class="chat__user-info-tender">
                                        Аукцион №{{ room.tender.id }}
                                    </div>
                                    <div class="chat__user-info-date">
                                        {{ $helpers.formatDate(new Date( room.last_update ), 'DD.MM.YY HH:mm') }}
                                    </div>
                                </div>
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
                            <template
                                v-if="chatInfo"
                            >
                                <div class="chat__board-tender tender">
                                    <div
                                        class="tender__info m--column"
                                    >
                                        <!-- <div class="tender__info-number">
                                            Аукцион №{{ chatInfo.tender && chatInfo.tender.id }}
                                        </div> -->
                                        <router-link
                                            :to="{ name: 'tender', params: { id: chatInfo.tender.id } }"
                                            class="tender__info-title"
                                        >
                                            {{ chatInfo.tender.name }}
                                        </router-link>
                                        <!-- <div class="tender__info-title">
                                            {{ chatInfo.tender.name }}
                                        </div> -->
                                        <div class="tender__info-param">
                                            <span>Организация: </span> 
                                            <router-link
                                                :to="{ name: 'contragent', params: { id: chatInfo.tender.organization.id } }"
                                                class="tenders__item-organization"
                                            >
                                                {{ chatInfo.tender.organization.name }}
                                            </router-link>
                                        </div>
                                        <div class="tender__info-param">
                                            <span>Директор:</span> {{ chatInfo.tender.organization.head_name }}
                                        </div>
                                    </div>
                                </div>
                                <!-- ref="area" -->
                                <div 
                                    class="chat__messages"
                                >
                                    <template
                                        v-for="(message) in messages"
                                    >
                                        <div 
                                            v-if="message.type === 'time' "
                                            class="chat__messages-date"
                                        >
                                            {{ $helpers.formatDate(new Date(message.date), 'DD.MM.YY') }}
                                        </div>
                                        <div
                                            v-else
                                            class="chat__messages-item "
                                            :class="[{'is-unread': !message.seen}, message.user !== $store._state.data.user.id ? 'is-recipient' : 'is-your']"
                                        >
                                            <div class="chat__messages-item-inner">
                                                <div 
                                                    class="chat__messages-item-text"
                                                    v-html="message.text"
                                                />
                                                <div class="chat__messages-item-time">
                                                    {{ $helpers.formatDate(new Date(message.date_publication), 'HH:mm') }}
                                                </div>
                                            </div>
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
                            <template
                                v-else
                            >
                                <div class="chat__board-alert">
                                    Выберите собеседника для общения.
                                </div>
                            </template>
                        </div>
                    </div>
                </div>
                <template
                    v-if="showLoaderSending && sortedChats && sortedChats.length === 0"
                >
                    <div class="tenders__loader loader">
                        <div class="spinner" /> Загрузка данных
                    </div>
                </template>
                <div
                    v-if="!showLoaderSending && !chatId && !rooms.length"
                    class="chat__board-empty"
                >
                    <div class="h1">
                        Добро пожаловать в чат!
                    </div>
                    <p>
                        Здесь вы можете общаться с другими участниками тендеров.<br>
                        <b>Организатор тендера</b> может начать чат с любым из участников.<br>
                        <b>Участник тендера</b> может начать чат с организатором.
                    </p>
                    <button 
                        class="button button-outline-green"
                        @click="linkToTenders"
                    >
                        Перейти к тендерам
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { chat as Chat } from "@/services";
    import _find from 'lodash/find';

    export default {
        name: "Chat",
        props: {
            chatId: {
                type: Number,
                default() { return 0; }
            },
        },
        data() {
            return {
                chat: null,
                chat_messages: [],
                form: {},
                connection: null,
                scrollbarVisible: {
                    users: false,
                    board: false
                },
                canScroll: false,
                showLoaderSending: false,
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
            fetchChats(chatId) {
                this.showLoaderSending = true;
                Chat.getChatList().then(res => {
                    this.rooms = res;
                    if (chatId) {
                        this.onSelectRecipient(chatId, this.findChat(chatId));
                    }
                    this.showLoaderSending = false;
                }).catch(err => {
                    console.error(err);
                    this.showLoaderSending = false;
                });
            },
            appendMessages(chatId) {
                this.isLoading = true;
                Chat.getMessages(chatId, this.offset, this.limit).then(res => {
                    this.chat_messages = res.results.reverse().concat(this.chat_messages);
                    this.canScroll = res.count > this.offset;
                    const el = this.$refs.board;
                    const scrollHeight = el.scrollHeight;
                    this.$nextTick(() => {
                        el.scrollTop = el.scrollHeight - scrollHeight;
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
                    this.appendMessages(this.chat);
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
                if (chatId && this.chat !== Number(chatId)) {
                    this.chat = Number(chatId);
                    this.clearChat();
                    this.appendMessages(chatId);   
                }
            },
            onSendMessage(room, text) {
                if (text) {
                    Chat.createMessages(room, {'text': text}).then(() => {
                        this.fetchChats();
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
                        el.scrollTop = el.scrollHeight;
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
                    this.appendMessages(this.chat);
                }
            },
        }
    };
</script>
