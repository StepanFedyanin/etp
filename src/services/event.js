import { event as settings } from '@/settings';
import { REST, RESTError } from './rest';

export default class extends REST {
    static get settings() {
        return settings;
    }

    static getNotifications(params) {
        return this._get(`notifications`, params, {}).then((data) => {
            return data;
        }).catch((error) => {
            throw new RESTError(error, 'Не удалось получить уведомления');
        });
    }

    static getNotificationsSettings(params) {
        return this._get(`settings`, params, {}).then((data) => {
            return data;
        }).catch((error) => {
            throw new RESTError(error, 'Не удалось получить настроек уведомлений');
        });
    }

    static toggleNotificationsEmail(params) {
        return this._patch(`settings/toggle_email`, {}, params).then((data) => {
            return data;
        }).catch((error) => {
            throw new RESTError(error, 'Не удалось изменить настроку уведомления email');
        });
    }

    static toggleNotificationsPush(params) {
        return this._patch(`settings/toggle_push`, {}, params).then((data) => {
            return data;
        }).catch((error) => {
            throw new RESTError(error, 'Не удалось изменить настроку уведомления push');
        });
    }
}
