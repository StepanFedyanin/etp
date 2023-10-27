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
    //url: '//app.etptugan.ru',
    localPath: '//localhost',
    protocol: 'http',
    port: '8000',
    api: '',
    onLocal: false
}

let urlPath = `${serviceUrl.url}${serviceUrl.api}`;
if (process.env.CLIENT) {
    if (serviceUrl.onLocal || window.location.hostname === 'localhost') {
        urlPath = `${serviceUrl.localPath}:${serviceUrl.port}${serviceUrl.api}`;
    }
}

let selfPath = `https:${serviceUrl.selfUrl}`;

const cabinet = {
    url: `${urlPath}/cabinet`,
    token: 'c7d63a2e58d186ae3760a5f7c690293e973c08c4'
};

const category = {
    url: `${urlPath}`,
    token: 'c7d63a2e58d186ae3760a5f7c690293e973c08c4'
};

const chat = {
    url: `${urlPath}/chat`,
    wsUrl: `ws://${urlPath}/ws/chat`,
    wsUrlPush: `${urlPath}/push`,
    token: 'c7d63a2e58d186ae3760a5f7c690293e973c08c4'
};

const common = {
    url: `${urlPath}/common`
};

const event = {
    url: `${urlPath}/event`,
    token: 'c7d63a2e58d186ae3760a5f7c690293e973c08c4'
};

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

const tenderChat = {
    url: `${urlPath}/tender`,
    wsUrl: `ws://${urlPath}/ws/chat`,
    wsUrlPush: `${urlPath}/push`,
    token: 'c7d63a2e58d186ae3760a5f7c690293e973c08c4'
};

const push = {
    url: `${urlPath}/push`,
    token: 'c7d63a2e58d186ae3760a5f7c690293e973c08c4'
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

export {
    ajax,
    cache,

    cabinet,
    category,
    chat,
    common,
    event,
    geo,
    product,
    tender,
    tenderChat,
    user,
    logger,
    urlPath,
    selfPath,
    push,
    websocket,
};