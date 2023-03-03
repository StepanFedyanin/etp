<template>
    <div class="app__main">
        <!-- <Breadcrumbs /> -->
        <div class="cabinet">
            <div class="container">
                <div class="h1">
                    Добро пожаловать на бизнес-платформу TUGAN!
                </div>
                <div 
                    v-if="user && user.id"
                    class="cabinet__block"
                >
                    <div class="cabinet__block-item">
                        <div class="cabinet__block-item-title">
                            Поиск тендеров
                        </div>
                        <div class="cabinet__block-item-description">
                            <ul>
                                <li>ознакомьтесь с тендерами и запросами котировок, проходящими прямо сейчас;</li>
                                <li>воспользуйтесь фильтром по региону поставки, товарным группам и другим параметрам;</li>
                                <li>участвуйте и побеждайте!</li>
                            </ul>
                        </div>
                        <!--
                        <a
                            class="cabinet__block-item-link"
                            href="#"
                        >
                            Инструкция по поиску тендера
                        </a>
                        -->
                        <div 
                            class="button button-green" 
                            @click="onClickTenders"
                        >
                            найти тендер
                        </div>
                    </div>

                    <div class="cabinet__block-item">
                        <div class="cabinet__block-item-title">
                            Создание тендера
                        </div>
                        <div class="cabinet__block-item-description">
                            <ul>
                                <li>объявите собственный тендер или запрос котировок;</li>
                                <li>пригласите к участию бизнес-партнеров, уже знакомых вам;</li>
                                <li>принимайте заявки от новых проверенных контрагентов.</li>
                            </ul>
                        </div>
                        <!--
                        <a
                            class="cabinet__block-item-link"
                            href="#"
                        >
                            Инструкция по созданию тендера
                        </a>
                        -->
                        <div 
                            class="button button-green" 
                            @click="onClickAddTender"
                        >
                            организовать тендер
                        </div>
                    </div>
                    <div class="cabinet__block-item">
                        <div class="cabinet__block-item-title">
                            Список контрагентов
                        </div>
                        <div class="cabinet__block-item-description">
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
                    <div class="cabinet__block-item">
                        <div class="cabinet__block-item-title">
                            Мой профиль
                        </div>
                        <div class="cabinet__block-item-description">
                            <span>{{ user.first_name }} {{ user.patronymic }}</span>
                            <p class="cabinet__block-item-subtitle m--uppercase">
                                {{ user.last_name }}
                            </p>
                            <span>{{ user.post }}</span>
                            <p class="cabinet__block-item-subtitle">
                                {{ user.organization.name ? user.organization.name : user.organization.full_name }}
                            </p>
                            <span>Телефон (контактный):</span>
                            <p class="cabinet__block-item-subtitle">
                                {{ user.phone ? user.phone : "—" }}
                            </p>
                            <span>Email (контактный):</span>
                            <p class="cabinet__block-item-subtitle">
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
                    <div class="cabinet__block-item">
                        <div class="cabinet__block-item-title">
                            Моя организация
                        </div>
                        <div class="cabinet__block-item-description">
                            <p class="cabinet__block-item-subtitle">
                                {{ userOrganizationName }}{{ userOrganizationFilial }} 
                            </p>
                            <p class="cabinet__block-item-subtitle">
                                ИНН: {{ userOrganization.inn }}
                            </p>
                            <p class="cabinet__block-item-subtitle">
                                КПП: {{ userOrganization.kpp ? userOrganization.kpp : "—" }}
                            </p>
                            <span>Руководитель организации</span>
                            <p class="cabinet__block-item-subtitle">
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
                    <div class="cabinet__block-item">
                        <div class="cabinet__block-item-title">
                            Пригласить партнеров
                        </div>
                        <div class="cabinet__block-item-description">
                            <p class="cabinet__block-item-subtitle">
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
