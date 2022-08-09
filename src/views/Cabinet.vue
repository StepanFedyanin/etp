<template>
    <div class="app__main">
        <!-- <Breadcrumbs /> -->
        <div class="cabinet">
            <div class="container">
                <div class="h1">
                    Добро пожаловать на бизнес-платформу Tugan!
                </div>
                <div 
                    v-if="user && user.id"
                    class="cabinet__start"
                >
                    <div class="cabinet__block cabinet__block-item">
                        <div class="block__title">
                            Поиск тендеров
                        </div>
                        <div class="block__description">
                            <ul>
                                <li>ознакомьтесь с тендерами и запросами котировок, проходящими прямо сейчас;</li>
                                <li>воспользуйтесь фильтром по региону поставки, товарным группам и другим параметрам;</li>
                                <li>участвуйте и побеждайте!</li>
                            </ul>
                        </div>
                        <a
                            class="block__link"
                            href="#"
                        >Инструкция по поиску тендера</a>
                        <div 
                            class="button button-green" 
                            @click="onClickTenders"
                        >
                            найти тендер
                        </div>
                    </div>

                    <div class="cabinet__block cabinet__block-item">
                        <div class="block__title">
                            Создание тендера
                        </div>
                        <div class="block__description">
                            <ul>
                                <li>объявите собственный тендер или запрос котировок;</li>
                                <li>пригласите к участию бизнес-партнеров, уже знакомых вам;</li>
                                <li>принимайте заявки от новых проверенных контрагентов.</li>
                            </ul>
                        </div>
                        <a
                            class="block__link"
                            href="#"
                        >Инструкция по созданию тендера</a>
                        <div 
                            class="button button-green" 
                            @click="onClickAddTender"
                        >
                            организовать тендер
                        </div>
                    </div>
                    <div class="cabinet__block cabinet__block-item">
                        <div class="block__title">
                            Список контрагентов
                        </div>
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
                        <div class="block__title">
                            Мой профиль
                        </div>
                        <div class="block__description">
                            <span>{{ user.first_name }} {{ user.patronymic }}</span>
                            <p class="block__subtitle">
                                {{ user.last_name }}
                            </p>
                            <span>{{ user.post }}</span>
                            <p class="block__subtitle">
                                {{ user.organization.name ? user.organization.name : user.organization.full_name }}
                            </p>
                            <span>Телефон (контактный):</span>
                            <p class="block__subtitle">
                                {{ user.phone ? user.phone : "—" }}
                            </p>
                            <span>Email (контактный):</span>
                            <p class="block__subtitle">
                                {{ user.contact_email ? user.contact_email : "—" }}
                            </p>
                        </div>
                        <div 
                            class="button button-green" 
                            @click="onClickProfile"
                        >
                            Подробнее
                        </div>
                    </div>
                    <div class="cabinet__block cabinet__block-item">
                        <div class="block__title">
                            Моя организация
                        </div>
                        <div class="block__description">
                            <p class="block__subtitle">
                                {{ userOrganizationName }}{{ userOrganizationFilial }} 
                            </p>
                            <p class="block__subtitle">
                                ИНН: {{ userOrganization.inn }}
                            </p>
                            <p class="block__subtitle">
                                КПП: {{ userOrganization.kpp ? userOrganization.kpp : "—" }}
                            </p>
                            <span>Руководитель организации</span>
                            <p class="block__subtitle">
                                {{ userOrganization.head_name }}
                            </p>
                        </div>
                        <div 
                            class="button button-green" 
                            @click="onClickOrganization"
                        >
                            Подробнее
                        </div>
                    </div>
                    <div class="cabinet__block cabinet__block-item">
                        <div class="block__title">
                            Пригласить партнеров
                        </div>
                        <div class="block__description">
                            <p class="block__subtitle">
                                Упростите собственный процесс закупок
                            </p>
                            <ul>
                                <li>пригласите на площадку тех, с кем ваша компания уже торгует;</li>
                                <li>сделайте ваш процесс закупок более прозрачным и удобным;</li>
                                <li>укрепляйте связи с проверенными партнерами.</li>
                            </ul>
                        </div>
                        <div 
                            class="button button-green" 
                            @click="onClickInvite"
                        >
                            Отправить приглашения
                        </div>
                    </div>
                    <!-- <CabinetBlock /> -->
                    <!-- <div class="sidebar__menu-link" @click="onClickOrganization">Моя организация</div> -->
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    // import Breadcrumbs from '@/components/app-breadcrumbs';
    // import CabinetBlock from '@/components/cabinet-block';
    export default {
        components: {
            // Breadcrumbs,
            // CabinetBlock,
        },
        data() {
            return {
                contragents: [],
                url: {
                    // hashtags: 'https://dka-develop.ru/api?type=hashtag',
                    // contragents: 'http://tugan-app.flexidev.ru/user/organization/',
                    // persons:''
                },
                contragent: {
                    // id: 1,
                    // name: 'ООО “Флексайтс”',
                    // city: 'г. Челябинск',
                    // activity: 'Разработка компьютерного программного обеспечения',
                    // customer: '113',
                    // member: '45'
                },
                organization: {},
                persons: [],
                tenders: [],
                // store: $store._state.data.user.organization,
            }
        },
        computed: {
            user() {
                return this.$store.state.user ? this.$store.state.user : "";
            },
            userOrganization() {
                return this.user.organization;
            },
            userOrganizationName() {
                if(this.user && this.user.organization) {
                    return this.user.organization.name ? this.user.organization.name : this.user.organization.full_name;
                } else return "";
            },
            userOrganizationFilial() {
                if (this.user && this.user.organization && this.user.organization.filial) {
                    if(this.user.organization.city) {
                        return ", филиал в " + this.user.organization.city;  
                    } else {
                        return ", филиал" + this.user.organization;
                    }
                } else return "";
            }
        },
        mounted() {
        },
        beforeDestroy() {
        },
        created() {
            return {
                // store: $store._state.data.user.organization
            }
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
            onClickOrganization() {
                this.$router.push({ name: 'organization'})
            },
            onClickInvite() {
                this.$router.push({ name: 'invite'});
            }
        }
    };
</script>
