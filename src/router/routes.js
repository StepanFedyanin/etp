
import home from '@/views/Home';
import page from '@/views/Page';
import empty from '@/views/Empty';
import about from '@/views/About';
import rules from '@/views/Rules';
import needs from '@/views/Needs';
/* regs, auth */
import registration from '@/views/Registration';
import recovery from '@/views/Recovery';
import auth from '@/views/Login';
/* cabinet */
import Cabinet from '@/views/Cabinet';
import CabinetChat from '@/views/cabinet/chat';
import CabinetCustomer from '@/views/cabinet/customer';
import CabinetCustomerDrafts from '@/views/cabinet/customer-drafts.vue';
import CabinetCustomerPrivates from '@/views/cabinet/customer-privates.vue';
import CabinetCustomerTenders from '@/views/cabinet/customer-tenders.vue';
import CabinetFavorites from '@/views/cabinet/favorites';
import CabinetFavoritesContragents from '@/views/cabinet/favorites-contragents.vue';
import CabinetFavoritesTenders from '@/views/cabinet/favorites-tenders.vue';
import CabinetInvite from '@/views/cabinet/invite';
import CabinetNotifications from '@/views/cabinet/notifications';
import CabinetNotificationsSettings from '@/views/cabinet/notifications-settings.vue'; //? Возможно не используется
import CabinetOrganization from '@/views/cabinet/organization';
import CabinetOrganizationGoodAdd from '@/views/cabinet/organization-good-add.vue';
import CabinetOrganizationGoodEdit from '@/views/cabinet/organization-good-edit.vue';
import CabinetOrganizationPersonAdd from '@/views/cabinet/organization-person-add.vue';
import CabinetOrganizationRegistration from '@/views/cabinet/organization-registration.vue';
import CabinetParticipant from '@/views/cabinet/participant';
import СabinetParticipantInvites from '@/views/cabinet/participant-invites.vue';
import CabinetParticipantTenders from '@/views/cabinet/participant-tenders.vue';
import CabinetProfile from '@/views/cabinet/profile';
import CabinetTendersStart from '@/views/cabinet/tenders-start.vue';
import CabinetTendersStartForm from '@/views/cabinet/tenders-start-form.vue';


import cabinetProfileEdit from '@/views/CabinetProfileEdit';
import cabinetProfilePassword from '@/views/CabinetProfilePassword';
import cabinetProfileItem from '@/views/CabinetProfileItem';
import cabinetProfileItemEdit from '@/views/CabinetProfileItemEdit';
//import cabinetTendersList from '@/views/CabinetTendersList';
//import cabinetTendersEnd from '@/views/CabinetTendersEnd';
//import cabinetContragentsList from '@/views/CabinetContragentsList';
import CabinetOrganizationEdit from '@/views/CabinetOrganizationEdit';

