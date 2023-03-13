<template>
    <div 
        v-if="tender.status !== 'closed' || (tender.status === 'closed' && messages.length)"
        class="tender__chat"
    >
        <div class="tender__chat-title">
            Чат тендера
        </div>

        <div 
            class="tender__chat-block chat"
            :class="messages.length ? '' : 'm--empty'"
        >
            <div class="chat__board m--100">
                <div
                    ref="board"
                    class="chat__board-inner"
                    @wheel="scroll"
                >
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
                                class="chat__messages-item m--tender"
                                :class="[{'is-unread': !message.seen}, message.user_status === 'participant' ? 'is-right' : 'is-left']"
                            >
                                <div class="chat__messages-item-inner">
                                    <template
                                        v-if="message.deleted"
                                    >
                                        <div class="chat__messages-item-text m--deleted">
                                            Сообщение удалено
                                        </div>
                                    </template>
                                    <template
                                        v-else
                                    >
                                        <div class="chat__messages-item-top">
                                            <div class="chat__messages-item-member">
                                                <span
                                                    :class="`m--${message.user_status}`"
                                                >
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
                                            <button
                                                v-if="user.id === tender.creator || user.is_staff || user.id === message.id_user"
                                                class="chat__messages-item-delete"
                                                @click.prevent="onDeleteMessage(message.id)"
                                            />
                                        </div>
                                        <div 
                                            v-if="message.user_name"
                                            class="chat__messages-item-name"
                                        >
                                            {{ message.user_name }}
                                        </div>
                                        <div 
                                            class="chat__messages-item-text"
                                            v-html="message.text"
                                        />                                        
                                    </template>
                                </div>
                            </div>
                        </template>
                    </div>
                    <form
                        v-if="tender.status !== 'closed'"
                        class="chat__board-form m--tender form"
                        @submit.prevent="onSendMessage(form.message)"
                    >
                        <textarea
                            v-model="form.message"
                            name="message"
                            placeholder="Напишите сообщение"
                            class="chat__board-form-message"
                            @keydown.enter.exact.prevent
                            @keyup.enter.exact="onSendMessage(form.message)"
                        />
                        <button
                            type="submit"
                            class="chat__board-form-button"
                        />
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { tenderChat as Chat } from "@/services";
    //import ModalAddLotOffer from '@/components/modal-add-lot-offer';
    //import ModalCancelLotOffer from '@/components/modal-cancel-lot-offer';
    export default {
        components: {
        },
        props: {
            tender: {
                type: Object,
                default() { return {}; }
            },
        },
        data() {
            return {
                user: this.$store.state.user,
                chat_messages: [{
                    date_publication: '2023-02-22 12:00',
                    text: 'jdlfjgldf gld fgljd flgjdfg'
                }],
                form: {},
                connection: null,
                canScroll: false,
                showLoaderSending: false,
                currentRecipient: null,
                isLoading: false,
                limit: 8,
                offset: 0,
                touchStartX: 0,
                touchStartY: 0,
                touchEndX: 0,
                touchEndY: 0

            }
        },
        computed: {
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
        },
        mounted() {
            this.clearChat();
        },
        created() {
            //this.connectionChat();
            this.appendMessages(this.tender.id);
        },
        methods: {
            dateDiff(oldDate, newDate) {
                let msPerDay = 8.64e7;
                let oldAsDate = new Date(oldDate);
                let newAsDate = new Date(newDate);
                oldAsDate.setHours(12,0,0);
                newAsDate.setHours(12,0,0);
                return Math.round( (newAsDate - oldAsDate) / msPerDay );
            },
            scroll(el) {
                let delta = Math.max(-1, Math.min(1, (el.wheelDelta || -el.detail)));
                const board = this.$refs.board;
                if (board.scrollTop === 0 && delta === 1 && this.isLoading === false && this.canScroll) {
                    this.appendMessages(this.tender.id);
                }
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
                this.appendMessages(this.tender.id);
            },
            clearChat() {
                this.offset = 0;
                this.chat_messages = [];
                this.canScroll = true;
            },
            appendMessages(tenderId) {
                this.isLoading = true;
                let params = {
                    tender: tenderId,
                    offset: this.offset,
                    limit: this.limit
                }
                Chat.getTenderChat(params).then(res => {
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
            onSendMessage(text) {
                if (text) {
                    let params = {
                        tender: this.tender.id,
                        text: text
                    }
                    Chat.addTenderChatMessage(params).then((res) => {
                        //this.fetchChats();
                        this.chat_messages.push(res);
                        this.offset++;
                        this.form = {};
                        const el = this.$refs.board;
                        this.$nextTick(() => {
                            // el.scrollTop = el.scrollHeight;
                            el.scrollTo({ 
                                top: el.scrollHeight, 
                                behavior: 'smooth'
                            });
                        });
                    }).catch(err => {
                        console.error(err);
                    });
                }
            },
            onDeleteMessage(id) {
                if (id) {
                    let params = {
                        tender: this.tender.id,
                        message: id
                    }
                    Chat.deleteTenderChatMessage(params).then((res) => {
                        this.chat_messages.filter(item => {
                            return item.id === id;
                        })[0].deleted = 1;
                        console.log(res);
                    }).catch(err => {
                        console.error(err);
                    });
                }
            },
        },
    };
</script>
