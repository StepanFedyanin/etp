<template>
    <div class="footer">
        <div class="container">
            <div class="footer__content">
                <div class="footer__left">
                    <div class="footer__logo">
                        <router-link
                            :to="{ name: 'home' }"
                            class="footer__logo-link"
                        >
                            <img
                                src="@/assets/img/logo.svg"
                                alt=""
                                class="footer__logo-img"
                            >
                        </router-link>
                    </div>
                    <router-link
                        :to="{ name: 'agreement' }"
                        class="footer__link"
                    >
                        Политика конфиденциальности
                    </router-link>
                    <a
                        href="//flexites.org"
                        class="footer__link m--developer"
                        target="_blank"
                    >
                        Разработка тендерных площадок - Flexites
                    </a>
                </div>
                <div class="footer__right">
                    <div class="footer__menu">
                        <div class="footer__title">
                            Электронная торговая площадка TUGAN
                        </div>
                        <div class="footer__menu-block">
                            <router-link
                                v-for="(item, key) in menu"
                                :key="key"
                                :to="{ name: item.name }"
                                class="footer__link"
                                v-text="item.title"
                            />
                        </div>
                    </div>
                    <!--
                    <div class="footer__menu">
                        <div class="footer__title">
                            По вопросам работы площадки
                        </div>
                        <a
                            :href="$helpers.formatTel(phoneSupport)"
                            class="footer__link"
                        >{{ phoneSupport }}</a>
                        <a
                            :href="`mailto:${emailSupport}`"
                            class="footer__link"
                        >{{ emailSupport }}</a>
                    </div>
                -->
                    <div class="footer__menu">
                        <div class="footer__title">
                            По вопросам работы площадки и сотрудничества
                        </div>
                        <a
                            :href="$helpers.formatTel(phone)"
                            class="footer__link m--strong"
                        >{{ phone }}</a>
                        <a
                            :href="`mailto:${email}`"
                            class="footer__link m--strong"
                        >{{
                            email
                        }}</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    //import { footerMenu, footerMenuUser } from '@/settings';
    export default {
        name: 'Footer',
        data() {
            return {
                phone: '+7 (343) 344-83-83',
                email: 'info@etptugan.ru',
                phoneSupport: '8 (800) 765-43-21',
                emailSupport: 'help@etptugan.ru',
                footerMenu: [
                    {
                        name: 'tenders',
                        role: 'all',
                        title: 'Тендеры'
                    }, {
                        name: 'cabinet',
                        role: 'all',
                        title: 'Личный кабинет',
                    }, {
                        name: 'groups',
                        role: 'all',
                        title: 'Товарные группы'
                    }, {
                        name: 'about',
                        role: 'all',
                        title: 'О площадке',
                    }, {
                        name: 'contragents',
                        role: 'all',
                        title: 'Контрагенты',
                    }, {
                        name: 'registration',
                        role: 'all',
                        title: 'Регистрация',
                    }
                ]
            };
        },
        computed: {
            menu() {
                // return (this.$store.state.user) ? footerMenuUser : footerMenu;
                return this.footerMenu;
            }
        },

    };
</script>
