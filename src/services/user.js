import { user as settings } from '@/settings';
import { REST, RESTError } from './rest';

export default class extends REST {
    static get settings() {
        return settings;
    }

    static addUser(params) {
        return this._post(``, {}, params).then((data) => {
            return data;
        }).catch((error) => {
            throw new RESTError(error, 'Не удалось зарегистрировать пользователя');
        });
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

    static recoveryPassword(params) {
        return this._post('password_reset_user', {}, params).then((data) => {
            return data;
        }).catch((error) => {
            throw new RESTError(error, 'Ошибка при восстановлении пароля', { request: { params } });
        });
    }


    /* Организации */

    static getOrganizations(params) {
        return this._get(`organizations`, params, params).then((data) => {
            return data;
        }).catch((error) => {
            throw new RESTError(error, 'Не удалось получить организации');
        });
    }

    static getOrganization(id, params) {
        return this._get(`organizations/${id}`, {}, params).then((data) => {
            return data;
        }).catch((error) => {
            throw new RESTError(error, 'Не удалось получить организацию');
        });
    }

    /* ????????  */
    static getCreatedTenders(id, params) {
        return this._get(`organizations/${id}/created_tenders`, {}, params).then((data) => {
            return data;
        }).catch((error) => {
            throw new RESTError(error, 'Ошибка при получении тендеров организации');
        });
    }

    /* ????????  */
    static getParticipationTenders(id, params) {
        return this._get(`organizations/${id}/participation_tenders`, {}, params).then((data) => {
            return data;
        }).catch((error) => {
            throw new RESTError(error, 'Ошибка при получении тендеров организации участника');
        });
    }

    /* ????????  */
    /*
    static getOrganizationProducts(id, params) {
        return this._get(`organizations/${id}/products`, {}, params).then((data) => {
            return data;
        }).catch((error) => {
            throw new RESTError(error, 'Не удалось получить товары организации');
        });
    }
    */

    static getOrganizationMembers(id, params) {
        return this._get(`organizations/${id}/members`, {}, params).then((data) => {
            return data;
        }).catch((error) => {
            throw new RESTError(error, 'Не удалось получить представителей организации');
        });
    }





    /* New */
    static updateUserPartial(params) {
        let id = params.id;
        delete params.id;
        return this._patch(`${id}`, {}, params).then((data) => {
            return data;
        }).catch((error) => {
            throw new RESTError(error, 'Ошибка при обновлении профиля', { request: { params } });
        });
    }

    /* New */
    /*
    static getUser(params) {
        return this._get(``, {}, {}).then((data) => {
            return data;
        }).catch((error) => {
            throw new RESTError(error, 'Не удалось получить пользователя');
        });
    }
    */

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

    static updateProfile(params) {
        return this._patch(`profiles/${params.id}`, {}, params).then((data) => {
            return data;
        }).catch((error) => {
            throw new RESTError(error, 'Ошибка при обновлении профиля', { request: { params } });
        });
    }

    static deleteProfile(id) {
        return this._delete(`profiles/${id}`, {}).then((data) => {
            return data;
        }).catch((error) => {
            throw new RESTError(error, 'Ошибка при деактивации профиля пользователя');
        });
    }

    static activateProfile(id) {
        return this._patch(`profiles/${id}`, {}, {'is_active': true}).then((data) => {
            return data;
        }).catch((error) => {
            throw new RESTError(error, 'Ошибка при активации профиля пользователя');
        });
    }






    static addOrganization(params) {
        return this._post(`organizations`, {}, params).then((data) => {
            return data;
        }).catch((error) => {
            throw new RESTError(error, 'Не удалось создать организацию');
        });
    }

    static applyOrganization(params) {
        return this._post(`organizations/apply`, {}, params).then((data) => {
            return data;
        }).catch((error) => {
            throw new RESTError(error, 'Не удалось изменить данные организации');
        });
    }



    /* new */
    static updateOrganizationPartial(id, params) {
        return this._patch(`organizations/${id}`, {}, params).then((data) => {
            return data;
        }).catch((error) => {
            throw new RESTError(error, 'Ошибка при обновлении профиля организации');
        });
    }

    static updateOrganization(id, params) {
        return this._patch(`organizations/${id}`, {}, params).then((data) => {
            return data;
        }).catch((error) => {
            throw new RESTError(error, 'Ошибка при обновлении профиля организации');
        });
    }



/*
    static addProduct(params) {
        return this._post(`products`, {}, params).then((data) => {
            return data;
        }).catch((error) => {
            throw new RESTError(error, 'Не удалось создать товар');
        });
    }

    static updateProduct(id, params) {
        return this._put(`products/${id}`, {}, params).then((data) => {
            return data;
        }).catch((error) => {
            throw new RESTError(error, 'Не удалось обновить товар');
        });
    }

    static applyProduct(id, params) {
        return this._patch(`products/${id}`, {}, params).then((data) => {
            return data;
        }).catch((error) => {
            throw new RESTError(error, 'Не удалось обновить параметры товара');
        });
    }

    static deleteProduct(id) {
        return this._delete(`products/${id}`, {}, {}).then((data) => {
            return data;
        }).catch((error) => {
            throw new RESTError(error, 'Не удалось удалить товар');
        });
    }

    static getProducts(params) {
        return this._get(`products`, params, {}).then((data) => {
            return data;
        }).catch((error) => {
            throw new RESTError(error, 'Не удалось получить товары');
        });
    }

    static getProduct(id, params) {
        return this._get(`products/${id}`, params, {}).then((data) => {
            return data;
        }).catch((error) => {
            throw new RESTError(error, 'Не удалось получить товар');
        });
    }
*/
}
