import { cabinet as settings } from '@/settings';
import { REST, RESTError } from './rest';

export default class extends REST {
    static get settings() {
        return settings;
    }

    static getMyProfile() {
        return this._get('user', {}).then((data) => {
            return data;
        }).catch((error) => {
            throw new RESTError(error, 'Ошибка при получении профиля');
        });
    }

    static updateMyProfile(params) {
        let id = params.id;
        delete params.id;
        return this._put(`user/${id}`, {}, params).then((data) => {
            return data;
        }).catch((error) => {
            throw new RESTError(error, 'Ошибка при обновлении профиля');
        });
    }

    static updateMyProfilePartial(params) {
        let id = params.id;
        delete params.id;
        return this._patch(`user/${id}`, {}, params).then((data) => {
            return data;
        }).catch((error) => {
            throw new RESTError(error, 'Ошибка при обновлении профиля', { request: { params } });
        });
    }

    static updateMyProfilePhoto(id, params) {
        return this._patch(`user/${id}`, {}, params).then((data) => {
            return data;
        }).catch((error) => {
            throw new RESTError(error, 'Ошибка при обновлении профиля');
        });
    }

    static leaveMyOrganization() {
        return this._get('user/organization/leave', {}).then((data) => {
            return data;
        }).catch((error) => {
            throw new RESTError(error, 'Ошибка при выхода из организации');
        });
    }

    /* Мой маркет */

    static getMarketProfile() {
        return this._get('marketplace_user', {}).then((data) => {
            return data;
        }).catch((error) => {
            throw new RESTError(error, 'Ошибка при получении профиля маркета');
        });
    }

    static getMarketOrganizationProfile() {
        return this._get('marketplace_user/organization', {}).then((data) => {
            return data;
        }).catch((error) => {
            throw new RESTError(error, 'Ошибка при получении профиля маркета');
        });
    }

    static updateMarketProfile(params) {
        let id = params.id;
        delete params.id;
        return this._put(`marketplace_user/${id}`, {}, params).then((data) => {
            return data;
        }).catch((error) => {
            throw new RESTError(error, 'Ошибка при обновлении профиля маркета');
        });
    }

    static updateMarketOrganizationProfile(params) {
        let id = params.id;
        delete params.id;
        return this._put(`marketplace_user/organization/${id}`, {}, params).then((data) => {
            return data;
        }).catch((error) => {
            throw new RESTError(error, 'Ошибка при обновлении профиля маркета');
        });
    }

    static updateMarketProfilePartial(id, params) {
        return this._patch(`marketplace_user/${id}`, {}, params).then((data) => {
            return data;
        }).catch((error) => {
            throw new RESTError(error, 'Ошибка при обновлении профиля маркета', { request: { params } });
        });
    }

    static updateMarketOrganizationProfilePartial(id, params) {
        return this._patch(`marketplace_user/organization/${id}`, {}, params).then((data) => {
            return data;
        }).catch((error) => {
            throw new RESTError(error, 'Ошибка при обновлении профиля маркета', { request: { params } });
        });
    }

    static updateMarketProfilePhoto(id, params) {
        return this._patch(`marketplace_user/${id}`, {}, params).then((data) => {
            return data;
        }).catch((error) => {
            throw new RESTError(error, 'Ошибка при обновлении профиля маркета');
        });
    }

    static updateMarketOrganizationProfilePhoto(id, params) {
        return this._patch(`marketplace_user/organization/${id}`, {}, params).then((data) => {
            return data;
        }).catch((error) => {
            throw new RESTError(error, 'Ошибка при обновлении профиля маркета');
        });
    }

    /* Моя организация */

    static addMyOrganization(params) {
        return this._post(`organization`, {}, params).then((data) => {
            return data;
        }).catch((error) => {
            throw new RESTError(error, 'Не удалось создать организацию');
        });
    }

