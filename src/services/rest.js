import ajax from '@/utils/ajax';
import router from '@/router';
import store from '@/store';
import cache from '@/utils/cache';

class RESTError extends Error {
    constructor(error, message, params={}) {
        let detail = error.response && error.response.data && (error.response.data.detail || error.response.data.error && error.response.data.error.detail);
        let header = (message || error.message) + (detail ? ': ' + detail : '');
        super(header);

        this.name = this.constructor.name;
        this.parent = error;
        this.detail = detail;
        this.response = error.response;
        for (let k in params) {
            this[k] = params[k];
        }

        //if (this.response && (this.response.status === 401 || this.response.status === 403)) {
        if (this.response && (this.response.status === 401)) {
            store.dispatch('deathUser');
            router.push({ name: 'auth' });
        } else {
            if (typeof Error.captureStackTrace === 'function') {
                Error.captureStackTrace(this, this.constructor);
            } else { 
                this.stack = (new Error(header)).stack; 
            }
        }
    }
}

class REST {
    static get settings() {
        throw new Error('settings must be overridden');
    }
    static get serviceName() {
        return 'tugan';
    }
    /*
    static get serviceName() {
        throw new Error('serviceName must be overridden');
    }
    */
    static _get(url, params={}, extraParams, use_cache=false) {
        return this._request('get', url, params, {}, {}, extraParams, use_cache);
    }
    static _post(url, params, data) {
        return this._request('post', url, params, data);
    }
    static _put(url, params, data) {
        return this._request('put', url, params, data);
    }
    static _patch(url, params, data) {
        return this._request('patch', url, params, data);
    }
    static _delete(url, params, data) {
        return this._request('delete', url, params, data);
    }
    static _request(method, url, params={}, data={}, extraData={}, extraParams={}, use_cache=false) {
        let cache_key = null;
        if (use_cache) {
            cache_key = cache.key(this.serviceName, ajax.getUri({ url, params }), data);
            console.log('UseCache', cache_key);
            const result = cache.get(cache_key);
            if (result) {
                console.log('GetFromCache');
                return Promise.resolve(result);
            }
        }
        return ajax.request({
            method,
            url: `${this.settings.url}${url ? '/' : ''}${url}/`,
            params,
            data,
            extraData,
            extraParams,
            headers: this._getAuthHeaders()
        }).then((response) => {
            if (cache_key) {
                cache.set(cache_key, response.data);
            }
            return response.data;
        });
    }
    static _getAuthHeaders() {
        if (store.state.token) {
            return { 'Authorization': `Bearer ${store.state.token}` };
        }
    }
    static _cancelToken() {
        return ajax.cancelToken();
    }
}

export default REST;

export {
    RESTError,
    REST
};