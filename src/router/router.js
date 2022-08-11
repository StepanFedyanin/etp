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
import cabinetInvite from '@/views/CabinetInvite';
import cabinetChat from '@/views/CabinetChat';
import cabinetCustomer from '@/views/CabinetCustomer';
import cabinetCustomerTendersList from '@/views/CabinetCustomerTendersList';
import cabinetCustomerPrivateTenders from '@/views/СabinetCustomerPrivateTenders';
import cabinetCustomerDrafts from '@/views/CabinetCustomerDrafts';
import cabinetParticipant from '@/views/CabinetParticipant';
import cabinetParticipantInvites from '@/views/CabinetParticipantInvites';
import cabinetParticipantTendersList from '@/views/CabinetParticipantTendersList';
import cabinetCabinetFavorites from '@/views/CabinetFavorites';
import cabinetProfile from '@/views/CabinetProfile';
import cabinetProfileEdit from '@/views/CabinetProfileEdit';
import cabinetProfilePassword from '@/views/CabinetProfilePassword';
import cabinetProfileItem from '@/views/CabinetProfileItem';
import cabinetProfileItemEdit from '@/views/CabinetProfileItemEdit';
import cabinetTenders from '@/views/CabinetTenders';
import cabinetTendersList from '@/views/CabinetTendersList';
import cabinetTendersItem from '@/views/CabinetTendersItem';
import cabinetTendersStart from '@/views/CabinetTendersStart';
import cabinetTendersEnd from '@/views/CabinetTendersEnd';
import cabinetContragents from '@/views/CabinetContragents';
import cabinetContragentsList from '@/views/CabinetContragentsList';
import cabinetContragentsItem from '@/views/CabinetContragentsItem';
import cabinetOrganizationAddPerson from '@/views/CabinetOrganizationAddPerson';
import CabinetOrganization from '@/views/CabinetOrganization';
import CabinetOrganizationEdit from '@/views/CabinetOrganizationEdit';
import cabinetNotifications from '@/views/CabinetNotifications';
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
    //     path: '/bidding',
    //     name: 'bidding',
    //     component: empty,
    //     meta: { title: 'Торги' },
    //     props: true,
    // }, {
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
                    title: 'Тендер', 
                    breadcrumbs: ['tenders'],
                    requiresAuth: true 
                },
                props: true,
            }, {
                path: ':id/edit',
                name: 'tender-edit',
                component: cabinetTendersStart,
                meta: { 
                    title: 'Редактирование тендера',
                    breadcrumbs: ['tenders'],
                    requiresAuth: true 
                },
                props: true,
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
            }, {
                path: 'start',
                name: 'tender-start',
                component: cabinetTendersStart,
                meta: { 
                    title: 'Объявить тендер', 
                    breadcrumbs: ['tenders'],
                    requiresAuth: true 
                },
                props: true,
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
                path: 'current',
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
                path: 'closed',
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
        component: cabinetCabinetFavorites,
        meta: { title: 'Избранные тендеры', requiresAuth: true },
        props: true,
    }, {
    //     path: '/cabinet/tender-start',
    //     name: 'tender-start',
    //     component: cabinetTenderStart,
    //     meta: { 
    //         title: 'Объявить тендер', 
    //         breadcrumbs: ['cabinet'],
    //         requiresAuth: true 
    //     },
    //     props: true,
    //     children: [
    //         {
    //             path: '/cabinet/tender-start/:id',
    //             name: 'tender-start-edit',
    //             component: cabinetTenderStart,
    //             meta: { 
    //                 title: 'Объявить тендер', 
    //                 breadcrumbs: ['cabinet'],
    //                 requiresAuth: true 
    //             },
    //             props: true,
    //         }
    //     ]
    // }, {
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
                    requiresAuth: true 
                },
                props: true,
            }, {
                path: ':id',
                name: 'contragent',
                component: cabinetContragentsItem,
                meta: { 
                    title: 'Контрагент', 
                    breadcrumbs: ['contragents'],
                    requiresAuth: true 
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
            requiresAuth: true 
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
    }, 
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
