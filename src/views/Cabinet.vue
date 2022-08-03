<template>
    <div class="app__main">
        <!-- <Breadcrumbs /> -->
        <div class="cabinet">
            <div class="container">
                <div class="h1">Добро пожаловать на бизнес-платформу Tugan!</div>
                <div class="cabinet__start">
                    <div class="cabinet__block cabinet__block-item">
                        <div class="block__title">Поиск тендеров</div>
                        <div class="block__description">
                            <ul>
                                <li>ознакомьтесь с тендерами и запросами котировок, проходящими прямо сейчас;</li>
                                <li>воспользуйтесь фильтром по региону поставки, товарным группам и другим параметрам;</li>
                                <li>участвуйте и побеждайте!</li>
                            </ul>
                        </div>
                        <a class="block__link" href="#">Инструкция по поиску тендера</a>
                        <div 
                            class="button button-green" 
                            @click="onClickTenders"
                        >
                            найти тендер
                        </div>
                    </div>

                    <div class="cabinet__block cabinet__block-item">
                        <div class="block__title">Создание тендера</div>
                        <div class="block__description">
                            <ul>
                                <li>объявите собственный тендер или запрос котировок;</li>
                                <li>пригласите к участию бизнес-партнеров, уже знакомых вам;</li>
                                <li>принимайте заявки от новых проверенных контрагентов.</li>
                            </ul>
                        </div>
                        <a class="block__link" href="#">Инструкция по созданию тендера</a>
                        <div 
                            class="button button-green" 
                            @click="onClickAddTender"
                        >
                            организовать тендер
                        </div>
                    </div>
                    <div class="cabinet__block cabinet__block-item">
                        <div class="block__title">Список контрагентов</div>
                        <div class="block__description">
                            <ul>
                                <li>ознакомьтесь со списком организаций, зарегистрированных на площадке;</li>
                                <li>узнайте, какие тендеры проводит организация, а в каких - участвует;</li>
                                <li>пригласите интересных контрагентов к участию в ваших тендерах.</li>
                            </ul>
                        </div>
                        <div 
                            class="button button-green" 
                            @click="onClickContragents"
                        >
                            Найти бизнес-партнеров
                        </div>
                    </div>
                    <div class="cabinet__block cabinet__block-item">
                        <div class="block__title">Мой профиль</div>
                        <div class="block__description">
                            <span>Александр Александрович</span>
                            <p class="block__subtitle">Безбородов</p>
                            <span>Директор</span>
                            <p class="block__subtitle">ООО «Флексайтс»</p>
                            <span>Телефон (контактный):</span>
                            <p class="block__subtitle">+7 (351) 324-54-54</p>
                            <span>Email (контактный):</span>
                            <p class="block__subtitle">info@flexites.org</p>
                        </div>
                        <div 
                            class="button button-green" 
                            @click="onClickProfile"
                        >
                            Подробнее
                        </div>
                    </div>
                    <div class="cabinet__block cabinet__block-item">
                        <div class="block__title">Моя организация</div>
                        <div class="block__description">
                            <p class="block__subtitle">ООО «Флексайтс», филиал в г. Сочи</p>
                            <p class="block__subtitle">ИНН: 7447123326</p>
                            <p class="block__subtitle">КПП: 745301001</p>
                            <span>Руководитель организации</span>
                            <p class="block__subtitle">Безбородов А.А.</p>
                        </div>
                        <div 
                            class="button button-green" 
                            @click="onClickOrganization"
                        >
                            Подробнее
                        </div>
                    </div>
                    <CabinetBlock />
                    <!-- <div class="sidebar__menu-link" @click="onClickOrganization">Моя организация</div> -->
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    // import Breadcrumbs from '@/components/app-breadcrumbs';
    import CabinetBlock from '@/components/cabinet-block';
    export default {
        components: {
            // Breadcrumbs,
            CabinetBlock,

        },
        data() {
            return {
                contragents: [],
                url: {
                    hashtags: 'https://dka-develop.ru/api?type=hashtag',
                    contragents: 'http://tugan-app.flexidev.ru/user/organization/',
                    persons:''
                },
                contragent: {
                    id: 1,
                    name: 'ООО “Флексайтс”',
                    city: 'г. Челябинск',
                    activity: 'Разработка компьютерного программного обеспечения',
                    customer: '113',
                    member: '45'
                },
                organization: {},
                persons: [],
                tenders: [],
            }
        },
        mounted() {
        },
        beforeDestroy() {
        },
        created() {
        },
        methods: {
            onClickTenders() {
                this.$router.push({ name: 'tenders'});
            },
            onClickAddTender() {
                this.$router.push({ name: 'tender-start'});
            },
            onClickContragents() {
                this.$router.push({ name: 'contragents'});
            },
            onClickProfile() {
                this.$router.push({ name: 'profile'});
            },
            onClickOrganization(){
                this.$router.push({ name: 'organization'})
            },
            onClickInvite(){
                this.$router.push({ name: 'invite'});
            }
        }
    };
</script>
