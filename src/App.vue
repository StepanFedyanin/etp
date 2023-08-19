<template>
    <div 
        class="app"
        :class="[$route.meta.requiresAuth || ($route.meta.showSidebarAuth && user && user.id) ? 'm--with-sidebar' : '', $route.name === 'page404' ? 'm--page404' : '', $route.meta.appClass]"
    >
        <HeadTag>
            <title>{{ $helpers.createTitle(meta, $route) }}</title>
            <meta
                name="description"
                :content="$helpers.createDescription(meta, $route)"
            >
            <meta
                name="keywords"
                :content="$helpers.createKeywords(meta, $route)"
            >
        </HeadTag>
        <AppHeader
            :showSidebar="showSidebarBlock"
            @showSidebar="showSidebar"
        />
        <div class="app__block">
            <Sidebar
                v-if="$route.meta.requiresAuth || ($route.meta.showSidebarAuth && user && user.id)"
                :class="showSidebarBlock ? 'is-show-sidebar' : ''"
            />
            <routerView />
        </div>
        <AppFooter />
        <appError />
    </div>
</template>

<script>
    import { common as api } from '@/services';
    import { Head as HeadTag } from '@vueuse/head';
    //import { useMeta } from 'vue-meta';
    import { helpers } from '@/utils/helpers';
    import appError from '@/components/app-error.vue';
    import AppHeader from '@/components/app-header.vue';
    import AppFooter from '@/components/app-footer.vue';
    import Sidebar from '@/components/app-sidebar.vue';

    export default {
        components: {
            appError,
            HeadTag,
            AppHeader,
            AppFooter,
            Sidebar
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
            meta() {
                return this.$store.state.meta || {};
            },
            user() {
                return this.$store.state.user;
            }
        },
        watch: {
            /*
            '$route': {
                immediate: true,
                handler(to, from) {
                    if (!from || to.fullPath !== from.fullPath) {
                        console.log(to.meta);
                        console.log(this.$route.meta);
                        document.title = to.meta.title + ' | ЭТП TUGAN' || 'ЭТП TUGAN';
                        const description = document.querySelector('head meta[name="description"]');
                        const keywords = document.querySelector('head meta[name="keywords"]');
                        description.setAttribute('content', to.meta.description || '');
                        keywords.setAttribute('content', to.meta.keywords || '');
                    }
                }
            },
            */
            '$route.name': {
                immediate: true,
                handler() {
                    this.showSidebarBlock = false;
                }
            },
        },
        created() {
            api.getMetaScheme().then(res => {
                let meta = {}; 
                res.forEach(item => { meta[item.key] = item; });
                this.$store.dispatch('setMetaScheme', meta );
            });
            /*
            window.onerror = (message, source, lineno, colno, err) => {
                console.error('Window error', err.message);
                this.$store.dispatch('showError', { err });
            };
            */
        },
        mounted() {
            console.log(this.$route);
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
<style lang="postcss">
    @import "assets/css/main.pcss";
</style>