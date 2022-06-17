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
import cabinetProfile from '@/views/CabinetProfile';
import CabinetProfileEdit from '@/views/CabinetProfileEdit';
import cabinetTenders from '@/views/CabinetTenders';
import cabinetTendersList from '@/views/CabinetTendersList';
import cabinetTendersItem from '@/views/CabinetTendersItem';
import cabinetContragents from '@/views/CabinetContragents';
import cabinetContragentsList from '@/views/CabinetContragentsList';
import cabinetContragentsItem from '@/views/CabinetContragentsItem';
import CabinetOrganization from '@/views/CabinetOrganization';
import cabinetNews from '@/views/CabinetNews';
import groups from '@/views/Groups';

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
        meta: { title: 'Регистрация аккаунта - Шаг ' },
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
        component: groups,
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
        path: '/cabinet/profile',
        name: 'profile',
        component: cabinetProfile,
        meta: { 
            title: 'Мой профиль', 
            breadcrumbs: [],
            requiresAuth: true 
        },
        props: true,
    }, {
        path: '/cabinet/profile/edit',
        name: 'profile-edit',
        component: CabinetProfileEdit,
        meta: { 
            title: 'Редактирование профиля', 
            breadcrumbs: ['profile'],
            requiresAuth: true 
        },
        props: true,
    }, {
        path: '/cabinet/organization',
        name: 'organization',
        component: CabinetOrganization,
        meta: { 
            title: 'Моя организация', 
            breadcrumbs: ['cabinet'],
            requiresAuth: true 
        },
        props: true,
    }, {
        path: '/cabinet/tenders',
        component: cabinetTenders,
        props: true,
        children: [
            {
                path: '/cabinet/tenders',
                name: 'tenders',
                component: cabinetTendersList,
                meta: { 
                    title: 'Тендеры', 
                    breadcrumbs: ['cabinet'],
                    requiresAuth: true 
                },
                props: true,
            }, {
                path: '/cabinet/tenders/:id',
                name: 'tender',
                component: cabinetTendersItem,
                meta: { 
                    title: 'Тендер', 
                    breadcrumbs: ['cabinet', 'tenders'],
                    requiresAuth: true 
                },
                props: true,
            }
        ]
    }, {
        path: '/cabinet/customer',
        name: 'customer',
        component: cabinet,
        meta: { 
            title: 'Заказчик', 
            breadcrumbs: ['cabinet'],
            requiresAuth: true 
        },
        props: true,
        children: [
            {
                path: '/cabinet/customer/current',
                name: 'customer-current',
                component: cabinet,
                meta: { 
                    title: 'Текущие торги заказчика', 
                    breadcrumbs: ['cabinet', 'customer'],
                    requiresAuth: true 
                },
                props: true,
            }, {
                path: '/cabinet/customer/closed',
                name: 'customer-closed',
                component: cabinet,
                meta: { 
                    title: 'Завершенные торги заказчика', 
                    breadcrumbs: ['cabinet', 'customer'],
                    requiresAuth: true 
                },
                props: true,
            }
        ]
    }, {
        path: '/cabinet/provider',
        name: 'provider',
        component: cabinet,
        meta: { 
            title: 'Поставщик', 
            breadcrumbs: ['cabinet'],
            requiresAuth: true 
        },
        props: true,
        children: [
            {
                path: '/cabinet/provider/current',
                name: 'provider-current',
                component: cabinet,
                meta: { 
                    title: 'Текущие торги поставщика', 
                    breadcrumbs: ['cabinet', 'provider'],
                    requiresAuth: true 
                },
                props: true,
            }, {
                path: '/cabinet/provider/closed',
                name: 'provider-closed',
                component: cabinet,
                meta: { 
                    title: 'Завершенные торги поставщика', 
                    breadcrumbs: ['cabinet', 'provider'],
                    requiresAuth: true 
                },
                props: true,
            }
        ]
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
        component: cabinetContragents,
        props: true,
        children: [
            {
                path: '/cabinet/contragents',
                name: 'contragents',
                component: cabinetContragentsList,
                meta: { 
                    title: 'Контрагенты', 
                    breadcrumbs: ['cabinet'],
                    requiresAuth: true 
                },
                props: true,
            }, {
                path: '/cabinet/contragents/:id',
                name: 'contragent',
                component: cabinetContragentsItem,
                meta: { 
                    title: 'Контрагент', 
                    breadcrumbs: ['cabinet', 'contragents'],
                    requiresAuth: true 
                },
                props: true,
            }
        ]
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
