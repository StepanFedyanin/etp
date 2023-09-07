<template>
    <div class="footer">
        <div class="footer__container container">
            <div class="footer__top">
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
                <div class="footer__contacts">
                    <a
                        :href="$helpers.formatTel(phone)"
                        class="footer__contacts-link m--phone"
                    >{{ phone }}</a>
                    <a
                        :href="`mailto:${email}`"
                        class="footer__contacts-link m--mail"
                    >{{ email }}</a>
                </div>
            </div>
            <div class="footer__main">
                <div class="footer__main-title">TUGAN — Социальная платформа Для бизнеса</div>
                <div class="footer__main-menu">
                    <router-link
                        v-for="(item, key) in menu"
                        :key="key"
                        :to="{ name: item.name, params: item.params }"
                        class="footer__main-link"
                    >
                        {{ item.title }}
                    </router-link>
                </div>
            </div>
            <div class="footer__bottom">
                <div class="footer__bottom-menu">
                    <router-link
                        v-for="(item, key) in footerMenuBottom"
                        :key="key"
                        :to="{ name: item.name, params: item.params }"
                        class="footer__bottom-link"
                    >
                        {{ item.title }}
                    </router-link>
                </div>
                <div class="footer__bottom-developer">
                    Разработка площадки - 
                    <a
                        href="//flexites.org"
                        class="footer__bottom-link m--developer"
                        target="_blank"
                    >
                        Флексайтс
                    </a>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    //import { footerMenu, footerMenuUser } from '@/settings';
    export default {
        name: 'AppFooter',
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
                        name: 'contragents',
                        role: 'all',
                        title: 'Организации',
                    }, {
                        name: 'groups',
                        role: 'all',
                        title: 'Товары'
                    }, {
                        name: 'about',
                        role: 'all',
                        title: 'О площадке',
                    }, {
                        name: 'registration',
                        role: 'all',
                        title: 'Регистрация',
                    }
                ],
                footerMenuBottom: [
                    {
                        name: 'agreement',
                        role: 'all',
                        title: 'Политика конфиденциальности'
                    }, {
                        name: 'page',
                        params: { slug: 'contacts' },
                        role: 'all',
                        title: 'Контакты',
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
