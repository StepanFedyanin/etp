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
    url: '//tugan-app.flexidev.ru',
    localPath: '//localhost',
    protocol: 'http',
    port: '8000',
    api: '',
    onLocal: false
}

let urlPath = `${serviceUrl.url}${serviceUrl.api}`;
if (serviceUrl.onLocal || window.location.hostname === 'localhost') {
    urlPath = `${serviceUrl.localPath}:${serviceUrl.port}${serviceUrl.api}`;
}

let selfPath = `https:${serviceUrl.selfUrl}`;

/*
const serviceUrl = {
    selfUrl: 'https://etptugan.ru',
    url: 'https://app.etptugan.ru',
}
let urlPath = `${serviceUrl.url}`;
*/
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

// const chat = {
//     url: `${urlPath}/chat`,
//     token: 'c7d63a2e58d186ae3760a5f7c690293e973c08c4'
// };
const websocket = {
    url: '/ws/',
    protocols: []
};

const chat = {
    url: `${urlPath}/chat`,
    wsUrl: `ws://${urlPath}/ws/chat`,
    wsUrlPush: `${urlPath}/push`,
    token: 'c7d63a2e58d186ae3760a5f7c690293e973c08c4'
};

const push = {
    url: `${urlPath}/push`,
    token: 'c7d63a2e58d186ae3760a5f7c690293e973c08c4'
};

const category = {
    url: `${urlPath}`,
    token: 'c7d63a2e58d186ae3760a5f7c690293e973c08c4'
};

const common = {
    url: `${urlPath}/common`
};

const geo = {
    url: `${urlPath}/geo`,
    token: 'c7d63a2e58d186ae3760a5f7c690293e973c08c4'
};

const product = {
    url: `${urlPath}`,
    token: 'c7d63a2e58d186ae3760a5f7c690293e973c08c4'
};

const logger = {
    url: `${urlPath}/logger`,
    level: 'debug',
    token: 'c7d63a2e58d186ae3760a5f7c690293e973c08c4'
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
    product,
    logger,
    urlPath,
    selfPath,
    chat,
    push,
    websocket,

    // mainMenu,
    // accountMenu,
    headerMenu,
    headerMenuUser,
};