<template>
    <div class="app__main">
        <div class="cabinet notifications">
            <div class="container">
                <template
                    v-if="showLoaderSending"
                >
                    <div class="notifications__loader loader">
                        <div class="spinner" /> Загрузка данных
                    </div>
                </template>
                <template
                    v-else-if="notifications && totalCount"
                >
                    <div class="notifications__title h1">Уведомления</div>
                    <div class="notifications__block">
                        <div
                            v-for="notification in notifications"
                            :key="`notification-${notification.id}`"
                            class="notifications__item"
                        >
                            <div 
                                class="notifications__item-header"
                            >
                                <div 
                                    class="notifications__item-title"
                                >
                                    {{ notification.title }}
                                </div>
                                <div 
                                    v-if="!notification.seen"
                                    class="notifications__item-seen"
                                >
                                    Новое
                                </div>
                                <div 
                                    class="notifications__item-date"
                                >
                                    {{ $helpers.formatDate(new Date(notification.date_publication), 'DD.MM.YYYY HH:mm', 'Europe/Moscow') }} МСК
                                </div>
                            </div>
                            <div 
                                class="notifications__item-content content"
                                v-html="notification.content"
                            />
                            <div 
                                class="notifications__item-footer"
                            >
                                <a
                                    v-if="notification.first_button_link && notification.first_button_name"
                                    class="button button-outline-green"
                                    :href="notification.first_button_link"
                                >
                                    {{ notification.first_button_name }}
                                </a>
                                <a
                                    v-if="notification.second_button_link && notification.second_button_name"
                                    class="button button-outline-green"
                                    :href="notification.second_button_link"
                                >
                                    {{ notification.second_button_name }}
                                </a>
                            </div>
                        </div>
                    </div>
                </template>
                <template
                    v-else
                >
                    <div class="notifications__block">
                        <div
                            class="notifications__item m--no-notifications"
                        >
                            <div 
                                class="notifications__item-header"
                            >
                                <div 
                                    class="notifications__item-title"
                                >
                                    Система уведомлений на ЭТП TUGAN
                                </div>
                            </div>
                            <div 
                                class="notifications__item-content content"
                            >
                                <p>
                                    Здесь вы будете получать уведомления о всех важных событиях на платформе.<br>
                                    <strong>Email-уведомления</strong> отправляются на ваш контактный адрес.<br>
                                    <strong>Web-уведомления</strong> будут показаны на этой странице.
                                </p>
                                <p>
                                    Любой тип уведомлений можно включить или отключить в настройках.
                                </p>
                            </div>
                            <div 
                                class="notifications__item-footer"
                            >
                                <router-link
                                    :to="{ name: 'notifications-settings' }"
                                    class="button button-outline-green m--width-auto"
                                >
                                    Настроить уведомления
                                </router-link>
                            </div>
                        </div>
                    </div>
                </template>
                <div
                    v-if="!showLoaderSending && notifications && totalCount"
                    class="notifications__pagination"
                >
                    <div class="notifications__pagination-left">
                        <div class="notifications__pagination-count">
                            Всего: <span>{{ totalCount }}</span>
                        </div>
                    </div>
                    <div class="notifications__pagination-right">
                        <div class="notifications__pagination-perpage">
                            <span>На страницу :</span>
                            <select
                                v-model="limit"
                                class="notifications__pagination-select"
                                name="limit"
                            >
                                <option
                                    value="10"
                                    selected="selected"
                                >
                                    10 уведомлений
                                </option>
                                <option value="20">
                                    20 уведомлений
                                </option>
                                <option value="50">
                                    50 уведомлений
                                </option>
                                <option value="100">
                                    100 уведомлений
                                </option>
                            </select>
                        </div>
                        <Pagination
                            :total="totalCount"
                            :limit="Number(limit)"
                            :currentPage="Number($route.query.page || 1)"
                            :query="$route.query"
                            :url="$route.path"
                        />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { event as api } from "@/services";
    import Pagination from '@/components/pagination.vue';

    export default {
        components: {
            // Breadcrumbs
            Pagination
        },
        data() {
            return {
                limit: 10,
                totalCount: null,
                notifications: null,
                showLoaderSending: false,
            }
        },
        computed: {
            page() {
                return Number(this.$route.query.page) || 1
            },
            offset() {
                let limit = Number(this.limit)
                return (this.page - 1) * limit
            }
        },
        watch: {
            limit () {
                if (this.$route.query.page) {
                    this.$router.replace({ query: {} })
                } else {
                    this.getNotifications()
                }
            },
            '$route.query.page': {
                handler() {
                    this.getNotifications()
                },
            }
        },
        mounted() {
            this.getNotifications();
        },
        created() {
        },
        methods: {
            getNotifications() {
                let limit = Number(this.limit)
                let params = {
                    limit,
                    offset: this.offset
                }
                this.showLoaderSending = true;
                api.getNotifications(params).then(res => {
                    this.notifications = res.results;
                    this.totalCount = res.count;
                    this.showLoaderSending = false;
                }).catch(err => {
                    console.error(err);
                    this.showLoaderSending = false;
                })
            },
        }
    };
</script>