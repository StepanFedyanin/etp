import { createRouter, createWebHistory  } from 'vue-router';
import store from '@/store/store';
/* all */
import home from '@/views/Home';
import empty from '@/views/Empty';
import about from '@/views/About';
import rules from '@/views/Rules';
import needs from '@/views/Needs';
/* regs, auth */
import registration from '@/views/Registration';
import auth from '@/views/Login';
/* cabinet */
import cabinet from '@/views/Cabinet';
import cabinetNews from '@/views/CabinetNews';

const routes = [
    {
        path: '/auth',
        name: 'auth',
        component: auth,
        meta: { title: 'Вход на платформу' },
        props: true
    }, {
        path: '/registration',
        name: 'registration',
        component: registration,
        meta: { title: 'Регистрация аккаунта' },
        props: true,
    }, {
        path: '/bidding',
        name: 'bidding',
        component: empty,
        meta: { title: 'Торги' },
        props: true,
    }, {
        path: '/groups',
        name: 'groups',
        component: empty,
        meta: { title: 'Товарные группы' },
        props: true,
    }, {
        path: '/about',
        name: 'about',
        component: about,
        meta: { title: 'О площадке' },
        props: true,
    }, {
        path: '/',
        name: 'home',
        component: home,
        meta: { title: 'Главная' },
        props: true
    }, {
        path: '/needs',
        name: 'needs',
        component: needs,
        meta: { title: 'Наши потребности' },
        props: true,
    }, {
        path: '/rules',
        name: 'rules',
        component: rules,
        meta: { title: 'Правила работы' },
        props: true,
    }, {
        path: '/agreement',
        name: 'agreement',
        component: empty,
        meta: { title: 'Политика конфиденциальности' },
        props: true,
    }, {
        path: '/cabinet',
        name: 'cabinet',
        component: cabinet,
        meta: { title: 'Кабинет', requiresAuth: true },
        props: true,
    }, {
        path: '/cabinet/tenders',
        name: 'tenders',
        component: cabinet,
        meta: { 
            title: 'Тендеры', 
            breadcrumbs: ['cabinet'],
            requiresAuth: true 
        },
        props: true,
    }, {
        path: '/cabinet/profile',
        name: 'profile',
        component: cabinet,
        meta: { 
            title: 'Мой профиль', 
            breadcrumbs: ['cabinet'],
            requiresAuth: true 
        },
        props: true,
    }, {
        path: '/cabinet/organization',
        name: 'organization',
        component: cabinet,
        meta: { 
            title: 'Моя организация', 
            breadcrumbs: ['cabinet'],
            requiresAuth: true 
        },
        props: true,
    }, {
        path: '/cabinet/tender-start',
        name: 'tender-start',
        component: cabinet,
        meta: { 
            title: 'Объявить тендер', 
            breadcrumbs: ['cabinet'],
            requiresAuth: true 
        },
        props: true,
    }, {
        path: '/cabinet/contragents',
        name: 'contragents',
        component: cabinet,
        meta: { 
            title: 'Контрагенты', 
            breadcrumbs: ['cabinet'],
            requiresAuth: true 
        },
        props: true,
    }, {
        path: '/cabinet/chat',
        name: 'chat',
        component: cabinet,
        meta: { 
            title: 'Чат', 
            breadcrumbs: ['cabinet'],
            requiresAuth: true 
        },
        props: true,
    }, {
        path: '/cabinet/news',
        name: 'news',
        component: cabinetNews,
        meta: { 
            title: 'Новости',
            breadcrumbs: ['cabinet'],
            requiresAuth: true 
        },
        props: true,
    }, {
        path: '/cabinet/help',
        name: 'help',
        component: cabinet,
        meta: { 
            title: 'Помощь', 
            breadcrumbs: ['cabinet'],
            requiresAuth: true 
        },
        props: true,
    }
];

const router = createRouter({
    history: createWebHistory(),
    linkActiveClass: 'is-subactive',
    linkExactActiveClass: 'is-active',
    routes
});

router.beforeEach((to, from, next) => {

    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (store.state.user && store.state.user.id) {
            next();
        } else {
            next({ name: 'auth' });
        }
    } else {
        next();
    }
});

export default router;
