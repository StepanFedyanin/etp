<template>
    <div class="app__main">
        <div class="cabinet chat">
            <div class="container">
                <!-- <pre>{{chatId }}</pre> -->
                <div 
                    v-if="chatId || rooms.length"
                    class="chat__block"
                >
                    <div class="chat__users">
                        <div
                            v-show="scrollbarVisible['users']"
                            class="chat__block-up"
                            @click="scrollUp('users')"
                        />
                        <div
                            v-show="scrollbarVisible['users']"
                            class="chat__block-down"
                            @click="scrollDown('users')"
                        />
                        <div 
                            ref="users"
                            class="chat__users-inner"
                        >
                            <!-- :class="[currentRecipient === room ? 'is-active' : '']" -->
                            <div 
                                v-for="room in sortedChats"
                                :key="`chat-user-${room}`"
                                class="chat__user"
                                :class="{'is-active': isActive(room.id)}"
                                @click.prevent="onSelectRecipient(room.id, room)"
                            >
                                <!-- <pre>{{room}}</pre> -->
                                <div class="chat__user-status is-online" />
                                <div class="chat__user-name">
                                    {{ room.chat_partner.last_name }} {{ room.chat_partner.first_name }}
                                </div>
                                <div class="chat__user-info">
                                    <div class="chat__user-info-tender">
                                        Аукцион №{{ room.tender.id }}
                                    </div>
                                    <div class="chat__user-info-date">
                                        {{ $helpers.formatDate(new Date( room.last_update ), 'DD.MM.YY HH:mm') }}
                                        <!-- 23.05.22 12:34 -->
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="chat__board">
                        <div
                            v-show="scrollbarVisible['board']"
                            class="chat__block-up"
                            @click="scrollUp('board')"
                        />
                        <div
                            v-show="scrollbarVisible['board']"
                            class="chat__block-down"
                            @click="scrollDown('board')"
                        />
                        <div
                            ref="board"
                            class="chat__board-inner"
                        >
                            <!-- <pre>{{chatInfo}}</pre> -->
                            <template
                                v-if="chatInfo"
                            >
                                <div class="chat__board-tender tender">
                                    <div
                                        class="tender__info m--column"
                                    >
                                        <div class="tender__info-number">
                                            Аукцион №{{ chatInfo.tender && chatInfo.tender.id }}
                                        </div>
                                        <div class="tender__info-title">
                                            {{ chatInfo.tender.name }}
                                        </div>
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


                                <div 
                                    ref="area"
                                    class="chat__messages"
                                    @wheel="scroll"
                                >
                                    <template
                                        v-for="(message) in messages"
                                    >
                                        <!-- v-if="index === 0 || new Date(message[index - 1].date_publication).toLocaleDateString('ru') !== new Date(message.date_publication).toLocaleDateString('ru')" -->
                                        <div 
                                            v-if="message.type === 'time' "
                                            class="chat__messages-date"
                                        >
                                            <!-- {{ new Date(message.date_publication).toLocaleDateString('ru') }} -->
                                            {{ $helpers.formatDate(new Date(message.date), 'DD.MM.YY') }}
                                        </div>
                                        <div
                                            v-else
                                            class="chat__messages-item"
                                            :class="message.user !== $store._state.data.user.id ? 'is-recipient' : 'is-your'"
                                        >
                                            <div 
                                                class="chat__messages-item-text"
                                                v-html="message.text"
                                            />
                                            <div class="chat__messages-item-time">
                                                <!-- {{ message.date_publication }} -->
                                                {{ $helpers.formatDate(new Date(message.date_publication), 'HH:mm') }}
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
                                        placeholder="Ввести данные"
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
                    v-if="showLoaderSending"
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
    // import { tender } from "@/settings/development";
    // import { number } from "@formkit/inputs";
    import _find from 'lodash/find';

    export default {
        name: "Chat",
        components: {
        },
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
                myId: parseInt(this.$store.state.id),
                scrollbarVisible: {
                    users: false,
                    board: false
                },
                showLoaderSending: false,
                currentRecipient: null,
                // chatInfo: {},
                rooms: [],
                // room: "",
                // messages: [],
                limit: 15,
                offset: 0,
                // chatId: 0
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
                        const el = this.$refs.area;
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
            this.fetchChats(this.chatId);
            if (this.chatId) {
                this.onSelectRecipient(this.chatId);
                // this.connectionChat();
                // this.getChat(this.chatId);
                // this.getMessages(this.chatId);
            }
            // this.currentRoom();
            // this.getChat(this.chatId);
            // ЗАСУНУТЬ ПРИ ВЫБОРЕ ЧАТА))

        },
        destroyed() {
            this.connection.closeChat();
        },
        methods: {
            isActive(roomId) {
                // console.log(roomId, this.chat)
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
                    this.chatEmpty = res.count === 0;

                    const el = this.$refs.area;
                    const scrollHeight = el.scrollHeight;
                    this.$nextTick(() => {
                        this.fetchChats();
                        this.offset += this.limit;
                        el.scrollTop = el.scrollHeight - scrollHeight;
                        this.isLoading = false;
                    });
                }).catch(err => {
                    console.error(err);
                    this.isLoading = false;
                });
            },
            // getChatList() {
            //     this.showLoaderSending = true;
            //     Chat.getChatList().then(res => {
            //         this.rooms = res;

            //         this.showLoaderSending = false;
            //     }).catch(err => {
            //         console.error(err);
            //         this.showLoaderSending = false;
            //     });
            // },
            
            // getChat(chatId) {
            //     this.showLoaderSending = true;
            //     Chat.getChat(chatId).then(res => {
            //         this.chatInfo = res;
            //         console.log(res);
            //         this.showLoaderSending = false;
            //         if (chatId) {
            //             this.onSelectRecipient(chatId, this.findChat(chatId));
            //         }
            //     }).catch(err => {
            //         console.error(err);
            //         this.showLoaderSending = false;
            //     });
            // },

            // getMessages(chatId) {
            //     this.showLoaderSending = true;
            //     Chat.getMessages(chatId, this.offset, this.limit).then(res => {
            //         this.messages = res;
            //         console.log(res);
            //         this.showLoaderSending = false;
            //     }).catch(err => {
            //         console.error(err);
            //         this.showLoaderSending = false;
            //     });
            // },

            onResize() {
                Object.keys(this.scrollbarVisible).forEach(key => {
                    if (this.$refs[key]) {
                        this.scrollbarVisible[key] = this.$refs[key].scrollHeight > this.$refs[key].clientHeight;
                    }
                });
            },
            scrollUp(target) {
                if (this.$refs[target]) {
                    this.$refs[target].scrollTo(
                        {
                            'top': this.$refs[target].scrollTop - 240,
                            'behavior': 'smooth'
                        }
                    )
                }
            },
            scrollDown(target) {
                if (this.$refs[target]) {
                    this.$refs[target].scrollTo(
                        {
                            'top': this.$refs[target].scrollTop + 240,
                            'behavior': 'smooth'
                        }
                    )
                }
            },
            isMine(id) {
                return id === this.myId;
            },
            onSelectRecipient(chatId, item) {
                if (chatId && this.chat !== Number(chatId)) {
                    this.chat = Number(chatId);
                    // this.getChat(chatId);
                    this.clearChat(chatId);
                    this.connectionChat()
                    // this.getMessages(chatId);
                    this.appendMessages(chatId);
                    
                }

            },
            onSendMessage(room, text) {
                // console.log(text);
                // if (text) {
                //     this.chatEmpty = false;
                //     this.message = '';
                //     let message = {
                //         "text": text,
                //         "author": this.myId,
                //         "room": this.chat,
                //     }
                Chat.createMessages(room, {'text': text}).then(res => {
                    this.fetchChats();
                    this.form = {};
                }).catch(err => {
                    console.error(err);
                });
                // }
            },
            // onSendMessage2(room) {
            //     let text = {text: this.form.message};
            //     console.log(room);
            //     Chat.createMessages(room, text).then(res => {
            //         // this.messages = res;
            //         // this.getMessages(room);
            //         this.form = {};
            //     }).catch(err => {
            //         console.error(err);
            //     });
            // console.log(this.form, this.$refs.board.scrollTop, this.$refs.board.scrollHeight);
            // if (this.form.message) {
            //     let date = this.$helpers.formatDate(new Date(), 'HH:mm');
            //     this.messages.results.push({
            //         date_publication: new Date(),
            //         text: this.form.message.replace( /(<([^>]+)>)/ig, '').replace(/(?:\r\n|\r|\n)/g, '<br />'),
            //         recipient: false
            //     });
                
            //     this.form = {};
            //     this.$nextTick(() => {
            //         console.log(this.form, this.$refs.board.scrollTop, this.$refs.board.scrollHeight);
            //         this.$refs.board.scrollTo(
            //             {
            //                 'top': this.$refs.board.scrollHeight,
            //                 'behavior': 'smooth'
            //             }
            //         );
            //     });
            // }
            // },
            clearChat() {
                this.offset = 0;
                this.chat_messages = [];
                this.chatEmpty = true;
                this.canScroll = true;
                if (this.connection) {
                    this.connection.closeChat();
                }
            },
            linkToTenders() {
                this.$router.push({ name: 'tenders'});
            },
            handleMessage(msg) {
                if (msg.room === this.chat) {
                    msg.seen = true;
                    // console.log(msg);
                    this.chat_messages.push(msg);
                    this.offset++;
                    // if (msg.user !== this.$store.state.user.id) {
                    //     this.connection.sendMessage({
                    //         room: this.chat,
                    //         id: msg.id,
                    //     })
                    // }
                    const el = this.$refs.area;
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
                this.connection = new Chat(this.chat);
                // this.connection = new Chat(this.$store.state.user.id);

                this.connection.onEvent('open', () => {
                    console.log('Chat is opened');
                    this.isConnected = true;
                });
                this.connection.onEvent('close', (isOK, e) => {
                    if (isOK) {
                        console.log('Chat is closed');
                    } else {
                        console.warn(`Chat is closed with code ${e.code}: ${e.reason}`);
                    }
                    this.isConnected = false;
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
                const el = this.$refs.area;
                if (el.scrollTop === 0 && this.isLoading === false && this.canScroll) {
                    this.appendMessages(this.chat);
                }
            },
        }
    };
</script>
