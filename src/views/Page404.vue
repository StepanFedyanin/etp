<template>
    <div class="app__main">
        <div class="page404">
            <div class="container">
                <div class="page404__block">
                    <div 
                        class="page404__logo"
                    >
                        <div class="page404__logo-second">
                            <img
                                src="../assets/img/404.svg"
                                class="page404__logo-second-img"
                            >
                        </div>
                        <div class="page404__logo-main">
                            <img
                                src="../assets/img/banner-logo.png"
                                class="page404__logo-main-img"
                            >
                            <img
                                src="../assets/img/banner-logo-2.png"
                                class="page404__logo-main-img"
                            >
                            <img
                                src="../assets/img/banner-logo-3.png"
                                class="page404__logo-main-img"
                            >
                        </div>
                        <div class="page404__logo-second">
                            <img
                                src="../assets/img/404.svg"
                                class="page404__logo-second-img"
                            >
                        </div>
                    </div>
                    <div 
                        class="page404__info"
                    >
                        <div class="page404__info-title">
                            Упс!
                        </div>
                        <div class="page404__info-subtitle">
                            Мы не можем найти то, что вы ищете
                        </div>
                        <div class="page404__info-content">
                            Возможно, запрашиваемая вами страница была перенесена или удалена. Также возможно, что вы допустили небольшую опечатку при вводе адреса  — такое случается даже с нами, поэтому еще раз внимательно проверьте.
                        </div>
                        <div class="page404__info-bottom">
                            Переходите на главную страницу, там вы  сможете найти много полезной информации!
                        </div>
                        <div class="page404__info-button">
                            <button
                                class="button button-green"
                                @click="next()"
                            >
                                На главную
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Page404',
        components: {
        },
        data() {
            return {
            }
        },
        computed: {
            user() {
                return this.$store.state.user;
            },
        },
        mounted() {
        },
        methods: {
            next() {
                this.$router.push({ name: 'home' });
            }
        },
    }
</script>
