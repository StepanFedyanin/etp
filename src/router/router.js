import { createRouter, createWebHistory  } from 'vue-router';
import store from '@/store/store';
/* all */
import home from '@/views/Home';
import page from '@/views/Page';
import empty from '@/views/Empty';
import about from '@/views/About';
import rules from '@/views/Rules';
import needs from '@/views/Needs';
/* regs, auth */
import registration from '@/views/Registration';
import auth from '@/views/Login';
/* cabinet */
import cabinet from '@/views/Cabinet';
import cabinetInvite from '@/views/CabinetInvite';
import cabinetChat from '@/views/CabinetChat';
import cabinetCustomer from '@/views/CabinetCustomer';
import cabinetCustomerTendersList from '@/views/CabinetCustomerTendersList';
import cabinetCustomerPrivateTenders from '@/views/CabinetCustomerPrivateTenders';
import cabinetCustomerDrafts from '@/views/CabinetCustomerDrafts';
import cabinetParticipant from '@/views/CabinetParticipant';
import cabinetParticipantInvites from '@/views/CabinetParticipantInvites';
import cabinetParticipantTendersList from '@/views/CabinetParticipantTendersList';
import cabinetFavorites from '@/views/CabinetFavorites';
import cabinetFavoritesContragents from '@/views/CabinetFavoritesContragents';
import cabinetFavoritesTenders from '@/views/CabinetFavoritesTenders';
import cabinetProfile from '@/views/CabinetProfile';
import cabinetProfileEdit from '@/views/CabinetProfileEdit';
import cabinetProfilePassword from '@/views/CabinetProfilePassword';
import cabinetProfileItem from '@/views/CabinetProfileItem';
import cabinetProfileItemEdit from '@/views/CabinetProfileItemEdit';
import cabinetTenders from '@/views/CabinetTenders';
import cabinetTendersList from '@/views/CabinetTendersList';
import cabinetTendersItem from '@/views/CabinetTendersItem';
import cabinetTendersStart from '@/views/CabinetTendersStart';
import cabinetTendersStartForm from '@/views/CabinetTendersStartForm';
//import cabinetTendersEnd from '@/views/CabinetTendersEnd';
import cabinetContragents from '@/views/CabinetContragents';
import cabinetContragentsList from '@/views/CabinetContragentsList';
import cabinetContragentsItem from '@/views/CabinetContragentsItem';
import cabinetOrganizationAddPerson from '@/views/CabinetOrganizationAddPerson';
import CabinetOrganization from '@/views/CabinetOrganization';
import CabinetOrganizationEdit from '@/views/CabinetOrganizationEdit';
import cabinetNotifications from '@/views/CabinetNotifications';
import cabinetNotificationsSettings from '@/views/CabinetNotificationsSettings';
import groups from '@/views/Groups';
import group from '@/views/Group';
import product from '@/views/Product';
import products from '@/views/Products';
import page404 from '@/views/Page404';

