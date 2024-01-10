<template>
    <div 
        class="app"
        :class="[$route.name === 'page404' ? 'm--page404' : '', $route.meta.appClass]"
    >
        <MetaTags 
            :route="$route"
            :data="$store.state.meta"
        />
        <AppHeader
            :showSidebar="showSidebarBlock"
            @showSidebar="showSidebar"
        />
        <!--
        Header End -->
        <div class="app__block">
            <AppSidebar
                v-if="$route.meta.requiresAuth || ($route.meta.showSidebarAuth && user && user.id)"
                :class="showSidebarBlock ? 'is-show-sidebar' : ''"
            />
            <Page404 v-if="showErrorPage404" />
            <Page500 v-if="showErrorPage500" />
            <routerView v-else />
        </div>
        <!--
        Main End -->
        <AppFooter />
        <!--
        Footer End -->
        <ModalError />
    </div>
</template>

<script>
    import { common as api } from '@/services';
    import MetaTags from '@/components/meta-tags.vue';
    //import { Head as HeadTag } from '@vueuse/head';
    //import { useMeta } from 'vue-meta';
    import { helpers } from '@/utils/helpers';
    import AppHeader from '@/components/app-header.vue';
    import AppFooter from '@/components/app-footer.vue';
    import AppSidebar from '@/components/app-sidebar.vue';
    import Page404 from '@/views/Page404.vue';
    import Page500 from '@/views/Page500.vue';
    import ModalError from '@/components/modals/error.vue';

    export default {
        async preFetch({ store, currentRoute, previousRoute, redirect, ssrContext, urlPath, publicPath }) {
            console.log('App preFetch', process.env.MODE);
            if (currentRoute.name === 'page500') return;
            if (!process.env.SERVER) return;
            await api.getMetaScheme().then(res => {
                let meta = {}; 
                res.forEach(item => { meta[item.key] = item; });
                return store.dispatch('setMetaScheme', meta );
            });
        },
        components: {
            MetaTags,
            AppHeader,
            AppFooter,
            AppSidebar,
            Page404,
            Page500,
            ModalError,
        },
        /*
        setup (props, context) {
            console.log('MetaTags', props, context);
            const $helpers = helpers;
            useMeta({
                title: '12123', //$helpers.createTitle(props.data, props.route),
                description: '23', //$helpers.createDescription(props.data, props.route),
                keywords: '123', //$helpers.createKeywords(props.data, props.route),
            });
        },
        */
        data() {
            return {
                showSidebarBlock: false,
            };
        },
        computed: {
            user() {
                return this.$store.state.user;
            },
            showErrorPage404() {
                return this.$store.state.showErrorPage?.response?.status === 404;
            },
            showErrorPage500() {
                return this.$store.state.showErrorPage?.response?.status === 500;
            }
        },
        watch: {
            '$route.name': {
                immediate: true,
                handler() {
                    this.showSidebarBlock = false;
                }
            },
        },
        created() {
            /*
            window.onerror = (message, source, lineno, colno, err) => {
                console.error('Window error', err.message);
                this.$store.dispatch('showError', { err });
            };
            */
        },
        mounted() {
            api.getMetaScheme().then(res => {
                let meta = {}; 
                res.forEach(item => { meta[item.key] = item; });
                this.$store.dispatch('setMetaScheme', meta );
            });
            this.$store.dispatch('hideError');
        },
        /*
        errorCaptured(err, vm, info) {
            console.error('Local error', err.message, vm, info);
            this.$store.dispatch('showError', { err });
            return false;
        },
        */
        methods: {
            showSidebar(show) {
                this.showSidebarBlock = show;
            }
        }
    };
</script>
<style>
    @import "assets/css/main.pcss";
</style>