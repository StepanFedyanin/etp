import { chat as settings } from '@/settings';
import { REST, RESTError } from './rest';
import WS from '@/utils/websocket';
import store from "@/store";

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

    static getChatList(type, params){
        return this._get(`chats/${type}`, {}, params).then((data) => {
            return data;
        }).catch((error) => {
            throw new RESTError(error, 'Ошибка при получении списка чатов');
        });
    }
    static getChatByTypeAndOrganization(type, params) {
        console.log(params);
        return this._post(`chats/${type}`, {}, params).then((data) => {
            return data;
        }).catch((error) => {
            throw new RESTError(error, 'Ошибка при создании и/или получении чата');
        });
    }
    static getChat(type, id){
        return this._get(`chats/${type}/${id}`, {}).then((data) => {
            return data;
        }).catch((error) => {
            throw new RESTError(error, 'Ошибка при получении информации по чату');
        });
    }
    static deleteChat(type, id){
        return this._delete(`chats/${type}/${id}`, {}).then((data) => {
            return data;
        }).catch((error) => {
            throw new RESTError(error, 'Ошибка при удалении чата');
        });
    }
    static getMessages(type, room, offset, limit){
        let data = {
            'offset': offset,
            'limit': limit
        }
        return this._get(`chats/${type}/${room}/messages`, {}, data).then((data) => {
            return data;
        }).catch((error) => {
            throw new RESTError(error, 'Ошибка при получении сообщений чата');
        });
    }
    static createMessages(type, room, params) {
        console.log(room, params)
        return this._post(`chats/${type}/${room}/messages`, {}, params).then((data) => {
            return data;
        }).catch((error) => {
            throw new RESTError(error, 'Ошибка при создании сообщения');
        });
    }
}
