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
                                Наша цель - объединить предпринимателей и сделать процесс закупок честным, удобным и выгодным.<br>
                                Используйте TUGAN в качестве собственной ЭТП или участвуйте в существующих тендерах.<br>
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
                <div class="container m--1460">
                    <div class="auction__search">
                        <div class="h1 auction__title">
                            Новые тендеры в категориях:
                        </div>
                        <template
                            v-if="showLoaderGroups"
                        >
                            <div class="auction__loader loader">
                                <div class="spinner" /> Загрузка групп
                            </div>
                        </template>
                        <template
                            v-else-if="groups && groups.count"
                        >
                            <div class="h4 auction__subtitle">
                                <span
                                    v-for="idx in 5"
                                    :key="`group-${idx}`"
                                >
                                    <router-link
                                        :to="{ name: 'groups' }"
                                        v-text="groups.results[idx - 1].name"
                                    />,
                                </span>
                                и
                                <router-link
                                    :to="{ name: 'groups' }"
                                >
                                    {{ groups.count - 5 }} других категориях.
                                </router-link>
                            </div>
                        </template>
                        <Search
                            @startSearch="startSearch"
                        />
                    </div>
                    <div
                        class="auction__list"
                        :class="{ '_is-scrollbar' : scrollbarVisible }"
                    >
                        <!--div
                            v-show="scrollbarVisible"
                            class="auction__list-up"
                            @click="scrollUp"
                        />
                        <div
                            v-show="scrollbarVisible"
                            class="auction__list-down"
                            @click="scrollDown"
                        /-->
                        <template
                            v-if="showLoaderTenders"
                        >
                            <div class="auction__list-loader loader">
                                <div class="spinner" /> Загрузка данных
                            </div>
                        </template>
                        <template
                            v-else-if="tenderList && tenderList.count"
                        >
                            <div
                                ref="list"
                                class="auction__list-inner tenders"
                            >
                                <blockTenderHome
                                    v-for="(tender, index) in tenderList.results"
                                    :key="`tender-${index}`"
                                    :tender="tender"
                                />
                            </div>
                        </template>
                    </div>
                </div>
            </div>
            <div 
                v-if="showFeatures"
                class="features"
            >
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
            <div class="container m--1460 capabilities">
                <div class="h1">
                    Бизнес для своих
                </div>
                <div class="capabilities__content content">
                    <p>Мы создаем полноценную социальную платформу для малого и среднего бизнеса, основанную на взаимопомощи и качественных поставках друг другу.</p>
                </div>
                <div 
                    class="capabilities__block"
                >
                    <div class="capabilities__item">
                        <div class="capabilities__item-title">
                            Участвуйте в тендерах
                        </div>
                        <div class="capabilities__item-description">
                            <ul>
                                <li>ознакомьтесь с тендерами и запросами котировок, проходящими прямо сейчас;</li>
                                <li>воспользуйтесь фильтром по региону поставки, товарным группам и другим параметрам;</li>
                                <li>подавайте заявки на участие и побеждайте!</li>
                            </ul>
                        </div>
                    </div>
                    <div class="capabilities__item">
                        <div class="capabilities__item-title">
                            Проводите тендеры
                        </div>
                        <div class="capabilities__item-description">
                            <ul>
                                <li>объявите собственный тендер или запрос котировок;</li>
                                <li>пригласите к участию бизнес-партнеров, уже знакомых вам, и принимайте заявки от новых проверенных контрагентов;</li>
                                <li>организуйте связанный тендер, чтобы купить все необходимое для исполнения обязательств.</li>
                            </ul>
                        </div>
                    </div>
                    <div class="capabilities__item">
                        <div class="capabilities__item-title">
                            Контролируйте исполнение обязательств
                        </div>
                        <div class="capabilities__item-description">
                            <ul>
                                <li>устанавливайте четкий срок исполнения обязательств по тендеру;</li>
                                <li>следите за победителями ваших тендеров и за их закупками;</li>
                                <li>все возникшие вопросы и трудности решайте в собственных чатах тендера.</li>
                            </ul>
                        </div>
                    </div>
                    <div class="capabilities__item">
                        <div class="capabilities__item-title">
                            Приглашайте своих партнеров
                        </div>
                        <div class="capabilities__item-description">
                            <ul>
                                <li>пригласите на площадку тех, с кем ваша компания уже торгует;</li>
                                <li>сделайте ваш процесс закупок более прозрачным и удобным;</li>
                                <li>укрепляйте связи с проверенными партнерами.</li>
                            </ul>
                        </div>
                    </div>
                    <div class="capabilities__item">
                        <div class="capabilities__item-title">
                            Обретайте новые связи
                        </div>
                        <div class="capabilities__item-description">
                            <ul>
                                <li>ознакомьтесь со списком организаций, зарегистрированных на площадке;</li>
                                <li>узнайте, какие тендеры проводит организация, а в каких — участвует;</li>
                                <li>пригласите интересных контрагентов к участию в ваших тендерах.</li>
                            </ul>
                        </div>
                    </div>
                    <div class="capabilities__item">
                        <div class="capabilities__item-title">
                            Будьте на равных
                        </div>
                        <div class="capabilities__item-description">
                            <ul>
                                <li>регистрация, участие в тендерах, создание тендеров — сейчас бесплатно для всех;</li>
                                <li>единые равные условия для всех поставщиков, главное для нас — ваша добросовестность;</li>
                                <li>стандартная проверка безопасности — как на всех подобных площадках.</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>            
            <div class="needs">
                <div class="container m--1460">
                    <div class="needs__blocks">
                        <!--
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
                        -->
                        <div class="needs__block">
                            <div class="needs__block-left">
                                <div class="needs__block-title">
                                    Присоединяйтесь
                                </div>
                                <div class="needs__block-description">
                                    Если возникнут трудности или вопросы - обратитесь за консультацией по телефону +7 (343) 344-83-83.
                                </div>
                            </div>
                            <div class="needs__block-right">
                                <div class="needs__block-button">
                                    <router-link
                                        :to="{ name: 'registration' }"
                                        class="button button-green m--big"
                                    >
                                        Регистрация
                                    </router-link>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!--
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
                    -->
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { category, tender } from "@/services";
    import Search from '../components/app-search.vue';
    import BlockTenderHome from '../components/block-tender-home.vue';

    export default {
        name: 'Home',
        components: {
            Search,
            BlockTenderHome
        },
        data() {
            return {
                groups: null,
                showLoaderGroups: false,
                limit: 5,
                tenderList: null,
                showLoaderTenders: false,
                resizeObserver: null,
                scrollbarVisible: false,
                showFeatures: false
            };
        },
        computed: {
            offset() {
                let limit = Number(this.limit)
                return (this.page - 1) * limit
            }
        },
        mounted () {
            /*
            if (this.$refs.auction) {
                this.resizeObserver = new ResizeObserver(this.onResize)
                this.resizeObserver.observe(this.$refs.auction)
            }
            */
            this.getGroups();
            this.getTenders();
        },
        methods: {
            /*
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
            */
            startSearch(formData) {
                formData.limit = Number(this.limit)
                formData.offset = this.offset
                tender.searchTenders(formData)
                    .then(tenders => {
                        console.log(tenders)
                        this.tenderList = tenders
                    }).catch(err => {
                        console.error(err)
                    })
            },
            getTenders() {
                let params = {
                    limit: this.limit,
                    offset: 0,
                }
                this.showLoaderTenders = true;
                tender.getTenderList(params).then(tenders => {
                    this.showLoaderTenders = false;
                    this.tenderList = tenders
                }).catch(err => {
                    this.showLoaderTenders = false;
                    console.error(err)
                })
            },
            getGroups() {
                let params = {
                }
                this.showLoaderGroups = true;
                category.getCategoryList(params).then(res => {
                    this.groups = res
                    this.showLoaderGroups = false;
                }).catch(err => {
                    this.showLoaderGroups = false;
                    console.error(err)
                })
            }
        },
    };
</script>
