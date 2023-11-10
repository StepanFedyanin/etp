<template>
    <div class="app__main">
        <div class="cabinet customer">
            <div class="container">
                <app-breadcrumbs 
                    :breadcrumbs="[
                        { name: 'Главная', route: { name: 'home' } },
                        { name: 'Кабинет', route: { name: 'cabinet' } },
                    ]"
                />
                <div class="customer__info">
                    <div class="customer__title h1">
                        Я - Заказчик
                    </div>
                    <div 
                        v-if="!$route.name.match(/^start-/)"
                        class="customer__tabs tabs"
                    >
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
                    name: 'customer-private',
                    icon: 'm--private'
                }, {
                    label: 'Завершенные',
                    name: 'customer-closed'
                }, {
                    label: 'Черновики',
                    name: 'customer-drafts',
                    icon: 'm--edit',
                    access: 'is_access_tender'
                }, {
                    label: 'Объявить тендер',
                    name: 'tender-start',
                    class: 'm--right button',
                    access: 'is_access_tender'
                }],
                currentTabsItem: this.$route.name || 'customer-current',
            }
        },
        watch: {
            '$route.name': {
                immediate: true,
                handler() {
                    this.currentTabsItem = this.$route.name || 'customer-current';
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
