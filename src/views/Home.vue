<template>
    <div class="app__main">
        <div class="home-page">
            <div class="container m--1460">
                <div class="banner">
                    <div class="banner__content">
                        <div class="banner__left">
                            <div class="banner__title">
                                Электронная торговая площадка
                            </div>
                            <div class="banner__subtitle">
                                для малого и среднего бизнеса
                            </div>
                            <div class="banner__description">
                                <p>Наша цель - объединить предпринимателей<br> и сделать процесс закупок честным, удобным и выгодным.</p>
                                <p>Используйте TUGAN в качестве собственной ЭТП<br>  или участвуйте в существующих тендерах.</p>
                                <p>Присоединяйтесь к нам, продавайте и покупайте.</p>
                            </div>
                            <router-link
                                :to="{ name: user && user.id ? 'cabinet' : 'registration' }"
                                class="button button-green banner__register"
                            >
                                {{ user && user.id ? 'Мой кабинет' : 'Зарегистрироваться' }}
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
            <div class="container m--1460">
                <div class="home-page__alert">
                    <div class="home-page__alert-title">
                        Организуйте собственные закупки или участвуйте в тендерах
                    </div>
                    <div class="home-page__alert-content">
                        Работа на площадке TUGAN позволяет упростить собственный процесс закупок — на равных и выгодных для всех условиях.
                    </div>
                </div>
            </div>
            <div class="container m--1460 capabilities">
                <div 
                    class="capabilities__block"
                >
                    <div class="capabilities__item">
                        <div class="capabilities__item-title">
                            Организаторам
                        </div>
                        <div class="capabilities__item-description">
                            <ul>
                                <li>Неограниченное количество собственных тендеров и запросов цен;</li>
                                <li>Возможность пригласить к участию бизнес-партнеров, уже знакомых вам, и принимать заявки от новых контрагентов;</li>
                                <li>Итоги каждого тендера в подробной и наглядной форме.</li>
                            </ul>
                        </div>
                    </div>
                    <div class="capabilities__item">
                        <div class="capabilities__item-title">
                            Поставщикам
                        </div>
                        <div class="capabilities__item-description">
                            <ul>
                                <li>Удобный каталог тендеров и запросов цен, проходящих прямо сейчас;</li>
                                <li>Фильтры по региону поставки, товарным группам и другим параметрам;</li>
                                <li>Свободная подача заявок на участие в тендерах — быстро и бесплатно!</li>
                            </ul>
                        </div>
                    </div>
                    <div class="capabilities__item">
                        <div class="capabilities__item-title">
                            Всем
                        </div>
                        <div class="capabilities__item-description">
                            <ul>
                                <li>Уведомления обо всех важных событиях в тендерах — внутри площадки и на e-mail;</li>
                                <li>Возможность организовать цепочку закупок при помощи связанных тендеров;</li>
                                <li>Общий чат тендера и приватные чаты - для решения всех вопросов, возникших в ходе тендера.</li>
                            </ul>
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
                            Новые тендеры:
                        </div>
                        <!--template
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
                        </template-->
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
            <div class="container m--1460">
                <div class="home-page__alert">
                    <div class="home-page__alert-title">
                        Больше возможностей
                    </div>
                    <div class="home-page__alert-content">
                        Мы работаем над нововведениями, которые позволят нам построить настоящую бизнес-платформу с массой возможностей для бизнеса.<br>Некоторые из них вы можете увидеть уже сейчас!
                    </div>
                </div>
            </div>
            <div class="container m--1460 capabilities">
                <div 
                    class="capabilities__block"
                >
                    <div class="capabilities__item">
                        <div class="capabilities__item-title">
                            <span class="m--color-green">Товары и услуги</span>
                        </div>
                        <div class="capabilities__item-description">
                            <ul>
                                <li>Размещайте на площадке предложения собственных товаров и услуг;</li>
                                <li>Продвигайте свою продукцию с нашей помощью и с поддержкой сообщества;</li>
                                <li>Оставляйте заявки на товары других поставщиков, которые заинтересовали вас.</li>
                            </ul>
                        </div>
                        <router-link
                            :to="{ name: 'groups' }"
                            class="button capabilities__item-button button-green"
                        >
                            К товарным группам
                        </router-link>
                    </div>
                    <div class="capabilities__item">
                        <div class="capabilities__item-title">
                            <span class="m--color-green">Раздел контрагентов</span>
                        </div>
                        <div class="capabilities__item-description">
                            <ul>
                                <li>Расскажите всем о себе, оставьте контактные данные, получайте новые обращения;</li>
                                <li>Ознакомьтесь со списком организаций, зарегистрированных на площадке;</li>
                                <li>Узнайте, какие тендеры проводит организация и какую продукцию предлагает.</li>
                            </ul>
                        </div>
                        <router-link
                            :to="{ name: 'contragents' }"
                            class="button capabilities__item-button button-green"
                        >
                            К контрагентам
                        </router-link>
                    </div>
                    <div class="capabilities__item">
                        <div class="capabilities__item-title">
                            <span class="m--color-red">Скоро:</span> блоги компаний
                        </div>
                        <div class="capabilities__item-description">
                            <ul>
                                <li>Пишите от своего имени или от имени вашей компании без ограничений;</li>
                                <li>Делитесь друг с другом новостями и успехами вашего бизнеса;</li>
                                <li>Узнавайте обо всех обновлениях и планах по развитию площадки TUGAN.</li>
                            </ul>
                        </div>
                        <router-link
                            :to="{ name: user && user.id ? 'cabinet' : 'registration' }"
                            class="button capabilities__item-button button-green"
                        >
                            {{ user && user.id ? 'Мой кабинет' : 'К регистрации' }}
                        </router-link>
                    </div>
                </div>
            </div>
            <div class="goods">
                <div class="container m--1460">
                    <div class="goods__title h1">
                        Новые товары
                    </div>
                    <template
                        v-if="showLoaderGoods"
                    >
                        <div class="goods__loader loader">
                            <div class="spinner" /> Загрузка данных
                        </div>
                    </template>
                    <template
                        v-else
                    >    
                        <div class="goods__block">
                            <blockGoodsItem
                                v-for="item in goods"
                                :key="`good-${item.id}`"
                                :good="item"
                                :showOrganization="true"
                            />
                        </div>
                    </template>
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

            <div class="container m--1460">
                <div class="home-page__alert">
                    <div class="home-page__alert-title">
                        Социальная бизнес-платформа
                    </div>
                    <div class="home-page__alert-content">
                        Мы создаем платформу для всех представителей малого и среднего бизнеса, основанную на взаимопомощи и качественных поставках друг другу.
                    </div>
                </div>
            </div>

            <div class="container m--1460 capabilities">
                <div 
                    class="capabilities__block"
                >
                    <div class="capabilities__item">
                        <div class="capabilities__item-title">
                            Приглашайте своих партнеров
                        </div>
                        <div class="capabilities__item-description">
                            <ul>
                                <li>Пригласите на площадку тех, с кем ваша компания уже торгует;</li>
                                <li>Сделайте ваш процесс закупок более прозрачным и удобным;</li>
                                <li>Укрепляйте связи с проверенными партнерами.</li>
                            </ul>
                        </div>
                    </div>
                    <div class="capabilities__item">
                        <div class="capabilities__item-title">
                            Обретайте связи
                        </div>
                        <div class="capabilities__item-description">
                            <ul>
                                <li>Ознакомьтесь со списком организаций, зарегистрированных на площадке;</li>
                                <li>Обменивайтесь контактами, обращайтесь друг к другу за необходимой продукцией;</li>
                                <li>Пригласите интересных контрагентов к участию в ваших тендерах.</li>
                            </ul>
                        </div>
                    </div>
                    <div class="capabilities__item">
                        <div class="capabilities__item-title">
                            Будьте на равных
                        </div>
                        <div class="capabilities__item-description">
                            <ul>
                                <li>Регистрация, участие в тендерах, создание тендеров — сейчас бесплатно для всех;</li>
                                <li>Все участники платформы проверены на благонадежность в системе Контур.Фокус;</li>
                                <li>Единые равные условия для всех поставщиков, главное для нас — ваша добросовестность.</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            <div class="container m--1460">
                <div class="home-page__alert">
                    <div class="home-page__alert-content m--flex">
                        <div class="home-page__alert-buttons">
                            <template
                                v-if="user && user.id"
                            >
                                <router-link
                                    :to="{ name: 'cabinet' }"
                                    class="button button-outline-green button-width-auto"
                                >
                                    Мой кабинет
                                </router-link>
                            </template>
                            <template
                                v-else
                            >
                                <router-link
                                    :to="{ name: 'registration' }"
                                    class="button button-outline-green button-width-auto"
                                >
                                    Регистрация
                                </router-link>
                                <router-link
                                    :to="{ name: 'auth' }"
                                    class="button button-outline-green button-width-auto"
                                >
                                    Вход
                                </router-link>
                            </template>
                        </div>
                        <p>
                            Если возникнут трудности, вопросы или предложения по сотрудничеству —<br>обратитесь к нам по телефону <a href="tel:+73433448383">+7 (343) 344-83-83</a>.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { category, tender, product } from "@/services";
    import Search from '../components/app-search.vue';
    import BlockTenderHome from '../components/block-tender-home.vue';
    import blockGoodsItem from '@/components/block-goods-item.vue';

    export default {
        name: 'Home',
        components: {
            Search,
            BlockTenderHome,
            blockGoodsItem
        },
        data() {
            return {
                groups: null,
                showLoaderGroups: false,
                limit: 5,
                tenderList: null,
                showLoaderTenders: false,
                goods: null,
                showLoaderGoods: false,
                resizeObserver: null,
                scrollbarVisible: false,
                showFeatures: false
            };
        },
        computed: {
            user() {
                return this.$store.state.user;
            },
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
            
            //this.getGroups();
            this.getTenders();
            this.getGoods();
        },
        methods: {
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
            getGoods() {
                let params = {
                    limit: 12,
                    offset: 0
                };
                this.showLoaderGoods = true;
                product.getProducts(params).then(res => {
                    this.goods = res.results;
                    this.showLoaderGoods = false;
                    console.log(res)
                }).catch(err => {
                    this.showLoaderGoods = false;
                    console.error(err)
                })
            },
            getTenders() {
                let params = {
                    limit: 3,
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
