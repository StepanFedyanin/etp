<template>
    <div class="app__main">
        <!-- <Breadcrumbs /> -->
        <div class="cabinet profile">
            <div class="container">
                <app-breadcrumbs 
                    :breadcrumbs="[
                        { name: 'Главная', route: { name: 'home' } },
                        { name: 'Кабинет', route: { name: 'cabinet' } },
                    ]"
                />
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
                        v-if="currentTabsItem === 'account'"
                        class="profile__tab"
                    >
                        <blockContent
                            classModifier="m--top"
                            place="top"
                            name="profile-account"
                        />
                        <ProfileAccount />
                        <blockContent
                            classModifier="m--bottom"
                            place="bottom"
                            name="profile-account"
                        />
                    </div>
                    <div 
                        v-if="currentTabsItem === 'public'"
                        class="profile__tab"
                    >
                        <blockContent
                            classModifier="m--top"
                            place="top"
                            name="profile-public"
                        />
                        <ProfileEdit />
                        <blockContent
                            classModifier="m--bottom"
                            place="bottom"
                            name="profile-public"
                        />
                    </div>
                    <div 
                        v-if="currentTabsItem === 'notifications'"
                        class="profile__tab"
                    >
                        <blockContent
                            classModifier="m--top"
                            place="top"
                            name="profile-notifications"
                        />
                        <ProfileNotifications />
                        <blockContent
                            classModifier="m--bottom"
                            place="bottom"
                            name="profile-notifications"
                        />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { user as api } from "@/services";
    import ProfileAccount from '@/components/profile-account.vue';
    import ProfileEdit from '@/components/forms/profile-edit.vue';
    import ProfileNotifications from '@/components/forms/profile-notifications.vue';
    import blockContent from '@/components/block-content.vue';

    export default {
        components: {
            ProfileAccount,
            ProfileEdit,
            ProfileNotifications,
            blockContent
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
