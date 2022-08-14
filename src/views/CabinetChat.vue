<template>
    <div class="app__main">
        <div class="cabinet chat">
            <div class="container">
                <div class="chat__block">
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
                            <div 
                                v-for="item in 10"
                                :key="`chat-user-${item}`"
                                class="chat__user"
                                :class="[currentRecipient === item ? 'is-active' : '']"
                                @click.prevent="onSelectRecipient(item)"
                            >
                                <div class="chat__user-status is-online" />
                                <div class="chat__user-name">Жуков Николай</div>
                                <div class="chat__user-info">
                                    <div class="chat__user-info-tender">Аукцион №1234567</div>
                                    <div class="chat__user-info-date">23.05.22 12:34</div>
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
                                v-if="currentRecipient"
                            >
                                <div class="chat__board-tender tender">
                                    <div
                                        class="tender__info m--column"
                                    >
                                        <div class="tender__info-number">
                                            Аукцион №1234567
                                        </div>
                                        <div class="tender__info-title">
                                            Поставка инструмента для нужд ООО "Газпром МКС" в 2022 году (для субъектов малого и среднего предпринимательства) Поставка инструмента для нужд ООО "Газпром МКС" в 2022 году (для субъектов малого и среднего предпринимательства) (БАА 22862)
                                        </div>
                                        <div class="tender__info-param">
                                            <span>Организация:</span> <a href="#">ООО «Екатеринбургский Цементный Завод»</a>
                                        </div>
                                        <div class="tender__info-param">
                                            <span>Директор:</span> Жуков Николай Геннадьевич
                                        </div>
                                    </div>
                                </div>

                                <div class="chat__messages">
                                    <template
                                        v-for="(message, index) in messages"
                                    >
                                        <div 
                                            v-if="index === 0 || new Date(messages[index - 1].date).toLocaleDateString('ru') !== new Date(message.date).toLocaleDateString('ru')"
                                            class="chat__messages-date"
                                        >
                                            {{ new Date(message.date).toLocaleDateString('ru') }}
                                        </div>
                                        <div
                                            class="chat__messages-item"
                                            :class="message.recipient ? 'is-recipient' : 'is-your'"
                                        >
                                            <div 
                                                class="chat__messages-item-text"
                                                v-html="message.message"
                                            >
                                            </div>
                                            <div class="chat__messages-item-time">
                                                {{ $helpers.formatDate(new Date(message.date), 'HH:mm') }}
                                            </div>
                                        </div>
                                    </template>
                                </div>

                                <form 
                                    class="chat__board-form form"
                                    @submit.prevent="onSendMessage"
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
                                    Выберите собеседния для общения.
                                </div>
                            </template>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    //import { tender as api } from "@/services";

    export default {
        components: {
        },
        data() {
            return {
                form: {},
                scrollbarVisible: {
                    users: false,
                    board: false
                },
                showLoaderSending: false,
                currentRecipient: null,
                messages: [],
                messagesTemplate: [{
                    date: '2022-08-03 13:43:00',
                    message: 'Добрый день!',
                    recipient: true
                }, {
                    date: '2022-08-03 13:44:00',
                    message: 'Здравствуйте, чем я могу помочь?',
                    recipient: false
                }, {
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
                }]
            }
        },
        computed: {
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
        },
        methods: {
            getMessages() {
                return this.messagesTemplate;
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
            onSelectRecipient(recipient) {
                this.currentRecipient = recipient;
                this.messages = [...this.messagesTemplate];
                //this.messages = this.getMessages();
            },
            onSendMessage() {
                console.log(this.form, this.$refs.board.scrollTop, this.$refs.board.scrollHeight);
                if (this.form.message) {
                    this.messages.push({
                        date: new Date(),
                        message: this.form.message.replace( /(<([^>]+)>)/ig, '').replace(/(?:\r\n|\r|\n)/g, '<br />'),
                        recipient: false
                    });
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
                }
            }
        }
    };
</script>
