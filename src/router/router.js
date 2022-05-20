import { createRouter, createWebHistory  } from 'vue-router';
import store from '@/store/store';
// import auth from '@/views/auth.vue';
import home from '@/views/Home.vue';

const routes = [
    {
    //     path: '/auth',
    //     name: 'auth',
    //     component: auth,
    //     meta: { title: 'Авторизация' },
    //     props: true
    // }, {
    //     path: '/registration',
    //     name: 'registration',
    //     component: auth,
    //     meta: { title: 'Регистрация' },
    //     props: {
    //         default: true,
    //         template: 'registration'
    //     }
    // }, {
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
