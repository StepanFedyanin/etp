import WS from '@/utils/websocket';
import { chat as settings } from '@/settings';
import store from '@/store/store';

export default class {
    get settings() {
        return settings;
    }
    get ws() {
        if (!this.__ws) {
            this.__ws = new WS({
                url: `${this.settings.wsUrlPush}/${store.state.user.id}/`,
            });
        }
        return this.__ws;
    }
    openChat() {
        this.ws.open();
    }
    closeChat(code, messages) {
        this.ws.close(code, messages);
    }
    onEvent(event, handler) {
        this.ws.on(event, handler);
    }
    offEvent(event, handler) {
        this.ws.off(event, handler);
    }
}