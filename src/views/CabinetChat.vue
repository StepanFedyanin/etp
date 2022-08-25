<template>
    <div class="app__main">
        <div class="cabinet chat">
            <div class="container">
                <!-- <pre>{{chatId }}</pre> -->
                <div 
                    v-if="chatId || rooms.length"
                    class="chat__block">
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
                            <template
                                v-if="chatInfo.id"
                            >
                                <div class="chat__board-tender tender">
                                    <div
                                        class="tender__info m--column"
                                    >
                                        <!-- <pre>{{chatInfo}}</pre> -->
                                        <div class="tender__info-number">
                                            Аукцион №{{ chatInfo.tender.id }}
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


                                <div class="chat__messages">
                                    <!-- <pre>{{ messages }}</pre> -->
                                    <template
                                        v-for="(message, index) in messages.results"
                                    >
                                        <!-- <pre>{{ index }}</pre> -->
                                        <!-- <pre>{{ message }}</pre> -->
                                        <!-- v-if="index === 0 || new Date(message[index - 1].date_publication).toLocaleDateString('ru') !== new Date(message.date_publication).toLocaleDateString('ru')" -->
                                        <div 
                                            v-if="index === 0 "
                                            class="chat__messages-date"
                                        >
                                            {{ new Date(message.date_publication).toLocaleDateString('ru') }}
                                        </div>
                                        <div
                                            class="chat__messages-item"
                                            :class="message.user !== $store._state.data.user.id ? 'is-recipient' : 'is-your'"
                                        >
                                            <div 
                                                class="chat__messages-item-text"
                                                v-html="message.text"
                                            />
                                            <div class="chat__messages-item-time">
                                                {{ $helpers.formatDate(new Date(message.date_publication), 'HH:mm') }}
                                            </div>
                                        </div>
                                    </template>
                                </div>
                                <form 
                                    class="chat__board-form form"
                                    @submit.prevent="onSendMessage(chatInfo.id)"
                                >
                                    <textarea
                                        v-model="form.message"
                                        name="message"
                                        placeholder="Ввести данные"
                                        class="chat__board-form-message"
                                    />
                                    <button
                                        type="sunmit"
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
                <div
                    v-else
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
                form: {},
                connection: null,
                scrollbarVisible: {
                    users: false,
                    board: false
                },
                showLoaderSending: false,
                currentRecipient: null,
                chatInfo: {},
                rooms: [],
                // room: "",
                messages: [],
                messagesTemplate: [{
                    date: '2022-08-03 13:49:00',
                    message: 'Добрый день!',
                    recipient: true
                }, {
                    //     date: this.message.date_publication,
                    //     message: 'Здравствуйте, чем я могу помочь?',
                    //     recipient: false
                    // }, {
                    date: '2022-08-03 13:49:00',
                    message: 'Здравствуйте, чем я могу помочь?',
                    recipient: false
                }, {
                    date: '2022-08-03 15:23:00',
                    message: 'Хотел бы уточнить вопрос по документам. Есть время меня проконсультировать?',
                    recipient: true
                }, {
                    date: '2022-08-03 17:44:00',
                    message: 'I`m not a fan of creating additional DOM elements to work around displaying issues, however it seems to help to split up the element into two elements like:',
                    recipient: false
                }, {
                    date: '2022-08-04 10:55:00',
                    message: 'Perhaps there are technical differences between what`s really going on, but I find this pretty effective.',
                    recipient: true
                }, {
                    date: '2022-08-04 13:14:30',
                    message: 'You could target Firefox browsers and add extra margin to the element being scrolled',
                    recipient: true
                }],
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
        },
        mounted() {
            this.resizeObserver = new ResizeObserver(this.onResize);
            if (this.$refs['users'] && this.$refs['board']) {
                this.resizeObserver.observe(this.$refs['users']);
                this.resizeObserver.observe(this.$refs['board']);
            }
        },
        beforeDestroy() {
        },
        created() {
            this.getChatList();
            if (this.chatId) {
                this.getChat(this.chatId);
                this.getMessages(this.chatId);
            }
            // this.currentRoom();


            this.getChat(this.chatId);
            this.connection = new Chat();

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
        destroyed() {
            this.connection.closeChat();
        },
        methods: {
            isActive(roomId) {
                return roomId === this.chat;
            },
            getChatList() {
                Chat.getChatList().then(res => {
                    this.rooms = res;
                    console.log(this.rooms);
                }).catch(err => {
                    console.error(err);
                });
            },
            
            getChat(chatId) {
                Chat.getChat(chatId).then(res => {
                    this.chatInfo = res;
                    console.log(res);
                }).catch(err => {
                    console.error(err);
                });
            },

            getMessages(chatId) {
                Chat.getMessages(chatId, this.offset, this.limit).then(res => {
                    this.messages = res;
                    console.log(res);
                }).catch(err => {
                    console.error(err);
                });
            },

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
            onSelectRecipient(chatId) {
                if (this.chat !== chatId) {
                    this.chat = chatId;
                    this.clearChat(chatId);
                    this.getMessages(chatId);
                    this.getChat(chatId);
                }
                // if (item) {
                //     this.windowActive = true;
                //     // this.collocutorName = this.getCollocutorName(item);
                // }
                // this.getChat(chatId);
                this.getMessages(chatId);
                this.currentRecipient = chatId;
                console.log(chatId);
                // this.messages = [...this.messagesTemplate];
                //this.messages = this.getChat();
            },
            // currentRoom() {
            //     if (this.id){
            //         return this.currentRecipient = this.id;
            //     } else {
            //         return this.currentRecipient = null;
            //     }
            // },
            onSendMessage(room) {
                let text = {text: this.form.message};
                console.log(room);
                Chat.createMessages(room, text).then(res => {
                    // this.messages = res;
                    console.log(res);
                    this.getMessages(room);
                    this.form = {};
                }).catch(err => {
                    console.error(err);
                });



                console.log(this.form, this.$refs.board.scrollTop, this.$refs.board.scrollHeight);
                // if (this.form.message) {
                //     this.messages.results.push({
                //         date: new Date(),
                //         message: this.form.message.replace( /(<([^>]+)>)/ig, '').replace(/(?:\r\n|\r|\n)/g, '<br />'),
                //         recipient: false
                //     });
                    
                this.form = {};
                this.$nextTick(() => {
                    console.log(this.form, this.$refs.board.scrollTop, this.$refs.board.scrollHeight);
                    this.$refs.board.scrollTo(
                        {
                            'top': this.$refs.board.scrollHeight,
                            'behavior': 'smooth'
                        }
                    );
                });
                // }

            },
            clearChat() {
                this.offset = 0;
                this.chat_messages = [];
                this.chatEmpty = true;
                this.canScroll = true
            },
            linkToTenders(){
                this.$router.push({ name: 'tenders'});
            }
        }
    };
</script>
