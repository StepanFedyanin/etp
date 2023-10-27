import { tenderChat as settings } from '@/settings';
import { REST, RESTError } from './rest';
import WS from '@/utils/websocket';
import store from '@/store';

export default class extends REST {
    static get settings() {
        return settings;
    }
    get settings() {
        return settings;
    }

    get ws() {
        if (!this.__ws) {
            this.__ws = new WS({
                url: `${this.settings.wsUrl}/${store.state.user.id}/`,
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
    sendMessage(data) {
        this.ws.send(data);
    }

    static getTenderChat(params) {
        let tender = params.tender;
        delete params.tender;
        return this._get(`${tender}/chat`, params, {}).then((data) => {
            return data;
        }).catch((error) => {
            throw new RESTError(error, 'Ошибка при получении чата тендера');
        });
    }
    static addTenderChatMessage(params) {
        let tender = params.tender;
        delete params.tender;
        return this._post(`${tender}/chat/message`, {}, params).then((data) => {
            return data;
        }).catch((error) => {
            throw new RESTError(error, 'Ошибка при добавлении сообщения в чата тендера');
        });
    }
    static deleteTenderChatMessage(params) {
        return this._delete(`${params.tender}/chat/message/${params.message}`, {}, {}).then((data) => {
            return data;
        }).catch((error) => {
            throw new RESTError(error, 'Ошибка при удалении сообщения в чата тендера');
        });
    }
}