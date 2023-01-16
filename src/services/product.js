import { product as settings } from '@/settings';
import { REST, RESTError } from './rest';

export default class extends REST {
    static get settings() {
        return settings;
    }


    static addProduct(params) {
        return this._post(`products`, {}, params).then((data) => {
            return data;
        }).catch((error) => {
            throw new RESTError(error, 'Не удалось создать товар');
        });
    }

    static updateProduct(slug, params) {
        return this._post(`products/${slug}/update_product`, {}, params).then((data) => {
            return data;
        }).catch((error) => {
            throw new RESTError(error, 'Не удалось обновить товар');
        });
    }

    static deleteProduct(slug) {
        return this._delete(`products/${slug}`, {}, {}).then((data) => {
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

    static getProduct(slug, params) {
        return this._get(`products/${slug}`, params, {}).then((data) => {
            return data;
        }).catch((error) => {
            throw new RESTError(error, 'Не удалось получить товар');
        });
    }
}
