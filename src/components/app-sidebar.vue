<template>
    <div class="app__sidebar sidebar">
        <div class="sidebar__menu">
            <template
                v-for="(item, key) in menu"
            >
                <template
                    v-if="item.name === 'devider'"
                >
                    <div 
                        :key="key"
                        class="sidebar__menu-devider" 
                    />
                </template>
                <template
                    v-else
                >
                    <router-link
                        :key="key"
                        :to="{ name: item.name }"
                        :class="`m--icon-${item.icon}`"
                        class="sidebar__menu-link"
                        v-text="item.title"
                    />
                </template>
            </template>
        </div>
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
