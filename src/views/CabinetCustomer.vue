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
                        Я - Заказчик
                    </div>
                    <div 
                        v-if="!$route.name.match(/^start-/)"
                        class="participant__tabs tabs"
                    >
                        <button 
                            v-for="item in tabsItems"
                            :key="`tab-${item.name}`"
                            :class="['tabs__item', item.class, currentTabsItem === item.name && 'is-active']"
                            @click.prevent="changeTab(item.name)"
                        >
                            {{ item.label }}
                            <span
                                v-if="item.icon"
                                :class="['icon', item.icon]"
                            />
                        </button>
                    </div>
                </div>
                <routerView />
            </div>
        </div>
    </div>
</template>

<script>
    // import Breadcrumbs from '@/components/app-breadcrumbs.vue';

    export default {
        components: {
        },
        data() {
            return {
                tabsItems: [{
                    label: 'Текущие торги',
                    name: 'customer-current'
                }, {
                    label: 'Закрытые',
                    name: 'private-tender',
                    icon: 'm--private'
                }, {
                    label: 'Завершенные',
                    name: 'customer-closed'
                }, {
                    label: 'Черновики',
                    name: 'customer-drafts',
                    icon: 'm--edit'
                }, {
                    label: 'Объявить тендер',
                    name: 'tender-start',
                    class: 'm--right button'
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
