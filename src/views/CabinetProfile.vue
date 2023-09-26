<template>
    <div class="app__main">
        <!-- <Breadcrumbs /> -->
        <div class="cabinet profile">
            <div class="container">
                <div class="app__breadcrumbs">
                    <router-link
                        :to="{ name: 'home' }"
                        class="app__breadcrumbs-link"
                    >
                        Главная
                    </router-link>
                    <router-link
                        :to="{ name: 'cabinet' }"
                        class="app__breadcrumbs-link"
                    >
                        Кабинет
                    </router-link>
                </div>

                <div class="profile__info">
                    <div class="profile__title h1">
                        {{ user.last_name }} {{ user.first_name }} {{ user.patronymic }}
                    </div>
                    <div class="profile__tabs tabs">
                        <button 
                            v-for="item in tabsItems"
                            :key="`tab-${item.name}`"
                            class="tabs__item"
                            :class="currentTabsItem === item.name && 'is-active'"
                            @click.prevent="changeTab(item.name)"
                        >
                            {{ item.label }}
                        </button>
                    </div>
                </div>
                <div class="cabinet__content">
                    <div 
                        v-if="currentTabsItem === 'public'"
                        class="profile__tab"
                    >
                        <ProfileEdit />
                        <!--ProfileUser
                            :user="profile"
                        /-->
                    </div>
                    <div 
                        v-if="currentTabsItem === 'notifications'"
                        class="profile__tab"
                    >
                        <ProfileNotifications />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { user as api } from "@/services";
    import ProfileEdit from '@/components/forms/profile-edit.vue';
    import ProfileNotifications from '@/components/forms/profile-notifications.vue';

    export default {
        components: {
            ProfileEdit,
            ProfileNotifications
        },
        data() {
            return {
                tabsItems: [{
                    label: 'Аккаунт',
                    name: 'account'
                }, {
                    label: 'Публичный профиль',
                    name: 'public'
                }, {
                    label: 'Уведомления',
                    name: 'notifications'
                }],
                currentTabsItem: this.$route.hash?.replace('#', '') || 'public',
                showLoaderSending: false,
            }
        },
        watch: {
            '$route.hash': {
                immediate: true,
                handler() {
                    this.currentTabsItem = this.$route.hash?.replace('#', '') || 'public';
                },
            },
        },
        computed: {
            user() {
                return this.$store.state.user;
            },
        },
        created() {
        },
        methods: {
            changeTab(name) {
                this.currentTabsItem = name;
                this.$router.push({ name: this.$route.name, hash: `#${name}` });
            },
        }
    }
</script>
