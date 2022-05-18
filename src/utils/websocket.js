import _defaults from 'lodash/defaults';
import ajax from './ajax';
import { websocket as settings } from '@/settings';

export default class {
    constructor(options) {
        this.settings = _defaults({}, options, settings);
        this.__handlers = {};
    }
    get socket() {
        if (!this.__socket) {
            this.__socket = new WebSocket(this.url, this.protocols);

            this.__socket.onopen = (e) => {
                this.trigger('open', e);
            }
            this.__socket.onclose = (e) => {
                this.trigger('close', e.wasClean, e);
            }
            this.__socket.onmessage = (e) => {
                let data = e.data;
                if (/^(\{|\[)/.test(data)) {
                    data = JSON.parse(data);
                }
                this.trigger('message', data, e);
            }
            this.__socket.onerror = (e) => {
                this.trigger('error', e);
            }
        }
        return this.__socket;
    }
    get state() {
        return this.socket.readyState;
    }
    get isAvailable() {
        return (this.state === 0 || this.state === 1);
    }
    get url() {
        let url = this.settings.url;

        if (!/^\w+:/.test(url)) {
            const protocol = (document.location.protocol === 'https:') ? 'wss:' : 'ws:';

            if (/^\/\//.test(url)) {
                url = protocol + url;
            } else if (/^\//.test(url)) {
                url = protocol + '//' + document.location.host + url;
            } else {
                url = protocol + '//' + document.location.host + document.location.href + url;
            }
        }

        if (this.settings.params) {
            url = ajax.getUri({
                url,
                params: this.settings.params
            });
        }

        return url;
    }
    get protocols() {
        return (this.settings.protocols && this.settings.protocols.length) ? this.settings.protocols : null;
    }
    handlers(event) {
        if (!this.__handlers[event]) {
            this.__handlers[event] = [];
        }
        return this.__handlers[event];
    }
    on(event, handler) {
        this.handlers(event).push(handler);
    }
    off(event, handler) {
        let handlers = this.handlers(event);

        if (handler) {
            let i = 0;
            while (i < handlers.length) {
                if (handlers[i] === handler) {
                    handlers.splice(i, 1);
                } else {
                    i ++;
                }
            }
        } else {
            handlers.splice(0, handlers.length);
        }
    }
    trigger(event, ...args) {
        let handlers = this.handlers(event);

        for (let handler of handlers) {
            handler.apply(this.socket, args);
        }
    }
    open() {
        return new Promise((resolve) => {
            const socket = this.socket;
            resolve(socket);
        });
    }
    close(code, message) {
        return new Promise((resolve) => {
            this.socket.close(code, message);
            resolve();
        });
    }
    send(data) {
        if (this.isAvailable) {
            if (typeof data === 'object') {
                data = JSON.stringify(data);
            }
            this.socket.send(data);
        } else {
            throw new Error('Websocket is not available');
        }
    }
}
