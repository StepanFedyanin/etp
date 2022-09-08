const ajax = {
    timeout: 75000,
    responseType: 'json',
    responseEncoding: 'utf8'
};

const cache = {
    storage: 'sessionStorage'
};

const serviceUrl = {
    selfUrl: '//etptugan.ru',
    url: '//app.etptugan.ru',
}

let urlPath = `${serviceUrl.url}`;

const tender = {
    url: `${urlPath}/tender`,
    token: 'c7d63a2e58d186ae3760a5f7c690293e973c08c4'
};

const user = {
    url: `${urlPath}/user`,
    token: 'c7d63a2e58d186ae3760a5f7c690293e973c08c4'
};

const websocket = {
    url: '/ws/',
    protocols: []
};

const chat = {
    url: `${urlPath}/chat`,
    wsUrl: `wss://${urlPath}/ws/chat`
};

const push = {
    url: `${urlPath}/push`
};

const category = {
    url: `${urlPath}`
};

const geo = {
    url: `${urlPath}/geo`
};

const logger = {
    url: `${urlPath}/logger`,
    level: 'debug'
};

const headerMenu = [
    {
        name: 'tenders',
        role: 'all',
        title: 'Тендеры'
    }, {
        name: 'groups',
        role: 'all',
        title: 'Товарные группы'
    }, {
        name: 'about',
        role: 'all',
        title: 'О площадке',
    }, {
        name: 'registration',
        role: 'all',
        title: 'Регистрация',
    }
];

const headerMenuUser = [
    {
        name: 'tenders',
        role: 'all',
        title: 'Тендеры'
    }, {
        name: 'groups',
        role: 'all',
        title: 'Товарные группы'
    }, {
        name: 'cabinet',
        role: 'all',
        title: 'Мой кабинет',
    }
];

const userMenu = [
    {
        name: 'profile',
        role: 'all',
        title: 'Мой профиль'
    }, {
        name: 'organization',
        role: 'all',
        title: 'моя организация',
    }
];

const footerMenu = [
    {
        name: 'needs',
        role: 'all',
        title: 'Наши потребности'
    }, {
        name: 'rules',
        role: 'all',
        title: 'Правила работы'
    }, {
        name: 'auth',
        role: 'all',
        title: 'Вход',
    }, {
        name: 'registration',
        role: 'all',
        title: 'Регистрация',
    }
];

const footerMenuUser = [
    {
        name: 'needs',
        role: 'all',
        title: 'Наши потребности'
    }, {
        name: 'rules',
        role: 'all',
        title: 'Правила работы'
    }, {
        name: 'profile',
        role: 'all',
        title: 'Профиль'
    }
];

const sidebarMenu = [
    {
        name: 'tenders',
        role: 'all',
        title: 'Тендеры',
        icon: 'search'
    }, {
        name: 'customer-current',
        role: 'all',
        title: 'Я - заказчик',
        icon: 'customer',
        items: [
            {
                name: 'tender-start',
                role: 'all',
                title: 'Объявить тендер',
                icon: 'loudspeaker'
            }, {
                name: 'customer-drafts',
                role: 'all',
                title: 'Черновики',
            }, {
                name: 'customer-current',
                role: 'all',
                title: 'Текущие торги',
            }, {
                name: 'private-tender',
                role: 'all',
                title: 'Закрытые торги',
            }, {
                name: 'customer-closed',
                role: 'all',
                title: 'Завершенные',
            }
        ]
    }, {
        name: 'participant-current',
        role: 'all',
        title: 'Я - поставщик',
        icon: 'provider',
        items: [
            {
                name: 'participant-current',
                role: 'all',
                title: 'Текущие торги',
            }, {
                name: 'participant-closed',
                role: 'all',
                title: 'Завершенные',
            }, {
                name: 'participant-invites',
                role: 'all',
                title: 'Приглашения',
            }
        ]
    }, {
        name: 'favorites',
        role: 'all',
        title: 'Избранные тендеры',
        icon: 'favorites'
    }, {
        name: 'contragents',
        role: 'all',
        title: 'Контрагенты',
        icon: 'peoples'
    }, {
        name: 'devider',
    }, {
        name: 'chat',
        role: 'all',
        title: 'Чат',
        icon: 'loudspeaker'
    }, {
        name: 'notifications',
        role: 'all',
        title: 'Уведомления',
        icon: 'notifications'
    },
    // {
    //     name: 'help',
    //     role: 'all',
    //     title: 'Помощь',
    //     icon: 'info'
    // }
];

export {
    ajax,
    cache,

    tender,
    user,
    category,
    geo,
    logger,
    urlPath,
    chat,
    push,
    websocket,

    headerMenu,
    headerMenuUser,
    footerMenu,
    footerMenuUser,
    userMenu,
    sidebarMenu,
};