import { common as settings } from '@/settings';
import { REST, RESTError } from './rest';

export default class extends REST {
    static get settings() {
        return settings;
    }

    static getCurrenciesList() {
        return this._get('currencies', {}, {}).then((data) => {
            return data;
        }).catch((error) => {
            throw new RESTError(error, 'Ошибка при получении списка валют');
        });
    }

    static getCurrency(iso_name) {
        return this._get(`currencies/${iso_name}`, {}, {}).then((data) => {
            return data;
        }).catch((error) => {
            throw new RESTError(error, 'Ошибка при получении валюты');
        });
    }

    static getPageList(params) {
        return this._get('pages', {}, params).then((data) => {
            return data;
        }).catch((error) => {
            throw new RESTError(error, 'Ошибка при получении списка страниц');
        });
    }

    static getPage(slug) {
        return this._get(`pages/${slug}`, {}, {}).then((data) => {
            return data;
        }).catch((error) => {
            throw new RESTError(error, 'Ошибка при получении страницы');
        });
    }

    static getMetaScheme(slug) {
        return this._get(`seo_scheme`, {}, {}).then((data) => {
            return data;
        }).catch((error) => {
            throw new RESTError(error, 'Ошибка при получении схемы мета-тегов');
        });
    }
}
