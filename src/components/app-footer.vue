<template>
    <div class="footer">
        <div class="footer__container container">
            <div class="footer__top">
                <div class="footer__logo">
                    <router-link
                        :to="{ name: 'home' }"
                        class="footer__logo-link"
                        aria-label="На главную страницу"
                    >
                        <img
                            src="@/assets/img/logo.svg"
                            width="240"
                            height="60"
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
                    <template
                        v-for="(item, key) in footerMenuBottom"
                    >
                        <a 
                            v-if="item.link"
                            :key="`link-${key}`"
                            :href="item.link" 
                            class="footer__bottom-link m--green" 
                            target="_blank"
                        >
                            {{ item.title }}
                            <span v-if="item.icon" :class="['icon', item.icon]" />
                        </a>
                        <router-link
                            v-else
                            :key="`route-${key}`"
                            :to="{ name: item.name, params: item.params }"
                            class="footer__bottom-link"
                        >
                            {{ item.title }}
                        </router-link>
                    </template>
                </div>
                <div class="footer__bottom-developer">
                    Разработка площадки - 
                    <a
                        href="//tenders.flexites.org"
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
                        name: 'products',
                        role: 'all',
                        title: 'Маркет'
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
                        name: 'page',
                        params: { slug: 'agreement' },
                        role: 'all',
                        title: 'Политика конфиденциальности'
                    }, {
                        name: 'page',
                        params: { slug: 'contacts' },
                        role: 'all',
                        title: 'Контакты',
                    }, {
                        link: 'https://forms.yandex.ru/cloud/654b873b5d2a06115722d4a1/',
                        role: 'all',
                        title: 'Улучшим TUGAN вместе!',
                        icon: 'm--edit'
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
