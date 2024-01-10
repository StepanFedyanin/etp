<template>
    <div class="app__main">
        <div class="home-page">
            <div class="container">
                <div class="banner">
                    <div class="banner__content">
                        <div class="banner__left">
                            <h1 class="banner__title">Социальная бизнес-платформа TUGAN</h1>
                            <div class="banner__description">
                                <p>Используйте TUGAN в качестве собственной ЭТП или участвуйте в существующих тендерах.</p>
                                <p>Присоединяйтесь к нам, продавайте и покупайте.</p>
                            </div>
                            <q-no-ssr>
                                <router-link
                                    :to="{ name: user && user.id ? 'cabinet' : 'registration' }"
                                    class="button button-outline-green banner__register"
                                >
                                    {{ user && user.id ? 'Мой кабинет' : 'Бесплатная регистрация' }}
                                </router-link>
                            </q-no-ssr>
                        </div>
                        <div class="banner__right">
                            <img
                                src="../assets/img/banner-logo.png"
                                class="banner__logo"
                                alt="TUGAN"
                            >
                            <img
                                src="../assets/img/banner-logo-2.png"
                                class="banner__logo"
                                alt="TUGAN"
                            >
                            <img
                                src="../assets/img/banner-logo-3.png"
                                class="banner__logo"
                                alt="TUGAN"
                            >
                        </div>
                    </div>
                </div>
                <blockContent
                    classModifier="m--top"
                    place="top"
                    name="global"
                />
                <blockContent
                    classModifier="m--top"
                    place="top"
                    :name="$route.name"
                />
                <div class="home-page__top">
                    <h2 class="home-page__top-title">Организуйте собственные закупки или участвуйте в тендерах</h2>
                    <div class="home-page__top-content content">
                        <p>Наша цель - объединить предпринимателей малого и среднего бизнеса, сделать процесс закупок честным, удобным и выгодным.</p>
                        <p>Работа на площадке TUGAN позволяет упростить собственный процесс закупок.</p>
                        <p>Разместите тендер бесплатно и за 5 минут, пригласите собственных проверенных поставщиков.</p>
                        <p>Участвуйте в тендерах, проходящих на площадке. У нас нет комиссии и платежей за подачу заявки или за победу в тендере.</p>
                    </div>
                </div>
                <div class="capabilities">
                    <div class="capabilities__block">
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
                    <div class="auction__search">
                        <div class="h1 auction__title">
                            Новые тендеры:
                        </div>
                        <Search
                            @startSearch="startSearch"
                        />
                    </div>
                    <div class="auction__list">
                        <template v-if="showLoaderTenders">
                            <div class="auction__list-loader loader">
                                <div class="spinner" /> Загрузка данных
                            </div>
                        </template>
                        <template v-else-if="tenders && tenders.count">
                            <div
                                ref="list"
                                class="auction__list-inner tenders__block"
                            >
                                <blockTender
                                    v-for="(tender, index) in tenders.results"
                                    :key="`tender-${index}`"
                                    :tender="tender"
                                />

                            </div>
                        </template>
                    </div>
                </div>

                <div class="home-page__alert">
                    <div class="home-page__alert-title">
                        Больше возможностей
                    </div>
                    <div class="home-page__alert-content">
                        Мы работаем над нововведениями, которые позволят нам построить настоящую бизнес-платформу с массой возможностей для бизнеса.<br>Некоторые из них вы можете увидеть уже сейчас!
                    </div>
                </div>

                <div class="capabilities">
                    <div class="capabilities__block">
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
                                :to="{ name: 'products' }"
                                class="button capabilities__item-button button-green"
                            >
                                В маркет
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
                            <q-no-ssr>
                                <router-link
                                    :to="{ name: user && user.id ? 'cabinet' : 'registration' }"
                                    class="button capabilities__item-button button-green"
                                >
                                    {{ user && user.id ? 'Мой кабинет' : 'К регистрации' }}
                                </router-link>
                            </q-no-ssr>
                        </div>
                    </div>
                </div>
                <div class="goods m--block">
                    <template v-if="showLoaderGoods">
                        <div class="goods__loader loader">
                            <div class="spinner" /> Загрузка данных
                        </div>
                    </template>
                    <template v-else>    
                        <div class="goods__title h2">
                            Новые товары
                            <div
                                class="goods__title-more"
                                @click="$router.push({ name: 'products' })"
                            >
                                <span>Показать все <span>({{ goods?.count }})</span></span>
                            </div>
                        </div>
                        <div class="goods__block">
                            <blockGoodsItem
                                v-for="item in goods?.results"
                                :key="`good-${item.id}`"
                                :good="item"
                                :showCategory="true"
                                :showOrganization="true"
                            />
                        </div>
                    </template>
                </div>
                <div 
                    v-if="showFeatures"
                    class="features"
                >
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

                <div class="home-page__alert">
                    <div class="home-page__alert-title">
                        Социальная бизнес-платформа
                    </div>
                    <div class="home-page__alert-content">
                        Мы создаем платформу для всех представителей малого и среднего бизнеса, основанную на взаимопомощи и качественных поставках друг другу.
                    </div>
                </div>

                <div class="capabilities">
                    <div class="capabilities__block">
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

                <div class="home-page__alert">
                    <div class="home-page__alert-content m--flex">
                        <div class="home-page__alert-buttons">
                            <q-no-ssr>
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
                            </q-no-ssr>
                        </div>
                        <p>
                            Если возникнут трудности, вопросы или предложения по сотрудничеству —<br>обратитесь к нам по телефону <a href="tel:+73433448383">+7 (343) 344-83-83</a>.
                        </p>
                    </div>
                </div>
                <blockContent
                    classModifier="m--bottom"
                    place="bottom"
                    name="global"
                />
                <blockContent
                    classModifier="m--bottom"
                    place="bottom"
                    :name="$route.name"
                />
            </div>
        </div>
    </div>
