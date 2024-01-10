<template>
    <div class="app__main">
        <div class="cabinet favorites">
            <div class="container">
                <app-breadcrumbs 
                    :breadcrumbs="[
                        { name: 'Главная', route: { name: 'home' } },
                        { name: 'Кабинет', route: { name: 'cabinet' } },
                    ]"
                />
                <h1 class="h1">
                    Избранное
                </h1>
                <div class="organization__tabs tabs">
                    <a
                        href="#" 
                        v-for="item in tabsItems"
                        :key="`tab-${item.name}`"
                        :class="['tabs__item', $route.name === item.name && 'is-active']"
                        @click.prevent="changeTab(item.name)"
                    >
                        {{ item.label }}
                    </a>
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
        props: {
            tabName: {
                type: String,
                default() { return null; }
            },
        },
        data() {
            return {
                tabsItems: [{
                    label: 'Контрагенты',
                    name: 'favorites-contragents'
                }, {
                    label: 'Тендеры',
                    name: 'favorites-tenders'
                }],
            }
        },
        mounted() {
        },
        beforeDestroy() {
        },
        created() {
        },
        methods: {
            changeTab(name) {
                this.$router.push({ name: name });
            },
        }
    };
</script>
