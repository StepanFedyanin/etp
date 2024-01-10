import { category as settings } from '@/settings';
import { REST, RESTError } from './rest';

export default class extends REST {
    static get settings() {
        return settings;
    }

    static getCategoryList(params) {
        return this._get('category', {}, params).then((data) => {
            return data;
        }).catch((error) => {
            throw new RESTError(error, 'Ошибка при получении категорий рекурсивно');
        });
    }

    static getCategory(slug) {
        return this._get(`category/${slug}`, {}, {}).then((data) => {
            return data;
        }).catch((error) => {
            throw new RESTError(error, 'Ошибка при получении категории');
        });
    }

    /* new */
    static getCategoryListProducts(params) {
        return this._get('category/category_products', params, {}, true).then((data) => {
            return data;
        }).catch((error) => {
            throw new RESTError(error, 'Ошибка при получении категорий товаров рекурсивно');
        });
    }

    static getCategoryProducts(slug) {
        return this._get(`category/category_products/${slug}`, {}, {}).then((data) => {
            return data;
        }).catch((error) => {
            throw new RESTError(error, 'Ошибка при получении категории');
        });
    }

    static getCategoryPlainListProduct(params) {
        return this._get('category/category_products/plain', {}, params).then((data) => {
            return data;
        }).catch((error) => {
            throw new RESTError(error, 'Ошибка при получении категорий товаров рекурсивно');
        });
    }

    /*
    static getCategoryProducts(slug, params) {
        return this._get(`category/${slug}/products`, params, {}).then((data) => {
            return data;
        }).catch((error) => {
            throw new RESTError(error, 'Ошибка при получении товаров категории');
        });
    }
    */

    static getCategoryTenders(slug, params) {
        return this._get(`category/${slug}/tenders`, params, {}).then((data) => {
            return data;
        }).catch((error) => {
            throw new RESTError(error, 'Ошибка при получении тендеров категории');
        });
    }

    static getSubCategory(parentslug, slug) {
        return this._get(`category/${parentslug}/categories/${slug}`, {}, {}).then((data) => {
            return data;
        }).catch((error) => {
            throw new RESTError(error, 'Ошибка при получении подкатегории');
        });
    }

    static getSubCategoryProducts(parentslug, slug, params) {
        return this._get(`category/${parentslug}/categories/${slug}/products`, params, {}).then((data) => {
            return data;
        }).catch((error) => {
            throw new RESTError(error, 'Ошибка при получении товаров подкатегории');
        });
    }

    static getSubCategoryTenders(parentslug, slug, params) {
        return this._get(`category/${parentslug}/categories/${slug}/tenders`, params, {}).then((data) => {
            return data;
        }).catch((error) => {
            throw new RESTError(error, 'Ошибка при получении тендеров подкатегории');
        });
    }
}