const routes = [
    {
        path: '/auth',
        name: 'auth',
        component: auth,
        meta: { title: 'Вход на платформу', showSubHeader: true },
        props: true
    }, {
        path: '/registration',
        name: 'registration',
        component: registration,
        meta: { title: 'Регистрация аккаунта - Шаг ', showSubHeader: true },
        props: true,
    }, {
    //     path: '/bidding',
    //     name: 'bidding',
    //     component: empty,
    //     meta: { title: 'Торги' },
    //     props: true,
    // }, {
        path: '/groups',
        name: 'groups',
        component: groups,
        meta: { title: 'Товарные группы', showSidebarAuth: true },
        props: true,
    }, {
        path: '/groups/:parentslug?/:slug',
        name: 'group',
        component: group,
        meta: { title: 'Товарная группа', showSidebarAuth: true },
        props: true,
    }, {
        path: '/about',
        name: 'about',
        component: about,
        meta: { title: 'О площадке', showSubHeader: true },
        props: true,
    }, {
        path: '/',
        name: 'home',
        component: home,
        meta: { 
            title: 'Электронная торговая площадка',
            description: 'ЭТП TUGAN — Электронная торговая площадка для проведения тендеров, онлайн торгов и аукционов. ✅Официальный сайт электронной торговой платформы TUGAN. ☎ +7 (343) 344-83-83',
            keywords: 'электронная торговая площадка, торговая площадка, электронные торги, электронная торговая платформа? проведение тендеров, конкурс, аукцион, закупка, Туган, Tugan'
        },
        props: true
    }, {
        path: '/info/:slug',
        name: 'page',
        component: page,
        meta: { 
            title: `%title%`, 
            description: `%description%`,
            breadcrumbs: [],
            showSidebarAuth: true
        },
        props: true,
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
        path: '/invite',
        name: 'invite',
        component: cabinetInvite,
        meta: { title: 'Пригласить партнеров', requiresAuth: true },
        props: true,
    }, {
        path: '/profile',
        name: 'profile',
        component: cabinetProfile,
        meta: { 
            title: 'Мой профиль', 
            breadcrumbs: [],
            requiresAuth: true 
        },
        props: true,
    }, {
        path: '/profile/edit',
        name: 'profile-edit',
        component: cabinetProfileEdit,
        meta: { 
            title: 'Редактирование профиля', 
            breadcrumbs: ['profile'],
            requiresAuth: true 
        },
        props: true,
    }, {
        path: '/profile/password',
        name: 'profile-edit-password',
        component: cabinetProfilePassword,
        meta: { 
            title: 'Редактирование пароля', 
            breadcrumbs: ['profile'],
            requiresAuth: true 
        },
        props: true,
    },{
        path: '/profile/:id',
        name: 'profile-user',
        component: cabinetProfileItem,
        meta: { 
            title: 'Профиль', 
            breadcrumbs: ['profile'],
            requiresAuth: true 
        },
        props: true,
    }, {
        path: '/profile/:id/edit',
        name: 'profile-edit-user',
        component: cabinetProfileItemEdit,
        meta: { 
            title: 'Редактирование профиля',
            breadcrumbs: ['profile'],
            requiresAuth: true 
        },
        props: true,
    }, {
        path: '/organization',
        name: 'organization',
        component: CabinetOrganization,
        meta: { 
            title: 'Моя организация', 
            breadcrumbs: [],
            requiresAuth: true 
        },
        props: true,
    }, {
        path: '/organization/edit',
        name: 'organization-edit',
        component: CabinetOrganizationEdit,
        meta: { 
            title: 'Моя организация', 
            breadcrumbs: [],
            requiresAuth: true 
        },
        props: true,
    }, {
        path: '/organization/add-person',
        name: 'organization-add-person',
        component: cabinetOrganizationAddPerson,
        meta: { 
            title: 'Добавить сотрудника', 
            breadcrumbs: [],
            requiresAuth: true 
        },
        props: true,
    }, {
        path: '/tenders',
        component: cabinetTenders,
        props: true,
        children: [
            {
                path: '',
                name: 'tenders',
                component: cabinetTendersList,
                meta: { 
                    title: 'Тендеры', 
                    breadcrumbs: [],
                    requiresAuth: true 
                },
                props: true,
            }, {
                path: ':id',
                name: 'tender',
                component: cabinetTendersItem,
                meta: { 
                    title: `%kind_detail% №%id%: %name%`, 
                    breadcrumbs: ['tenders'],
                    requiresAuth: true 
                },
                props: true,
            }, {
                path: ':id/edit',
                name: 'tender-edit',
                component: cabinetTendersStartForm,
                meta: { 
                    title: 'Редактирование тендера',
                    breadcrumbs: ['tenders'],
                    requiresAuth: true 
                },
                props: true,
            /*
            }, {
                path: ':id/end',
                name: 'tender-end',
                component: cabinetTendersEnd,
                meta: { 
                    title: 'Завершение тендера',
                    breadcrumbs: ['tenders'],
                    requiresAuth: true 
                },
                props: true,

            */
            }, 
        ]
    }, {
        path: '/customer',
        name: 'customer',
        component: cabinetCustomer,
        meta: { 
            title: 'Заказчик', 
            breadcrumbs: [],
            requiresAuth: true 
        },
        props: true,
        children: [
            
            {
                path: 'start',
                name: 'tender-start',
                component: cabinetTendersStart,
                meta: { 
                    title: 'Объявить тендер', 
                    breadcrumbs: ['tenders'],
                    requiresAuth: true 
                },
                props: true,
            }, {
                path: 'start-tender',
                name: 'start-tender',
                component: cabinetTendersStartForm,
                meta: { 
                    title: 'Объявить тендер', 
                    breadcrumbs: ['tenders', 'tenders-start'],
                    requiresAuth: true 
                },
                props: { propType: 0 },
            }, {
                path: 'start-price',
                name: 'start-price',
                component: cabinetTendersStartForm,
                meta: { 
                    title: 'Объявить запрос цен без исполнения договора', 
                    breadcrumbs: ['tenders', 'tenders-start'],
                    requiresAuth: true 
                },
                props: { propType: 1 },
            }, {
                path: 'start-price-fulfilment',
                name: 'start-price-fulfilment',
                component: cabinetTendersStartForm,
                meta: { 
                    title: 'Объявить запрос цен с исполнением договора', 
                    breadcrumbs: ['tenders', 'tenders-start'],
                    requiresAuth: true 
                },
                props: { propType: 2 },
            }, {
                path: 'drafts',
                name: 'customer-drafts',
                component: cabinetCustomerDrafts,
                meta: { 
                    title: 'Черновики тендеров', 
                    breadcrumbs: ['customer'],
                    requiresAuth: true 
                },
                props: true,
            }, {
                path: 'current',
                name: 'customer-current',
                component: cabinetCustomerTendersList,
                meta: { 
                    title: 'Текущие торги заказчика', 
                    breadcrumbs: ['customer'],
                    requiresAuth: true 
                },
                props: { 
                    status: 'currents' 
                },
            }, {
                path: 'private',
                name: 'private-tender',
                component: cabinetCustomerPrivateTenders,
                meta: { 
                    title: 'Закрытые торги', 
                    breadcrumbs: ['customer'],
                    requiresAuth: true 
                },
                props: true,
            }, {
                path: 'closed',
                name: 'customer-closed',
                component: cabinetCustomerTendersList,
                meta: { 
                    title: 'Завершенные торги заказчика', 
                    breadcrumbs: ['customer'],
                    requiresAuth: true 
                },
                props: { 
                    status: 'closed' 
                },
            }
        ]
    }, {
        path: '/participant',
        name: 'participant',
        component: cabinetParticipant,
        meta: { 
            title: 'Поставщик', 
            breadcrumbs: [],
            requiresAuth: true 
        },
        props: true,
        children: [
            {
                path: 'current',
                name: 'participant-current',
                component: cabinetParticipantTendersList,
                meta: { 
                    title: 'Текущие торги поставщика', 
                    breadcrumbs: ['participant'],
                    requiresAuth: true 
                },
                props: { 
                    status: 'currents' 
                },
            }, {
                path: 'closed',
                name: 'participant-closed',
                component: cabinetParticipantTendersList,
                meta: { 
                    title: 'Завершенные торги поставщика', 
                    breadcrumbs: ['participant'],
                    requiresAuth: true 
                },
                props: { 
                    status: 'closed' 
                },
            }, {
                path: 'invites',
                name: 'participant-invites',
                component: cabinetParticipantInvites,
                meta: { 
                    title: 'Завершенные торги поставщика', 
                    breadcrumbs: ['participant'],
                    requiresAuth: true 
                },
                props: { 
                    status: 'closed' 
                },
            }
        ]
    }, {
        path: '/favorites',
        name: 'favorites',
        component: cabinetFavorites,
        meta: { 
            title: 'Избранные контрагенты', 
            requiresAuth: true 
        },
        props: true,
        children: [
            {
                path: '/favorites/contragents',
                name: 'favorites-contragents',
                component: cabinetFavoritesContragents,
                meta: { 
                    title: 'Избранные контрагенты', 
                    requiresAuth: true 
                },
                props: true
            }, {
                path: '/favorites/tenders',
                name: 'favorites-tenders',
                component: cabinetFavoritesTenders,
                meta: { 
                    title: 'Избранные тендеры', 
                    requiresAuth: true 
                },
                props: true
            }
        ]
    }, {
        path: '/contragents',
        component: cabinetContragents,
        props: true,
        children: [
            {
                path: '',
                name: 'contragents',
                component: cabinetContragentsList,
                meta: { 
                    title: 'Контрагенты', 
                    breadcrumbs: [],
                    showSidebarAuth: true,
                    //requiresAuth: true 
                },
                props: true,
            }, {
                path: ':id',
                name: 'contragent',
                component: cabinetContragentsItem,
                meta: {
                    name: 'Контрагент',
                    title: '%name% (ИНН %inn%). Реквизиты, КПП, ОГРН %city%', 
                    breadcrumbs: ['contragents'],
                    showSidebarAuth: true,
                    //requiresAuth: true 
                },
                props: true,
            }
        ]
    }, {
        path: '/chat',
        name: 'chat',
        component: cabinetChat,
        meta: { 
            title: 'Чат', 
            breadcrumbs: [],
            requiresAuth: true,
            appClass: 'm--h-100 m--no-footer'
        },
        props: true,
    }, {
        path: '/notifications',
        name: 'notifications',
        component: cabinetNotifications,
        meta: { 
            title: 'Уведомления',
            breadcrumbs: [],
            requiresAuth: true 
        },
        props: true,
    }, {
        path: '/notifications-settings',
        name: 'notifications-settings',
        component: cabinetNotificationsSettings,
        meta: { 
            title: 'Настройка уведомлений',
            breadcrumbs: [],
            requiresAuth: true 
        },
        props: true,
    }, {
        path: '/products',
        name: 'products',
        component: products,
        meta: { 
            title: 'Товары и услуги',
            breadcrumbs: [],
            showSidebarAuth: true
            //requiresAuth: true 
        },
        props: true,
    }, {
        path: '/products/:slug',
        name: 'product',
        component: product,
        meta: { 
            title: 'Товар',
            breadcrumbs: [],
            showSidebarAuth: true
            //requiresAuth: true 
        },
        props: true,
    }, {
        path: '/:pathMatch(.*)*',
        name: 'page404',
        component: page404,
        meta: { 
            title: 'Ошибка 404',
            showSidebarAuth: true,
        },
        props: true,
    }, 
];

const router = createRouter({
    history: createWebHistory(),
    linkActiveClass: 'is-subactive',
    linkExactActiveClass: 'is-active',
    routes,
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition
        } else {
            return { top: 0 }
        }
    },
});

router.beforeEach((to, from, next) => {
    store.dispatch('setMeta', {});
    if (!from.name || to.fullPath !== from.fullPath) {
        /*
        document.title = to.meta.title + ' | ЭТП TUGAN' || 'ЭТП TUGAN';
        const description = document.querySelector('head meta[name="description"]');
        const keywords = document.querySelector('head meta[name="keywords"]');
        description.setAttribute('content', to.meta.description || '');
        keywords.setAttribute('content', to.meta.keywords || '');
        */
    }
    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (store.state.user && store.state.user.id) {
            next();
        } else {
            next({ name: 'auth' });
        }
    } else {
        next();
        /*
        if (to.name === 'home' && store.state.user && store.state.user.id) {
            next({ name: 'cabinet' });
        } else {
            next();
        }
        */
    }
});

export default router;
