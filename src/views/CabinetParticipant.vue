<template>
    <div class="app__main">
        <div class="cabinet participant">
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
                <div class="participant__info">
                    <div class="participant__title h1">
                        Я - поставщик
                    </div>
                    <div class="participant__tabs tabs">
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
                    name: 'participant-invites'
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
