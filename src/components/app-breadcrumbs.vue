<template>
    <div class="app__breadcrumbs breadcrumbs">
        <div class="container">
            <router-link
                :to="{ name: 'home' }"
                class="breadcrumbs__link"
            >
                Главная
            </router-link>
            <router-link
                v-for="(item, key) in $route.meta.breadcrumbs"
                :key="key"
                :to="{ name: item }"
                custom
                v-slot="{ href, route, navigate, isActive, isExactActive }"
            >
                <a 
                    :href="href"
                    :class="[isActive && 'is-active', isExactActive && 'is-subactive']"
                    class="breadcrumbs__link"
                    @click="navigate"
                >
                    {{ route.meta.title }}
                </a>
            </router-link>
            <span
                class="breadcrumbs__link is-current"
            >
                {{ $route.meta.title }}
            </span>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Breadcrumbs',
        data() {
            return {
            };
        },
    };
</script>
