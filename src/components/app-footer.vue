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
                    <a href="//flexites.org" class="footer__link" target="_blank">
                        Создание сайта - Flexites
                    </a>
                </div>
                <div class="footer__right">
                    <div class="footer__menu">
                        <div class="footer__title">
                            О площадке
                        </div>
                        <router-link
                            v-for="(item, key) in menu"
                            :key="key"
                            :to="{ name: item.name }"
                            class="footer__link"
                            v-text="item.title"
                        />
                    </div>
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
                    <div class="footer__menu">
                        <div class="footer__title">
                            По вопросам сотрудничества
                        </div>
                        <a
                            :href="$helpers.formatTel(phone)"
                            class="footer__link"
                        >{{ phone }}</a>
                        <a
                            :href="`mailto:${email}`"
                            class="footer__link"
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
    import { footerMenu } from '@/settings';
    export default {
        name: 'Footer',
        data() {
            return {
                phone: '8 (800) 123-45-67',
                email: 'info@tugan.ru',
                phoneSupport: '8 (800) 765-43-21',
                emailSupport: 'help@tugan.ru',
                menu: footerMenu
            };
        },
    };
</script>
