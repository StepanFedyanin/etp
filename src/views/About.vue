<template>
    <div class="app__main">
        <div class="about">
            <div class="container m--1460">
                <app-breadcrumbs 
                    :breadcrumbs="[
                        { name: 'Главная', route: { name: 'home' } },
                    ]"
                />
                <div class="h1">{{ $route.meta.title }}</div>
                <div class="about__block">
                    <div class="about__content text">
                        <h2>Электронная торговая платформа TUGAN</h2>
                        <p>— создана для упрощения процессов закупок частных компаний и создания бизнес-окружения, которое позволит находить партнеров для бизнеса. Платформа обладает современным интуитивным интерфейсом, позволяет организовать несколько видов закупок за считанные минуты.</p>
                    </div>
                </div>
                <div class="about__block">
                    <div class="about__content text">
                        <h2>Ключевые возможности площадки</h2>
                        <ul class="">
                            <li>при регистрации на площадке организации проверяются по системе «Светофор», благодаря этому на площадку допускаются только действующие организации, которые можно считать благонадежными;</li>
                            <li>у одной организации может быть зарегистрировано несколько сотрудников, каждый из которых сможет организовать закупки от лица компании;</li>
                            <li>создание связанных тендеров с уже существующими на площадке, что позволяет основному заказчику отслеживать исполнение его закупки;</li>
                            <li>предоставляется удобная система общения с заказчиком, для каждого тендера и контрагента создается индивидуальный канал связи (индивидуальные чаты);</li>
                            <li>возможность создать закрытый тендер, доступ в который будет возможен только по индивидуальному приглашению.</li>
                        </ul>
                        <p>Мы расширяем функционал платформы TUGAN — следите за обновлениями!</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="capabilities">
            <div class="container m--1460">
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
        </div> 
        <div class="needs">
            <div class="container m--1460">
                <div class="needs__blocks">
                    <div class="needs__block">
                        <div class="needs__block-left">
                            <div class="needs__block-title">
                                Присоединяйтесь
                            </div>
                            <div class="needs__block-description">
                                Если возникнут трудности или вопросы - обратитесь за консультацией по телефону <a href="tel:+73433448383">+7 (343) 344-83-83</a>.
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
            </div>
        </div>
    </div>
</template>

<script>
    // import Header from '../components/app-header.vue';

    export default {
        name: 'About',
        components: {
            //Header,
        },
        data() {
            return {
            };
        },
        created() {
        },
    };
</script>
