const ajax = {
    timeout: 75000,
    responseType: 'json',
    responseEncoding: 'utf8'
};

const cache = {
    //storage: 'sessionStorage'
    storage: 'tempStorage'
};

const serviceUrl = {
    selfUrl: '//etptugan.ru',
    url: '//app.etptugan.ru',
}

let urlPath = `${serviceUrl.url}`;
let selfPath = `https:${serviceUrl.selfUrl}`;

const cabinet = {
    url: `${urlPath}/cabinet`,
    token: 'c7d63a2e58d186ae3760a5f7c690293e973c08c4'
};

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

const tenderChat = {
    url: `${urlPath}/tender`,
    wsUrl: `ws://${urlPath}/ws/chat`,
    wsUrlPush: `${urlPath}/push`,
    token: 'c7d63a2e58d186ae3760a5f7c690293e973c08c4'
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

const product = {
    url: `${urlPath}`,
};

const logger = {
    url: `${urlPath}/logger`,
    level: 'debug'
};

export {
    ajax,
    cache,

    tender,
    event,
    user,
    cabinet,
    category,
    common,
    geo,
    product,
    logger,
    urlPath,
    selfPath,
    chat,
    tenderChat,
    push,
    websocket,
};