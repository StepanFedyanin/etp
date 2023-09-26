<template>
    <div class="app__main">
        <!-- <Breadcrumbs /> -->
        <div class="cabinet">
            <div class="container">
                <div
                    class="app__breadcrumbs"
                >
                    <router-link
                        :to="{ name: 'home' }"
                        class="app__breadcrumbs-link"
                    >
                        Главная
                    </router-link>
                </div>
                <div class="h1">
                    Добро пожаловать на бизнес-платформу TUGAN!
                </div>
                <div 
                    v-if="user && user.id"
                    class="cabinet__block"
                >
                    <div class="cabinet__block-item m--transparent">
                        <div class="cabinet__block-item m--100">
                            <div class="cabinet__block-item-profile">
                                <div class="cabinet__block-item-title">
                                    {{ user.last_name }}
                                    <span>{{ user.first_name }} {{ user.patronymic }}</span>
                                </div>
                                <div 
                                    :class="['cabinet__block-item-logo', user.logo ? '' : 'm--no-logo']"
                                >
                                    <img 
                                        v-if="user.logo"
                                        :src="`${user.logo}`" 
                                        :alt="`${user.last_name} ${user.first_name}`" 
                                    />
                                </div>
                            </div>
                            <router-link
                                :to="{ name: 'profile'}" 
                                class="cabinet__block-item-link"
                            >
                                Настроить профиль
                            </router-link>
                        </div>
                        <div class="cabinet__block-item m--100">
                            <div class="cabinet__block-item-profile">
                                <div class="cabinet__block-item-title">
                                    Моя организация
                                    <span>{{ user.organization?.name || '—' }}</span>
                                </div>
                                <div 
                                    :class="['cabinet__block-item-logo', user.organization?.logo ? '' : 'm--no-logo']"
                                    @click.stop="onClickPopup"
                                >
                                    <img 
                                        v-if="user.organization?.logo"
                                        :src="`${user.organization?.logo}`" 
                                        :alt="user.organization?.name" 
                                    />
                                </div>
                            </div>
                            <router-link
                                :to="{ name: 'organization', hash: user.organization ? '#public' : '#registration' }" 
                                class="cabinet__block-item-link"
                            >
                                {{ user.organization ? `Управлять организацией` : `Зарегистрировать организацию` }}
                            </router-link>
                        </div>
                    </div>
                    <div class="cabinet__block-item">
                        <div class="cabinet__block-item-title">
                            Товары и услуги
                        </div>
                        <div class="cabinet__block-item-description">
                            <ul>
                                <li>размещайте на площадке предложения собственных товаров и услуг;</li>
                                <li>продвигайте свою продукцию с нашей помощью и с поддержкой сообщества;</li>
                                <li>оставляйте заявки на товары других поставщиков, которые заинтересовали вас.</li>
                            </ul>
                        </div>
                        <router-link
                            :to="{ name: 'products'}" 
                            class="cabinet__block-item-link"
                        >
                            В каталог
                        </router-link>
                    </div>
                    <div class="cabinet__block-item">
                        <div class="cabinet__block-item-title">
                            Участие в тендерах
                        </div>
                        <div class="cabinet__block-item-description">
                            <ul>
                                <li>ознакомьтесь с тендерами и запросами котировок, проходящими прямо сейчас;</li>
                                <li>воспользуйтесь фильтром по региону поставки, товарным группам и другим параметрам;</li>
                                <li>участвуйте и побеждайте!</li>
                            </ul>
                        </div>
                        <router-link
                            :to="{ name: 'tenders'}" 
                            class="cabinet__block-item-link"
                        >
                            Найти тендер
                        </router-link>
                    </div>
                    <div class="cabinet__block-item">
                        <div class="cabinet__block-item-title">
                            Проведение тендеров
                        </div>
                        <div class="cabinet__block-item-description">
                            <ul>
                                <li>объявите собственный тендер или запрос котировок;</li>
                                <li>пригласите к участию бизнес-партнеров, уже знакомых вам;</li>
                                <li>принимайте заявки от новых проверенных организаций.</li>
                            </ul>
                        </div>
                        <router-link
                            :to="{ name: 'tender-start'}" 
                            class="cabinet__block-item-link"
                        >
                            Организовать тендер
                        </router-link>
                    </div>

                    <div class="cabinet__block-item">
                        <div class="cabinet__block-item-title">
                            Организации
                        </div>
                        <div class="cabinet__block-item-description">
                            <ul>
                                <li>ознакомьтесь со списком организаций, зарегистрированных на площадке;</li>
                                <li>узнайте, какие тендеры проводит организация, а в каких - участвует;</li>
                                <li>пригласите интересных контрагентов к участию в ваших тендерах.</li>
                            </ul>
                        </div>
                        <router-link
                            :to="{ name: 'contragents'}" 
                            class="cabinet__block-item-link"
                        >
                            Найти бизнес-партнеров
                        </router-link>
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
                        <router-link
                            :to="{ name: 'invite'}" 
                            class="cabinet__block-item-link"
                        >
                            Отправить приглашение
                        </router-link>
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
                return this.user.organization || {};
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
        created() {
        },
        methods: {
        }
    };
</script>
