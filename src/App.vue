<template>
    <div class="app">
        <routerView />
        <appError />
    </div>
</template>

<script>
    import appError from '@/components/app-error.vue';

    export default {
        components: {
            appError
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
<style>
    @import "assets/css/main.pcss";
</style>