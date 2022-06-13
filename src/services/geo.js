import { geo as settings } from '@/settings';
import { REST, RESTError } from './rest';

export default class extends REST {
    static get settings() {
        return settings;
    }

    static getRegions() {
        return this._get('regions', {}).then((data) => {
            return data;
        }).catch((error) => {
            throw new RESTError(error, 'Ошибка при получении регионов');
        });
    }
}
