<template>
    <div 
        class="app"
        :class="[$route.meta.requiresAuth || ($route.meta.showSidebarAuth && user && user.id) ? 'm--with-sidebar' : '', $route.name === 'page404' ? 'm--page404' : '', $route.meta.appClass]"
    >
        <Header
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
        <Footer />
        <appError />
    </div>
</template>

<script>
    import appError from '@/components/app-error.vue';
    import Header from '@/components/app-header.vue';
    import Footer from '@/components/app-footer.vue';
    import Sidebar from '@/components/app-sidebar.vue';

    export default {
        components: {
            appError,
            Header,
            Footer,
            Sidebar
        },
        data() {
            return {
                showSidebarBlock: false,
            };
        },
        computed: {
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
            window.onerror = (message, source, lineno, colno, err) => {
                console.error('Window error', err.message);
                this.$store.dispatch('showError', { err });
            };
        },
        mounted() {
            console.log(this.$route);
            this.$store.dispatch('hideError');
        },
        errorCaptured(err, vm, info) {
            console.error('Local error', err.message, vm, info);
            this.$store.dispatch('showError', { err });
            return false;
        },
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