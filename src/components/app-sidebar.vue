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
                        custom
                        v-slot="{ href, navigate, isActive }"
                    >
                        <div 
                            :class="menuOpenedItems[item.name] ? 'is-opened' : ''"
                            class="sidebar__menu-item"
                        >
                            <a 
                                :href="href"
                                :class="[isActive && 'is-active', `m--icon-${item.icon}`]"
                                class="sidebar__menu-link"
                                @click="navigate"
                                @click.prevent="onClickMenuItem(item.name)"
                            >
                                {{ item.title }}
                                <div
                                    v-if="item.items"
                                    class="sidebar__menu-item-arrow"
                                />
                            </a>
                            <template
                                v-if="item.items"
                            >
                                <transition name="fade">
                                    <div 
                                        v-if="menuOpenedItems[item.name]"
                                        class="sidebar__menu-item-block"
                                    >
                                        <router-link
                                            v-for="(sitem, key) in item.items"
                                            :key="key"
                                            :to="{ name: sitem.name }"
                                            custom
                                            v-slot="{ href, navigate, isActive }"
                                        >
                                            <div class="sidebar__menu-subitem">
                                                <a 
                                                    :href="href"
                                                    :class="[isActive && 'is-active']"
                                                    class="sidebar__menu-sublink"
                                                    @click="navigate"
                                                >
                                                    {{ sitem.title }}
                                                </a>
                                            </div>
                                        </router-link>
                                    </div>
                                </transition>
                            </template>
                        </div>
                    </router-link>
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
                menu: sidebarMenu,
                menuOpenedItems: {}
            };
        },
        methods: {
            onClickMenuItem(name) {
                if (!this.menuOpenedItems[name]) {
                    this.menuOpenedItems[name] = 1;
                } else {
                    delete this.menuOpenedItems[name];
                }
            }
        }
    };
</script>