</template>

<script>
    import { category, tender, product } from "@/services";
    import Search from '@/components/tenders-search.vue';
    import blockContent from '@/components/block-content.vue';
    import BlockTender from '@/components/block-tender.vue';
    import blockGoodsItem from '@/components/block-goods-item.vue';

    export default {
        name: 'Home',
        async preFetch({ store, currentRoute, previousRoute, redirect, ssrContext, urlPath, publicPath }) {
            console.log('AppHome preFetch')
            if (!process.env.SERVER) return;
            store.dispatch('setMeta', {});
            let params = {
                limit: 12,
                offset: 0
            };
            await product.getProducts(params).then(goods => {
                store.dispatch('fetchDataByKey', { data: goods, key: 'goods' });
            })
            params = {
                limit: 3,
                offset: 0,
            };
            await tender.searchTenders(params).then(tenders => {
                store.dispatch('fetchDataByKey', { data: tenders, key: 'tenders' });
            })
        },
        components: {
            Search,
            blockContent,
            BlockTender,
            blockGoodsItem
        },
        data() {
            return {
                groups: null,
                showLoaderGroups: false,
                limit: 5,
                //tenders: null,
                showLoaderTenders: false,
                //goods: null,
                showLoaderGoods: false,
                resizeObserver: null,
                scrollbarVisible: false,
                showFeatures: false
            };
        },
        computed: {
            goods() {
                return this.$store.state.data?.goods || {};
            },
            tenders() {
                return this.$store.state.data?.tenders || {};
            },
            user() {
                return this.$store.state.user;
            },
            offset() {
                let limit = Number(this.limit)
                return (this.page - 1) * limit
            }
        },
        mounted () {
            //this.getGroups();
            this.$store.dispatch('setMeta', {});
            this.getTenders();
            this.getGoods();
        },
        methods: {
            startSearch(formData) {
                this.showLoaderTenders = true;
                formData.limit = Number(this.limit)
                formData.offset = this.offset
                tender.searchTenders(formData).then(tenders => {
                    this.$store.dispatch('fetchDataByKey', { data: tenders, key: 'tenders' });
                    this.showLoaderTenders = false;
                }).catch(err => {
                    this.showLoaderTenders = false;
                    console.error(err)
                })
            },
            getGoods() {
                let params = {
                    limit: 12,
                    offset: 0
                };
                this.showLoaderGoods = true;
                product.getProducts(params).then(goods => {
                    this.$store.dispatch('fetchDataByKey', { data: goods, key: 'goods' });
                    this.showLoaderGoods = false;
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
                tender.searchTenders(params).then(tenders => {
                    this.$store.dispatch('fetchDataByKey', { data: tenders, key: 'tenders' });
                    this.showLoaderTenders = false;
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
