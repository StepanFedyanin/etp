<template>
    <div class="app__main">
        <div class="page">
            <div :class="['container']">
                <app-breadcrumbs 
                    :breadcrumbs="[
                        { name: 'Главная', route: { name: 'home' } },
                    ]"
                />
                <template
                    v-if="showLoaderSending"
                >
                    <div class="page__loader loader">
                        <div class="spinner" /> Загрузка данных
                    </div>
                </template>
                <template
                    v-else-if="page"
                >
                    <div class="page__content text">
                        <h1>{{ page.name }}</h1>
                        <div
                            v-html="page.content"
                        />
                    </div>
                    <div 
                        class="page__code"
                        v-html="page.sub_content"
                    />
                </template>
            </div>
        </div>
    </div>
</template>

<script>
    // import Header from '../components/app-header.vue';
    import { common as api } from "@/services"

    export default {
        name: 'Page',
        async preFetch({ store, currentRoute, previousRoute, redirect, ssrContext, urlPath, publicPath }) {
            console.log('Page preFetch', process.env.SERVER, currentRoute.params);
            if (!process.env.SERVER) return;
            await api.getPage(currentRoute.params?.slug).then(res => {
                let page = res;
                store.dispatch('setMeta', page);
                store.dispatch('fetchDataByKey', { data: page, key: 'page' });
            }).catch(err => {
                if (err.response.status === 404) store.dispatch('showError', err.response.status);
            });
        },
        components: {
        },
        props: {
            slug: {
                type: String,
                default() { return null; }
            },
        },
        data() {
            return {
                showLoaderSending: false
            };
        },
        watch: {
            slug: {
                //immediate: true,
                handler(to) {
                    if (!process.env.SERVER) {
                        to ? this.getPage() : this.$router.push({ name: 'page404' });
                    }
                },
            }
        },
        computed: {
            page() {
                return this.$store.state.data?.page || {};
            },
        },
        created() {
        },
        mounted() {
            this.slug ? this.getPage() : this.$router.push({ name: 'page404' });
        },
        methods: {
            getPage() {
                this.showLoaderSending = true;
                api.getPage(this.slug).then(res => {
                    let page = res;
                    this.$store.dispatch('fetchDataByKey', { data: page, key: 'page' });
                    this.$store.dispatch('setMeta', page);
                    this.showLoaderSending = false;
                }).catch(err => {
                    this.$store.dispatch('fetchDataByKey', { data: {}, key: 'page' });
                    this.$store.dispatch('setMeta', {});
                    if (err.response?.status === 404) this.$router.replace({ name: 'page404' });
                    this.showLoaderSending = false;
                })
            }
        },

    };
</script>
