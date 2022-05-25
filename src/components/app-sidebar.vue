<template>
    <div class="app__sidebar sidebar">
        <router-link
            v-for="(item, key) in menu"
            :key="key"
            :to="{ name: item.name }"
            class="sidebar__link"
            v-text="item.title"
        />
    </div>
</template>

<script>
    import { sidebarMenu } from '@/settings';
    export default {
        name: 'Sidebar',
        data() {
            return {
                menu: sidebarMenu
            };
        },
    };
</script>
