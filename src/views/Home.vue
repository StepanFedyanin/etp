<template>
    <div>
        <Header />
    
        <div class="home-page">
            <div class="banner">
                <div class="container">
                    <div class="banner__content">
                        <div class="banner__left">
                            <div class="banner__title">
                                Электронная торговая площадка
                            </div>
                            <div class="banner__subtitle">
                                для малого и среднего бизнеса
                            </div>
                            <div class="banner__description">
                                Tugan - «родной». Слово, не имеющее национальной окраски, яркое и выразительное.
                                <br>
                                Одновременно сильное и дружелюбное.
                                <br>
                                Присоединяйтесь к нам, продавайте и покупайте.
                            </div>
                            <router-link
                                :to="''"
                                class="banner__register"
                            >
                                Зарегистрироваться
                            </router-link>
                        </div>
                        <div class="banner__right">
                            <img
                                src="../assets/img/banner-logo.png"
                                class="banner__logo"
                            >
                        </div>
                    </div>
                </div>
            </div>
        </div>
    
        <Footer />
    </div>
</template>

<script>
    import Header from '../components/app-header.vue'
    import Footer from '../components/app-footer.vue'

    export default {
        name: "Home",
        components: {
            Header,
            Footer
        }
    }
</script>