import { tender as settings } from '@/settings';
import { REST, RESTError } from './rest';

export default class extends REST {
    static get settings() {
        return settings;
    }

    static getTenderList() {
        return this._get('list', {}).then((data) => {
            return data;
        }).catch((error) => {
            throw new RESTError(error, 'Ошибка при получении минималистичного список тендеров');
        });
    }

    static getTenderTenders(params) {
        return this._get('tenders', {}, params).then((data) => {
            return data;
        }).catch((error) => {
            throw new RESTError(error, 'Ошибка при получении список тендеров');
        });
    }

    static createTender(params) {
        return this._post('tenders/create_tender', {}, params).then((data) => {
            return data;
        }).catch((error) => {
            throw new RESTError(error, 'Не удалось создать тендер');
        });
    }
}
