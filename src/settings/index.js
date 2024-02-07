//throw new Error('Settings module must be replaced depending on mode');
const ajax = {
    timeout: process.env.AJAX_TIMEOUT,
    responseType: process.env.AJAX_RESPONSE_TYPE,
    responseEncoding: process.env.AJAX_ENCODING
};

const cache = {
    storage: process.env.CACHE_STORAGE
};

const serviceUrl = {
    selfUrl: process.env.SERVICE_SELF_URL,
    url: process.env.SERVICE_URL,
    protocol: process.env.SERVICE_PROTOCOL,
    port: process.env.SERVICE_PORT,
    api: process.env.SERVICE_API,
    localPath: '//localhost',
    onLocal: (process.env.SERVICE_ON_LOCAL === 'true')
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
};

const category = {
    url: `${urlPath}`,
};

const chat = {
    url: `${urlPath}/chat`,
    wsUrl: `ws://${urlPath}/ws/chat`,
    wsUrlPush: `${urlPath}/ws/push`,
};

const common = {
    url: `${urlPath}/common`
};

const event = {
    url: `${urlPath}/event`,
};

const tender = {
    url: `${urlPath}/tender`,
};

const user = {
    url: `${urlPath}/user`,
};

const websocket = {
    url: '/ws/',
    protocols: []
};

const tenderChat = {
    url: `${urlPath}/tender`,
    wsUrl: `ws://${urlPath}/ws/chat`,
    wsUrlPush: `${urlPath}/ws/push`,
};

const push = {
    url: `${urlPath}/ws/push`,
};

const geo = {
    url: `${urlPath}/geo`,
};

const product = {
    url: `${urlPath}`,
};

const logger = {
    url: `${urlPath}/logger`,
    level: 'debug',
};

const robotsTxt = {
    filePath: '/robots.txt',
    host: selfPath,
    policy: [
        {
            userAgent: process.env.ROBOTS_USER_AGENT,
            allow: JSON.parse(process.env.ROBOTS_ALLOW || null),
            disallow: JSON.parse(process.env.ROBOTS_DISALLOW || null),
        }
    ]
};

export {
    ajax,
    cabinet,
    cache,
    category,
    chat,
    common,
    event,
    geo,
    product,
    push,
    tender,
    tenderChat,
    user,
    logger,
    urlPath,
    selfPath,
    robotsTxt,
    websocket,
};