import contragents from '@/views/Contragents';
import contragent from '@/views/Contragent';
//import groups from '@/views/Groups';
//import group from '@/views/Group';
import product from '@/views/Product';
import products from '@/views/Products';
import tender from '@/views/Tender';
import tenders from '@/views/Tenders';
import tendersGroups from '@/views/TendersGroups';
import tendersGroup from '@/views/TendersGroup';

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
        path: '/recovery',
        name: 'recovery',
        component: recovery,
        meta: { title: 'Восстановление пароля' },
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
        component: Cabinet,
        meta: { title: 'Кабинет', requiresAuth: true },
        props: true,
        children: [
            {
                path: 'profile',
                name: 'profile',
                component: CabinetProfile,
                meta: { 
                    title: 'Мой профиль', 
                    breadcrumbs: ['cabinet'],
                    requiresAuth: true 
                },
                props: true,
            }, {
                path: 'organization',
                name: 'organization',
                component: CabinetOrganization,
                meta: { 
                    title: 'Моя организация', 
                    breadcrumbs: ['cabinet'],
                    requiresAuth: true 
                },
                props: true,
            }, {
                path: 'organization/registration',
                name: 'organization-registration',
                component: CabinetOrganizationRegistration,
                meta: { 
                    title: 'Регистрация организации', 
                    breadcrumbs: ['cabinet'],
                    requiresAuth: true 
                },
                props: true,
            }, {
                path: 'organization/person-add',
                name: 'organization-person-add',
                component: CabinetOrganizationPersonAdd,
                meta: { 
                    title: 'Добавить сотрудника', 
                    breadcrumbs: ['cabinet'],
                    requiresAuth: true 
                },
                props: true,
            }, {
                path: 'organization/person-edit/:personId',
                name: 'organization-person-edit',
                component: CabinetOrganizationPersonAdd,
                meta: { 
                    title: 'Редактирование профиля сотрудника',
                    breadcrumbs: ['cabinet'],
                    requiresAuth: true 
                },
                props: true,
            }, {
                path: 'organization/good-add',
                name: 'organization-good-add',
                component: CabinetOrganizationGoodAdd,
                meta: { 
                    title: 'Добавить товар', 
                    breadcrumbs: ['cabinet'],
                    requiresAuth: true 
                },
                props: false,
            }, {
                path: 'organization/good-edit/:slug',
                name: 'organization-good-edit',
                component: CabinetOrganizationGoodEdit,
                meta: { 
                    title: 'Редактирование товара',
                    breadcrumbs: ['cabinet'],
                    requiresAuth: true 
                },
                props: true,
            }, {
                path: 'chat',
                name: 'chat',
                component: CabinetChat,
                meta: { 
                    title: 'Чат', 
                    breadcrumbs: ['cabinet'],
                    requiresAuth: true,
                    appClass: 'm--h-100 m--no-footer'
                },
                props: true,
            }, {
                path: 'invite',
                name: 'invite',
                component: CabinetInvite,
                meta: { title: 'Пригласить партнеров', requiresAuth: true },
                props: true,
            }, {
                path: 'favorites',
                name: 'favorites',
                component: CabinetFavorites,
                meta: { 
                    title: 'Избранные контрагенты', 
                    requiresAuth: true 
                },
                props: true,
                redirect: { name: 'favorites-contragents' }, 
                children: [
                    {
                        path: 'contragents',
                        name: 'favorites-contragents',
                        component: CabinetFavoritesContragents,
                        meta: { 
                            title: 'Избранные контрагенты', 
                            requiresAuth: true 
                        },
                        props: true
                    }, {
                        path: 'tenders',
                        name: 'favorites-tenders',
                        component: CabinetFavoritesTenders,
                        meta: { 
                            title: 'Избранные тендеры', 
                            requiresAuth: true 
                        },
                        props: true
                    }
                ]
            }, {
                path: 'notifications',
                name: 'notifications',
                component: CabinetNotifications,
                meta: { 
                    title: 'Уведомления',
                    breadcrumbs: [],
                    requiresAuth: true 
                },
                props: true,
            }, {
                path: 'notifications/settings',
                name: 'notifications-settings',
                component: CabinetNotificationsSettings,
                meta: { 
                    title: 'Настройка уведомлений',
                    breadcrumbs: [],
                    requiresAuth: true 
                },
                props: true,
            }, {
                path: 'customer',
                name: 'customer',
                component: CabinetCustomer,
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
                        component: CabinetTendersStart,
                        meta: { 
                            title: 'Объявить тендер', 
                            breadcrumbs: ['tenders'],
                            requiresAuth: true 
                        },
                        props: true,
                    }, {
                        path: 'start-tender',
                        name: 'start-tender',
                        component: CabinetTendersStartForm,
                        meta: { 
                            title: 'Объявить тендер', 
                            breadcrumbs: ['tenders', 'tenders-start'],
                            requiresAuth: true 
                        },
                        props: { propType: 0 },
                    }, {
                        path: 'start-price',
                        name: 'start-price',
                        component: CabinetTendersStartForm,
                        meta: { 
                            title: 'Объявить запрос цен без исполнения договора', 
                            breadcrumbs: ['tenders', 'tenders-start'],
                            requiresAuth: true 
                        },
                        props: { propType: 1 },
                    }, {
                        path: 'start-price-fulfilment',
                        name: 'start-price-fulfilment',
                        component: CabinetTendersStartForm,
                        meta: { 
                            title: 'Объявить запрос цен с исполнением договора', 
                            breadcrumbs: ['tenders', 'tenders-start'],
                            requiresAuth: true 
                        },
                        props: { propType: 2 },
                    }, {
                        path: 'drafts',
                        name: 'customer-drafts',
                        component: CabinetCustomerDrafts,
                        meta: { 
                            title: 'Черновики тендеров', 
                            breadcrumbs: ['customer'],
                            requiresAuth: true 
                        },
                        props: true,
                        children: [
                            {
                                path: ':id',
                                name: 'customer-drafts-tender',
                                component: tender,
                                meta: { 
                                    title: `%kind_detail% №%id%: %name%`, 
                                    breadcrumbs: ['customer'],
                                    requiresAuth: true 
                                },
                                props: true,
                            }, {
                                path: ':id/edit',
                                name: 'tender-edit',
                                component: CabinetTendersStartForm,
                                meta: { 
                                    title: 'Редактирование тендера',
                                    breadcrumbs: ['customer'],
                                    requiresAuth: true 
                                },
                                props: true,
                            }
                        ]
                    }, {
                        path: 'current',
                        name: 'customer-current',
                        component: CabinetCustomerTenders,
                        meta: { 
                            title: 'Текущие торги заказчика', 
                            breadcrumbs: ['customer'],
                            requiresAuth: true 
                        },
                        props: { 
                            status: 'currents' 
                        },
                        children: [
                            {
                                path: ':id',
                                name: 'customer-current-tender',
                                component: tender,
                                meta: { 
                                    title: `%kind_detail% №%id%: %name%`, 
                                    breadcrumbs: ['customer'],
                                    requiresAuth: true 
                                },
                                props: true,
                            }
                        ]
                    }, {
                        path: 'private',
                        name: 'customer-private',
                        component: CabinetCustomerPrivates,
                        meta: { 
                            title: 'Закрытые торги', 
                            breadcrumbs: ['customer'],
                            requiresAuth: true 
                        },
                        props: true,
                        children: [
                            {
                                path: ':id',
                                name: 'customer-private-tender',
                                component: tender,
                                meta: { 
                                    title: `%kind_detail% №%id%: %name%`, 
                                    breadcrumbs: ['customer'],
                                    requiresAuth: true 
                                },
                                props: true,
                            }
                        ]
                    }, {
                        path: 'closed',
                        name: 'customer-closed',
                        component: CabinetCustomerTenders,
                        meta: { 
                            title: 'Завершенные торги заказчика', 
                            breadcrumbs: ['customer'],
                            requiresAuth: true 
                        },
                        props: { 
                            status: 'closed' 
                        },
                        children: [
                            {
                                path: ':id',
                                name: 'customer-closed-tender',
                                component: tender,
                                meta: { 
                                    title: `%kind_detail% №%id%: %name%`, 
                                    breadcrumbs: ['customer'],
                                    requiresAuth: true 
                                },
                                props: true,
                            }
                        ]
                    }
                ]
            }, {
                path: 'participant',
                name: 'participant',
                component: CabinetParticipant,
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
                        component: CabinetParticipantTenders,
                        meta: { 
                            title: 'Текущие торги поставщика', 
                            breadcrumbs: ['participant'],
                            requiresAuth: true 
                        },
                        props: { 
                            status: 'currents' 
                        },
                        children: [
                            {
                                path: ':id',
                                name: 'participant-current-tender',
                                component: tender,
                                meta: { 
                                    title: `%kind_detail% №%id%: %name%`, 
                                    breadcrumbs: ['participant'],
                                    requiresAuth: true 
                                },
                                props: true,
                            }
                        ]
                    }, {
                        path: 'closed',
                        name: 'participant-closed',
                        component: CabinetParticipantTenders,
                        meta: { 
                            title: 'Завершенные торги поставщика', 
                            breadcrumbs: ['participant'],
                            requiresAuth: true 
                        },
                        props: { 
                            status: 'closed' 
                        },
                        children: [
                            {
                                path: ':id',
                                name: 'participant-closed-tender',
                                component: tender,
                                meta: { 
                                    title: `%kind_detail% №%id%: %name%`, 
                                    breadcrumbs: ['participant'],
                                    requiresAuth: true 
                                },
                                props: true,
                            }
                        ]
                    }, {
                        path: 'invites',
                        name: 'participant-invites',
                        component: СabinetParticipantInvites,
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
            },
        ]
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
        // ??????
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
        path: '/tenders',
        name: 'tenders',
        component: tenders,
        meta: { 
            title: 'Тендеры', 
            breadcrumbs: [],
            showSidebarAuth: true,
            //requiresAuth: true 
        },
        props: true,
        children: [
            {
                path: 'groups',
                name: 'tenders-groups',
                component: tendersGroups,
                meta: { title: 'Категории тендеров', showSidebarAuth: true },
                props: true,
            }, {
                path: 'groups/:parentslug?/:slug',
                name: 'tenders-group',
                component: tendersGroup,
                meta: { title: 'Категория тендеров', showSidebarAuth: true },
                props: true,
            }, {

                /*path: '',
                name: 'tenders',
                component: cabinetTendersList,
                meta: { 
                    title: 'Тендеры', 
                    breadcrumbs: [],
                    showSidebarAuth: true,
                    //requiresAuth: true 
                },
                props: true,
            }, {*/
                path: ':id',
                name: 'tender',
                component: tender,
                meta: { 
                    title: `%kind_detail% №%id%: %name%`, 
                    breadcrumbs: ['tenders'],
                    showSidebarAuth: true,
                    //requiresAuth: true 
                },
                props: true,
                /*}, {
                path: ':id/edit',
                name: 'tender-edit',
                component: cabinetTendersStartForm,
                meta: { 
                    title: 'Редактирование тендера',
                    breadcrumbs: ['tenders'],
                    requiresAuth: true 
                },
                props: true,
            */
            /*}, {
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
        path: '/contragents',
        name: 'contragents',
        component: contragents,
        meta: { 
            title: 'Контрагенты', 
            breadcrumbs: [],
            showSidebarAuth: true,
            //requiresAuth: true 
        },
        props: true,
        children: [
            {
                path: ':id',
                name: 'contragent',
                component: contragent,
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
        path: '/market',
        name: 'products',
        component: products,
        meta: { 
            title: 'Товары и услуги',
            breadcrumbs: [],
            showSidebarAuth: true
            //requiresAuth: true 
        },
        props: true,
        children: [
            {
                path: '/market/:slug',
                name: 'product',
                component: product,
                meta: { 
                    title: 'Товар',
                    breadcrumbs: [],
                    showSidebarAuth: true
                    //requiresAuth: true 
                },
                props: true,
            },
        ]
    }, {
        path: '/error500',
        name: 'page500',
        component: () => import('@/views/Page500.vue'),
        meta: { 
            title: 'Ошибка 500', 
            showSidebarAuth: true,
        },
    }, {
        path: '/error404',
        name: 'error404',
        component: () => import('@/views/Page404.vue'),
        meta: { 
            title: 'Ошибка 404', 
            showSidebarAuth: true,
        },
    }, {
        path: '/:catchAll(.*)*',
        name: 'page404',
        component: () => import('@/views/Page404.vue'),
        meta: { 
            title: 'Ошибка 404',
            showSidebarAuth: true,
        },
    }, 
];

export default routes
