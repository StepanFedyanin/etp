import WS from '@/utils/websocket';
import { push as settings } from '@/settings';
import store from '@/store';

export default class {
    get settings() {
        return settings;
    }
    get ws() {
        if (!this.__ws) {
            this.__ws = new WS({
                url: `${this.settings.url}/${store.state.user.id}/`,
            });
        }
        return this.__ws;
    }
    openPush() {
        this.ws.open();
    }
    closePush(code, messages) {
        this.ws.close(code, messages);
    }
    onEvent(event, handler) {
        this.ws.on(event, handler);
    }
    offEvent(event, handler) {
        this.ws.off(event, handler);
    }
}