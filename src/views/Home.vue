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
                                Tugan - «родной». Слово, не имеющее национальной
                                окраски, яркое и выразительное.
                                <br>
                                Одновременно сильное и дружелюбное.
                                <br>
                                Присоединяйтесь к нам, продавайте и покупайте.
                            </div>
                            <router-link
                                :to="''"
                                class="button banner__register"
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
            <div class="auction">
                <div class="container">
                    <div class="h1 auction__title">
                        Проведено 3 500 торгов на 22.03.2022
                    </div>
                    <div class="h4 auction__subtitle">
                        В категориях: Автомобильное оборудование, Канцелярские
                        принадлежности для офиса, Органические удобрения, Услуги
                        грузоперевозок и 12 других
                    </div>
                    <div class="auction__search">
                        <Search />
                    </div>
                    <div class="auction__list">
                        <div
                            v-for="(item, key) in actionList"
                            :key="key"
                            class="auction__item"
                        >
                            <div class="auction__item-left">
                                <div class="auction__item-title">
                                    {{ item.name }}
                                </div>
                                <div class="auction__item-description">
                                    {{ item.description }}
                                </div>
                                <div class="auction__item-foot">
                                    <div class="auction__item-status">
                                        {{ item.status }}
                                    </div>
                                    <div
                                        class="button button--green auction__item-button"
                                    >
                                        Участвовать
                                    </div>
                                </div>
                            </div>
                            <div class="auction__item-right">
                                <div class="auction__item-type">
                                    Тип аукциона: {{ item.status }}
                                </div>
                                <div class="auction__item-lots">
                                    Лоты {{ item.lots }}
                                </div>
                                <div class="auction__item-cats">
                                    Категории: {{ item.cats.join(', ') }}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <Footer />
    </div>
</template>

<script>
    import Header from '../components/app-header.vue';
    import Footer from '../components/app-footer.vue';
    import Search from '../components/search.vue';

    export default {
        name: 'Home',
        components: {
            Header,
            Footer,
            Search,
        },
        data() {
            return {
                actionList: [
                    {
                        name: 'Аукцион № 1234567',
                        description:
                            'Поставка инструмента для нужд ООО "Газпром МКС" в 2022 году (для субъектов малого и среднего предпринимательства) Поставка инструмента для нужд ООО "Газпром МКС" в 2022 году (для субъектов малого и среднего предпринимательства) (БАА 22862)',
                        type: 'Открытый',
                        lots: 2,
                        cats: [
                            'Автомобильное оборудование',
                            'Канцелярские принадлежности для офиса',
                        ],
                        status: 'Идет прием заявок',
                    },
                    {
                        name: 'Аукцион № 1234567',
                        description:
                            'Поставка инструмента для нужд ООО "Газпром МКС" в 2022 году (для субъектов малого и среднего предпринимательства) Поставка инструмента для нужд ООО "Газпром МКС" в 2022 году (для субъектов малого и среднего предпринимательства) (БАА 22862)',
                        type: 'Открытый',
                        lots: 2,
                        cats: [
                            'Автомобильное оборудование',
                            'Канцелярские принадлежности для офиса',
                        ],
                        status: 'Идет прием заявок',
                    },
                    {
                        name: 'Аукцион № 1234567',
                        description:
                            'Поставка инструмента для нужд ООО "Газпром МКС" в 2022 году (для субъектов малого и среднего предпринимательства) Поставка инструмента для нужд ООО "Газпром МКС" в 2022 году (для субъектов малого и среднего предпринимательства) (БАА 22862)',
                        type: 'Открытый',
                        lots: 2,
                        cats: [
                            'Автомобильное оборудование',
                            'Канцелярские принадлежности для офиса',
                        ],
                        status: 'Идет прием заявок',
                    },
                ],
            };
        },
    };
</script>
