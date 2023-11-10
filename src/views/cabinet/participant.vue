<template>
    <div class="app__main">
        <div class="cabinet participant">
            <div class="container">
                <app-breadcrumbs 
                    :breadcrumbs="[
                        { name: 'Главная', route: { name: 'home' } },
                        { name: 'Кабинет', route: { name: 'cabinet' } },
                    ]"
                />
                <div class="participant__info">
                    <div class="participant__title h1">
                        Я - поставщик
                    </div>
                    <div class="participant__tabs tabs">
                        <template 
                            v-for="item in tabsItems"
                        >
                            <button 
                                v-if="!item.access || (item.access && user[item.access])"
                                :key="`tab-${item.name}`"
                                :class="['tabs__item', item.class, (currentTabsItem === item.name || $route.matched.some(record => record.name === item.name)) && 'is-active']"
                                @click.prevent="changeTab(item.name)"
                            >
                                {{ item.label }}
                                <span
                                    v-if="item.icon"
                                    :class="['icon', item.icon]"
                                />
                            </button>
                        </template>
                    </div>
                </div>
                <routerView />
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        components: {
        },
        data() {
            return {
                tabsItems: [{
                    label: 'Приглашения',
                    name: 'participant-invites',
                    access: 'is_access_tender'
                }, {
                    label: 'Текущие торги',
                    name: 'participant-current'
                }, {
                    label: 'Завершенные',
                    name: 'participant-closed'
                }],
                currentTabsItem: this.$route.name || 'participant-invites',
            }
        },
        watch: {
            '$route.name': {
                immediate: true,
                handler() {
                    this.currentTabsItem = this.$route.name || 'participant-invites';
                },
            },
        },
        computed: {
            user() {
                return this.$store.state.user;
            },
        },
        mounted() {
        },
        created() {
        },
        methods: {
            changeTab(name) {
                this.currentTabsItem = name;
                this.$router.push({ name: name });
            },
        }
    };
</script>
