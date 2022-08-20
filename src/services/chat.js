import { chat as settings } from '@/settings';
import { REST, RESTError } from './rest';


export default class extends REST {
    static get settings() {
        return settings;
    }

    static getChatList(params){
        return this._get('chats', {}, params).then((data) => {
            return data;
        }).catch((error) => {
            throw new RESTError(error, 'Ошибка при получении списка чатов');
        });
    }
    static getChatByTenderAndOrganization(params) {
        return this._post('chats/get_create', {}, params).then((data) => {
            return data;
        }).catch((error) => {
            throw new RESTError(error, 'Ошибка при создании и/или получении чата');
        });
    }
    static getChat(id){
        return this._get(`chats/${id}`, {}).then((data) => {
            return data;
        }).catch((error) => {
            throw new RESTError(error, 'Ошибка при получении информации по чату');
        });
    }
    static deleteChat(id){
        return this._delete(`chats/${id}`, {}).then((data) => {
            return data;
        }).catch((error) => {
            throw new RESTError(error, 'Ошибка при удалении чата');
        });
    }
    static getMessages(room, params){
        return this._get(`chats/${room}/messages`, {}, params).then((data) => {
            return data;
        }).catch((error) => {
            throw new RESTError(error, 'Ошибка при получении последних сообщений');
        });
    }
    static createMessages(room, params){
        return this._post(`chats/${room}/messages`, {}, params).then((data) => {
            return data;
        }).catch((error) => {
            throw new RESTError(error, 'Ошибка при создании сообщения');
        });
    }
}