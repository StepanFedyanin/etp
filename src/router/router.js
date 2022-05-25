import { createRouter, createWebHistory  } from 'vue-router';
import store from '@/store/store';
// import auth from '@/views/auth.vue';
import home from '@/views/Home';
import registration from '@/views/Registration';
import auth from '@/views/Login';

import cabinet from '@/views/Cabinet';
import empty from '@/views/Empty';
import rules from '@/views/Rules';

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
        component: empty,
        meta: { title: 'О площадке' },
        props: true,
    }, {
    //     path: '/recovery',
    //     name: 'recovery',
    //     component: auth,
    //     meta: { title: 'Восстановление пароля' },
    //     props: {
    //         default: true,
    //         template: 'recovery'
    //     }
    // }, {
        path: '/',
        name: 'home',
        component: home,
        meta: { title: 'Домашнее' },
        props: true
    }, {
        path: '/needs',
        name: 'needs',
        component: empty,
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
        meta: { title: 'Тендеры', requiresAuth: true },
        props: true,
    }, {
        path: '/cabinet/tender-start',
        name: 'tender-start',
        component: cabinet,
        meta: { title: 'Объявить тендер', requiresAuth: true },
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
