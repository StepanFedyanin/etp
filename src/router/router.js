import { createRouter, createWebHistory  } from 'vue-router';
import store from '@/store/store';
// import auth from '@/views/auth.vue';
import home from '@/views/Home.vue';
import registration from '@/views/Registration';
import auth from '@/views/Login';

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
