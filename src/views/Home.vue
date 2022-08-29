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
                            <img
                                src="../assets/img/banner-logo-2.png"
                                class="banner__logo"
                            >
                            <img
                                src="../assets/img/banner-logo-3.png"
                                class="banner__logo"
                            >
                        </div>
                    </div>
                </div>
            </div>
            <div
                ref="auction"
                class="auction"
            >
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
                        <Search
                            @startSearch="startSearch"
                        />
                    </div>
                    <div
                        class="auction__list"
                        :class="{ 'is-scrollbar': scrollbarVisible }"
                    >
                        <div
                            v-show="scrollbarVisible"
                            class="auction__list-up"
                            @click="scrollUp"
                        />
                        <div
                            v-show="scrollbarVisible"
                            class="auction__list-down"
                            @click="scrollDown"
                        />
                        <div
                            v-if="tenderList && tenderList.count"
                            ref="list"
                            class="auction__list-inner"
                        >
                            <div
                                v-for="item in tenderList.results"
                                :key="item.id"
                                class="auction__item"
                            >
                                <div class="auction__item-left">
                                    <div class="auction__item-title">
                                        {{ item.name }}
                                    </div>
                                    <div class="auction__item-price m--mobile">
                                        {{ $helpers.toPrice(item.price, {sign: '₽'}) }}
                                    </div>
                                    <div class="auction__item-description">
                                        {{ item.description }}
                                    </div>
                                    <div class="auction__item-foot">
                                        <div class="auction__item-status">
                                            {{ item.status }}
                                        </div>
                                        <div
                                            class="auction__item-button"
                                        >
                                            <button
                                                class="button button-green"
                                                @click="$router.push({ name: 'tender', params: { id: item.id } });"
                                            >
                                                Участвовать
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div class="auction__item-right">
                                    <div class="auction__item-price">
                                        {{ $helpers.toPrice(item.price, {sign: '₽'}) }}
                                    </div>
                                    <div class="auction__item-prop">
                                        Тип аукциона: {{ item.type }}
                                    </div>
                                    <div class="auction__item-prop">
                                        Лоты: {{ item.lot_count }}
                                    </div>
                                    <div class="auction__item-prop">
                                        Категории:
                                        <span
                                            v-for="(category, idx) in item.category"
                                            :key="category.id"
                                        >
                                            {{ category.name }}
                                            <span v-if="idx != Object.keys(item.category).length - 1">, </span>
                                        </span>
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
                                <div class="needs__block-button">
                                    <button class="button button-green">
                                        потребности на сегодня
                                    </button>
                                </div>
                            </div>
                            <div class="needs__block-right">
                                <ul class="needs__block-list">
                                    <li class="needs__block-list-item">
                                        Выбирайте интересные товарные группы и следите за новыми закупками
                                    </li>
                                    <li class="needs__block-list-item">
                                        Выбирайте интересные товарные группы и следите за новыми закупками
                                    </li>
                                    <li class="needs__block-list-item">
                                        Выбирайте интересные товарные группы и следите за новыми закупками
                                    </li>
                                </ul>
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
                                <ul class="needs__block-list">
                                    <li class="needs__block-list-item">
                                        Вложенные тендеры доступны всем добросовестным поставщикам
                                    </li>
                                    <li class="needs__block-list-item">
                                        Выбирайте интересные товарные группы и следите за новыми закупками
                                    </li>
                                    <li class="needs__block-list-item">
                                        Система рейтинга добросовестных поставщиков
                                    </li>
                                </ul>
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
                                <ul class="needs__block-list">
                                    <li class="needs__block-list-item">
                                        Бесплатная регистрация и участие в тендерах
                                    </li>
                                    <li class="needs__block-list-item">
                                        Единые равные условия для всех поставщиков
                                    </li>
                                    <li class="needs__block-list-item">
                                        Стандартная проверка безопасности - как на всех площадках
                                    </li>
                                </ul>
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
                                <ul class="needs__block-list">
                                    <li class="needs__block-list-item">
                                        Бесплатная регистрация и участие в тендерах
                                    </li>
                                    <li class="needs__block-list-item">
                                        Единые равные условия для всех поставщиков
                                    </li>
                                    <li class="needs__block-list-item">
                                        Стандартная проверка безопасности - как на всех площадках
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div class="needs__buttons">
                        <div class="needs__button">
                            <button class="button button-red">
                                консультация
                            </button>
                        </div>
                        <div class="needs__button">
                            <router-link
                                :to="{ name: 'registration' }"
                                class="button button-red"
                            >
                                Регистрация
                            </router-link>
                        </div>
                        <div class="needs__button">
                            <button class="button button-green">
                                Правила работы
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { tender } from "@/services";
    // import Header from '../components/app-header.vue';
    //import Footer from '../components/app-footer.vue';
    import Search from '../components/app-search.vue';

    export default {
        name: 'Home',
        components: {
            //Header,
            //Footer,
            Search,
        },
        data() {
            return {
                limit: 10,
                tenderList: null,
                resizeObserver: null,
                scrollbarVisible: false,
            };
        },
        computed: {
            offset() {
                let limit = Number(this.limit)
                return (this.page - 1) * limit
            }
        },
        mounted () {
            if (this.$refs.auction) {
                this.resizeObserver = new ResizeObserver(this.onResize)
                this.resizeObserver.observe(this.$refs.auction)
            }

            tender.getTenderList().then(tenders => {
                this.tenderList = tenders
            }).catch(err => {
                console.error(err)
            })
        },
        methods: {
            scrollUp() {
                if (this.$refs.list) {
                    this.$refs.list.scrollTo(
                        {
                            'top': this.$refs.list.scrollTop - 240,
                            'behavior': 'smooth'
                        }
                    )
                }
            },
            scrollDown() {
                if (this.$refs.list) {
                    this.$refs.list.scrollTo(
                        {
                            'top': this.$refs.list.scrollTop + 240,
                            'behavior': 'smooth'
                        }
                    )
                }
            },
            onResize () {
                if (this.$refs.list) {
                    this.scrollbarVisible = this.$refs.list.scrollHeight > this.$refs.list.clientHeight
                }
            },
            startSearch(formData) {
                formData.limit = Number(this.limit)
                formData.offset = this.offset
                console.log(formData)
                tender.searchTenders(formData)
                    .then(tenders => {
                        console.log(tenders)
                        this.tenderList = tenders
                    }).catch(err => {
                        console.error(err)
                    })
            }
        },
    };
</script>
