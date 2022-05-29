<template>
    <div class="app__main m--no-padding">
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
                                :to="{ name: 'registration' }"
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
                    <div class="auction__list-wrapper">
                        <div class="auction__list">
                            <div
                                v-for="(item, key) in auctionList"
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
                                            class="button button-green auction__item-button"
                                        >
                                            Участвовать
                                        </div>
                                    </div>
                                </div>
                                <div class="auction__item-right">
                                    <div class="auction__item-prop">
                                        Тип аукциона: {{ item.status }}
                                    </div>
                                    <div class="auction__item-prop">
                                        Лоты: {{ item.lots }}
                                    </div>
                                    <div class="auction__item-prop">
                                        Категории: {{ item.cats.join(', ') }}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="features">
                <div class="container">
                    <div class="h1 features__title">
                        Бизнес для своих
                    </div>
                    <div class="features__description">
                        Мы хотим создать полноценную социальную платформу для малого и среднего бизнеса, основанную на взаимопомощи и качественных поставках друг другу.
                    </div>
                    <div class="features__blocks">
                        <div class="features__block features__block--red">
                            <div class="features__block-title">
                                2 000 123 456
                            </div>
                            <div class="features__block-description">
                                Объем закупок в рублях<br>за всю историю площадки
                            </div>
                        </div>
                        <div class="features__block features__block--green">
                            <div class="features__block-title">
                                3 500
                            </div>
                            <div class="features__block-description">
                                Проведено торгов<br>за время работы
                            </div>
                        </div>
                        <div class="features__block features__block--aqua">
                            <div class="features__block-title">
                                234
                            </div>
                            <div class="features__block-description">
                                Активные поставщики,<br>готовые к сотрудничеству
                            </div>
                        </div>
                    </div>
                    <div class="features__wide">
                        <div class="features__wide-title">
                            Возможности площадки
                        </div>
                        <ul class="features__wide-list">
                            <li class="features__wide-list-item">
                                Вложенные тендеры
                            </li>
                            <li class="features__wide-list-item">
                                Оценка поставщиков, система качества
                            </li>
                            <li class="features__wide-list-item">
                                Аналитика по тендерам
                            </li>
                            <li class="features__wide-list-item">
                                Общение по каждому тендеру
                            </li>
                            <li class="features__wide-list-item">
                                Удобное хранилище типовых документов
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="needs">
                <div class="container">
                    <div class="needs__blocks">
                        <div class="needs__block">
                            <div class="needs__block-left">
                                <div class="needs__block-title">
                                    Помогайте друг другу
                                </div>
                                <div class="needs__block-description">
                                    Текст о наших потребностях
                                </div>
                                <div class="button button-green needs__block-button">
                                    потребности на сегодня
                                </div>
                            </div>
                            <div class="needs__block-right">
                                <div class="needs__block-list">
                                    <div class="needs__block-list-item">
                                        Выбирайте интересные товарные группы и следите за новыми закупками
                                    </div>
                                    <div class="needs__block-list-item">
                                        Выбирайте интересные товарные группы и следите за новыми закупками
                                    </div>
                                    <div class="needs__block-list-item">
                                        Выбирайте интересные товарные группы и следите за новыми закупками
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="needs__block">
                            <div class="needs__block-left">
                                <div class="needs__block-title">
                                    продавайте и покупайте
                                </div>
                                <div class="needs__block-description">
                                    Если вам не хватает ресурсов для обеспечения поставки по тендеру - организуйте собственный тендер для всего необходимого
                                </div>
                            </div>
                            <div class="needs__block-right">
                                <div class="needs__block-list">
                                    <div class="needs__block-list-item">
                                        Вложенные тендеры доступны всем добросовестным поставщикам
                                    </div>
                                    <div class="needs__block-list-item">
                                        Выбирайте интересные товарные группы и следите за новыми закупками
                                    </div>
                                    <div class="needs__block-list-item">
                                        Система рейтинга добросовестных поставщиков
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="needs__block">
                            <div class="needs__block-left">
                                <div class="needs__block-title">
                                    Присоединяйтесь
                                </div>
                                <div class="needs__block-description">
                                    Если возникнут трудности или вопросы - обратитесь за консультацией по телефону 8 (800) 123-45-67 или воспользуйтесь формой на сайте
                                </div>
                            </div>
                            <div class="needs__block-right">
                                <div class="needs__block-list">
                                    <div class="needs__block-list-item">
                                        Бесплатная регистрация и участие в тендерах
                                    </div>
                                    <div class="needs__block-list-item">
                                        Единые равные условия для всех поставщиков
                                    </div>
                                    <div class="needs__block-list-item">
                                        Стандартная проверка безопасности - как на всех площадках
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="needs__block">
                            <div class="needs__block-left">
                                <div class="needs__block-title">
                                    Присоединяйтесь
                                </div>
                                <div class="needs__block-description">
                                    Если возникнут трудности или вопросы - обратитесь за консультацией по телефону 8 (800) 123-45-67 или воспользуйтесь формой на сайте
                                </div>
                            </div>
                            <div class="needs__block-right">
                                <div class="needs__block-list">
                                    <div class="needs__block-list-item">
                                        Бесплатная регистрация и участие в тендерах
                                    </div>
                                    <div class="needs__block-list-item">
                                        Единые равные условия для всех поставщиков
                                    </div>
                                    <div class="needs__block-list-item">
                                        Стандартная проверка безопасности - как на всех площадках
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="needs__buttons">
                        <div class="button button-red needs__button">
                            консультация
                        </div>
                        <div class="button button-red needs__button">
                            Регистрация
                        </div>
                        <div class="button button-green needs__button">
                            Правила работы
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    // import Header from '../components/app-header.vue';
    //import Footer from '../components/app-footer.vue';
    import Search from '../components/search.vue';

    export default {
        name: 'Home',
        components: {
            //Header,
            //Footer,
            Search,
        },
        data() {
            return {
                auctionList: [
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
