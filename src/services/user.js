import { user as settings } from '@/settings';
import { REST, RESTError } from './rest';

export default class extends REST {
    static get settings() {
        return settings;
    }

    static obtainToken(params) {
        return this._post('token/create', {}, params).then((data) => {
            return data;
        }).catch((error) => {
            throw new RESTError(error, 'Ошибка при получении токена', { request: { params } });
        });
    }

    static refreshToken(params) {
        return this._post('token/refresh', {}, params).then((data) => {
            return data;
        }).catch((error) => {
            throw new RESTError(error, 'Ошибка при обновлении токена', { request: { params } });
        });
    }

    static updatePassword(params) {
        return this._post('change_password', {}, params).then((data) => {
            return data;
        }).catch((error) => {
            throw new RESTError(error, 'Ошибка при смене пароля', { request: { params } });
        });
    }

    static getMyProfile() {
        return this._get('profile', {}).then((data) => {
            return data;
        }).catch((error) => {
            throw new RESTError(error, 'Ошибка при получении профиля');
        });
    }

    static updateMyProfile() {
        return this._put('update_user', {}).then((data) => {
            return data;
        }).catch((error) => {
            throw new RESTError(error, 'Ошибка при обновлении профиля');
        });
    }

    static addProfile(params) {
        return this._post(`create_user`, {}, params).then((data) => {
            return data;
        }).catch((error) => {
            throw new RESTError(error, 'Не удалось добавить пользователя');
        });
    }

    static getProfile(id) {
        return this._get(`profiles/${id}`, {}).then((data) => {
            return data;
        }).catch((error) => {
            throw new RESTError(error, 'Ошибка при получении профиля пользователя');
        });
    }

    static updateProfile(id, params) {
        return this._put(`profiles/${id}`, {}, params).then((data) => {
            return data;
        }).catch((error) => {
            throw new RESTError(error, 'Ошибка при обновлении профиля', { request: { params } });
        });
    }

    static searchOrganization(params) {
        return this._post(`organizations/search`, {}, params).then((data) => {
            return data;
        }).catch((error) => {
            throw new RESTError(error, 'Не удалось осуществить поиск');
        });
    }

    static addOrganization(params) {
        return this._post(`organizations`, {}, params).then((data) => {
            return data;
        }).catch((error) => {
            throw new RESTError(error, 'Не удалось создать организацию');
        });
    }

    static getOrganization(params) {
        return this._get(`organizations`, {}, params).then((data) => {
            return data;
        }).catch((error) => {
            throw new RESTError(error, 'Не удалось получить организацию');
        });
    }
}
