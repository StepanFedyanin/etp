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
        return this._post('update_password', {}, params).then((data) => {
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

    static updateMyProfile(params) {
        return this._patch('update_user', {}, params).then((data) => {
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
    // static getMyOrganization(){
    //     return this._get('organization', {}).then((data) => {
    //         return data;
    //     }).catch((error) => {
    //         throw new RESTError(error, 'Ошибка при получении моей организации');
    //     });
    // }

    static getMyOrganizationMembers(params) {
        return this._get(`organization/profiles`, {}, params).then((data) => {
            return data;
        }).catch((error) => {
            throw new RESTError(error, 'Не удалось получить представителей моей организации');
        });
    }

    static getOrganizationMembers(id, params) {
        return this._get(`organizations/${id}/members`, {}, params).then((data) => {
            return data;
        }).catch((error) => {
            throw new RESTError(error, 'Не удалось получить представителей организации');
        });
    }

    static updateOrganization(id, params) {
        return this._patch(`organizations/${id}`, {}, params).then((data) => {
            return data;
        }).catch((error) => {
            throw new RESTError(error, 'Ошибка при обновлении профиля организации');
        });
    }

    static getParticipationTenders(id, params) {
        return this._get(`organizations/${id}/participation_tenders`, {}, params).then((data) => {
            return data;
        }).catch((error) => {
            throw new RESTError(error, 'Ошибка при получении тендеров');
        });
    }

    static getCreatedTenders(id, params) {
        return this._get(`organizations/${id}/created_tenders`, {}, params).then((data) => {
            return data;
        }).catch((error) => {
            throw new RESTError(error, 'Ошибка при обновлении созданных тендеров');
        });
    }

    static sendInvites(params) {
        return this._post(`send_invites`, {}, params).then((data) => {
            return data;
        }).catch((error) => {
            throw new RESTError(error, 'Не удалось  отправить приглашения');
        });
    }
}