    static updateMyOrganizationLogo(id, params) {
        return this._patch(`organization`, {}, params).then((data) => {
            return data;
        }).catch((error) => {
            throw new RESTError(error, 'Ошибка при обновлении профиля организации');
        });
    }

    static getMyOrganization() {
        return this._get('organization', {}).then((data) => {
            return data;
        }).catch((error) => {
            throw new RESTError(error, 'Ошибка при получении моей организации');
        });
    }

    /* ????????  */
    static getOrganizationRelatedTenders() {
        return this._get(`organization/related_tenders`, {}, {}).then((data) => {
            return data;
        }).catch((error) => {
            throw new RESTError(error, 'Не удалось получить связанные тендеры');
        });
    }

    /* ????????  */
    static getOrganizationRelatedLots(params) {
        return this._get(`organization/related_lots`, {}, params).then((data) => {
            return data;
        }).catch((error) => {
            throw new RESTError(error, 'Не удалось получить лоты связанного тендера');
        });
    }

    static getMyFavoritesOrganizations(params) {
        return this._get(`organization/get_favorites`, params, params).then((data) => {
            return data;
        }).catch((error) => {
            throw new RESTError(error, 'Не удалось получить избранные организации');
        });
    }

    static switchFavoriteOrganization(id) {
        let params = {
            organization_id: id
        }
        return this._post(`organization/set_unset_favorite`, {}, params).then((data) => {
            return data;
        }).catch((error) => {
            throw new RESTError(error, 'Ошибка при изменении статуса избранной организации');
        });
    }

    static searchOrganizationKontur(params) {
        return this._post(`organization/search_by_kontur`, {}, params).then((data) => {
            return data;
        }).catch((error) => {
            throw new RESTError(error, 'Не удалось осуществить поиск');
        });
    }

    static addOrganizationKontur(params) {
        return this._post(`organization/create_by_kontur`, {}, params).then((data) => {
            return data;
        }).catch((error) => {
            throw new RESTError(error, 'Не удалось создать организацию');
        });
    }

    static updateOrganizationKontur(params) {
        let id = params.id;
        delete params.id;
        return this._put(`organization/${id}/update_from_kontur`, {}, params).then((data) => {
            return data;
        }).catch((error) => {
            throw new RESTError(error, 'Не удалось обновить организацию');
        });
    }

    static updateOrganizationKonturPartial(id, params) {
        //let id = params.id;
        //delete params.id;
        return this._patch(`organization/${id}/patch_from_kontur`, {}, params).then((data) => {
            return data;
        }).catch((error) => {
            throw new RESTError(error, 'Не удалось обновить организацию');
        });
    }

    static updateOrganizationKonturLogo(id, params) {
        return this._patch(`organization/${id}/patch_from_kontur`, {}, params).then((data) => {
            return data;
        }).catch((error) => {
            throw new RESTError(error, 'Не удалось обновить организацию');
        });
    }

    static sendInvites(params) {
        return this._post(`organization/email_invites`, {}, params).then((data) => {
            return data;
        }).catch((error) => {
            throw new RESTError(error, 'Не удалось отправить приглашения');
        });
    }

    /* Пользователи организации */

    static getMyOrganizationMembers(params) {
        return this._get(`organization/user`, {}, params).then((data) => {
            return data;
        }).catch((error) => {
            throw new RESTError(error, 'Не удалось получить представителей моей организации');
        });
    }

    static getMyOrganizationMember(id) {
        return this._get(`organization/user/${id}`, {}, {}).then((data) => {
            return data;
        }).catch((error) => {
            throw new RESTError(error, 'Не удалось получить представителя моей организации');
        });
    }

    static addMyOrganizationMember(params) {
        return this._post(`organization/user`, {}, params).then((data) => {
            return data;
        }).catch((error) => {
            throw new RESTError(error, 'Не удалось добавить представителя моей организации');
        });
    }

    static updateMyOrganizationMember(params) {
        let id = params.id;
        delete params.id;
        return this._put(`organization/user/${id}`, {}, params).then((data) => {
            return data;
        }).catch((error) => {
            throw new RESTError(error, 'Не удалось обновить представителя моей организации');
        });
    }

