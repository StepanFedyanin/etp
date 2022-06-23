<template>
    <div 
        class="app"
        :class="$route.meta.requiresAuth ? 'm--with-sidebar' : ''"
    >
        <Header />
        <div class="app__block">
            <Sidebar
                v-if="$route.meta.requiresAuth"
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
        computed: {
            user() {
                return this.$store.state.user;
            }
        },
        watch: {
            $route: {
                immediate: true,
                handler(to) {
                    document.title = to.meta.title + ' - Tugan' || 'Tugan';
                }
            },
        },
        created() {
            window.onerror = (message, source, lineno, colno, err) => {
                console.error('Window error', err.message);
                this.$store.dispatch('showError', { err });
            };
        },
        errorCaptured(err, vm, info) {
            console.error('Local error', err.message, vm, info);
            this.$store.dispatch('showError', { err });
            return false;
        }
    };
</script>
<style lang="postcss">
    @import "assets/css/main.pcss";
</style>