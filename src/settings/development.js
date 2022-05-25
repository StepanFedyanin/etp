const ajax = {
    timeout: 75000,
    responseType: 'json',
    responseEncoding: 'utf8'
};

const cache = {
    storage: 'sessionStorage'
};

const serviceUrl = {
    url: '//tugan-app.flexidev.ru',
    localPath: '//localhost',
    protocol: 'http',
    port: '8000',
    api: '/api',
    onLocal: false
}

let urlPath = `${serviceUrl.url}${serviceUrl.api}`;
if (serviceUrl.onLocal || window.location.hostname === 'localhost') {
    urlPath = `${serviceUrl.localPath}:${serviceUrl.port}${serviceUrl.api}`;
}

const tender = {
    url: `${urlPath}/tender`,
    token: 'c7d63a2e58d186ae3760a5f7c690293e973c08c4'
};

const user = {
    url: `${urlPath}/user`,
    token: 'c7d63a2e58d186ae3760a5f7c690293e973c08c4'
};

const logger = {
    url: `${urlPath}/logger`,
    level: 'debug',
    token: 'c7d63a2e58d186ae3760a5f7c690293e973c08c4'
};

const headerMenu = [
    {
        name: 'bidding',
        role: 'all',
        title: 'Торги'
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

const sidebarMenu = [
    {
        name: 'tenders',
        role: 'all',
        title: 'Тендеры',
        icon: 'search'
    }, {
        name: 'tender-start',
        role: 'all',
        title: 'Объявить тендер',
        icon: 'search'
    }
];

export {
    ajax,
    cache,

    tender,
    user,
    logger,

    // mainMenu,
    // accountMenu,
    headerMenu,
    footerMenu,
    sidebarMenu,
};