    static updateMyOrganizationMemberPartial(params) {
        let id = params.id;
        delete params.id;
        return this._patch(`organization/user/${id}`, {}, params).then((data) => {
            return data;
        }).catch((error) => {
            throw new RESTError(error, 'Не удалось обновить представителя моей организации');
        });
    }

    static excludeMyOrganizationMember(id) {
        return this._delete(`organization/user/${id}/kick`, {}, {}).then((data) => {
            return data;
        }).catch((error) => {
            throw new RESTError(error, 'Не удалось исключить представителя из моей организации');
        });
    }

    static updateMyOrganizationMemberPhoto(id, params) {
        return this._patch(`organization/user/${id}`, {}, params).then((data) => {
            return data;
        }).catch((error) => {
            throw new RESTError(error, 'Не удалось обновить представителя моей организации');
        });
    }


    /* Товары пользователя маркета */

    static addProduct(params) {
        return this._post(`product`, {}, params).then((data) => {
            return data;
        }).catch((error) => {
            throw new RESTError(error, 'Не удалось создать товар');
        });
    }

    static updateProduct(id, params) {
        return this._put(`product/${id}`, {}, params).then((data) => {
            return data;
        }).catch((error) => {
            throw new RESTError(error, 'Не удалось обновить товар');
        });
    }

    static updateProductPartial(id, params) {
        return this._patch(`product/${id}`, {}, params).then((data) => {
            return data;
        }).catch((error) => {
            throw new RESTError(error, 'Не удалось обновить параметры товара');
        });
    }

    static deleteProduct(id) {
        return this._delete(`product/${id}`, {}, {}).then((data) => {
            return data;
        }).catch((error) => {
            throw new RESTError(error, 'Не удалось удалить товар');
        });
    }

    static getProducts(params) {
        return this._get(`product`, params, {}).then((data) => {
            return data;
        }).catch((error) => {
            throw new RESTError(error, 'Не удалось получить товары');
        });
    }

    static getProduct(id) {
        return this._get(`product/${id}`, {}, {}).then((data) => {
            return data;
        }).catch((error) => {
            throw new RESTError(error, 'Не удалось получить товар');
        });
    }

    /* Фото товаров маркета */

    static addProductPhoto(params) {
        return this._post(`product_photo`, {}, params).then((data) => {
            return data;
        }).catch((error) => {
            throw new RESTError(error, 'Не удалось создать фото товара');
        });
    }

    static updateProductPhoto(id, params) {
        return this._put(`product_photo/${id}`, {}, params).then((data) => {
            return data;
        }).catch((error) => {
            throw new RESTError(error, 'Не удалось обновить фото товара');
        });
    }

    static updateProductPhotoPartial(id, params) {
        return this._patch(`product_photo/${id}`, {}, params).then((data) => {
            return data;
        }).catch((error) => {
            throw new RESTError(error, 'Не удалось обновить фото товара');
        });
    }

    static deleteProductPhoto(id) {
        return this._delete(`product_photo/${id}`, {}, {}).then((data) => {
            return data;
        }).catch((error) => {
            throw new RESTError(error, 'Не удалось удалить фото товара');
        });
    }

    /* Заявки на товары маркета */

    static createProductOrder(params) {
        return this._post(`product_order`, {}, params).then((data) => {
            return data;
        }).catch((error) => {
            throw new RESTError(error, 'Не удалось создать заявку на товар');
        });
    }

    static getProductOrders(params) {
        return this._get(`product_order`, {}, params).then((data) => {
            return data;
        }).catch((error) => {
            throw new RESTError(error, 'Не удалось получить список заявок на товар');
        });
    }

    static getProductOrder(id) {
        return this._get(`product_order/${id}`, {}, {}).then((data) => {
            return data;
        }).catch((error) => {
            throw new RESTError(error, 'Не удалось получить заявку на товар');
        });
    }
}
