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
let selfPath = `https:${serviceUrl.selfUrl}`;

const tender = {
    url: `${urlPath}/tender`,
    token: 'c7d63a2e58d186ae3760a5f7c690293e973c08c4'
};

const event = {
    url: `${urlPath}/event`,
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

const common = {
    url: `${urlPath}/common`
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

export {
    ajax,
    cache,

    tender,
    event,
    user,
    category,
    common,
    geo,
    logger,
    urlPath,
    selfPath,
    chat,
    push,
    websocket,

    headerMenu,
    headerMenuUser,
};