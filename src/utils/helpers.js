//import _keys from 'lodash/keys';
import { parse, format } from 'fecha';
import store from '@/store';

const helpers = {
    parseDate: (value, template) => {
        return (value && value.length === template.length) ? parse(value, template) : new Date(null);
    },
    formatDate: (value, template, timezone) => {
        if (timezone) {
            value = new Date(value.toLocaleString('EN-en', { timeZone: timezone }))
        }
        return value ? format(value, template) : '';
    },
    toHHMMSS: (value) => {
        let sec_num = parseInt(value, 10);
        let hours   = Math.floor(sec_num / 3600);
        let minutes = Math.floor((sec_num - (hours * 3600)) / 60);
        let seconds = sec_num - (hours * 3600) - (minutes * 60);
        if (hours   < 10) { hours   = "0" + hours; }
        if (minutes < 10) { minutes = "0" + minutes;}
        if (seconds < 10) { seconds = "0" + seconds; }
        return hours + ':' + minutes + ':' + seconds;
    },
    stringForNumber: (value, strings) => {
        let idx = 2;
        let num = value;
        if (num > 100) {
            num = num % 100;
        }
        if ((num < 10) || (num > 19)) {
            let z = num % 10;
            if (z === 1) {
                idx = 0;
            } else if ((z > 1) && (z < 5)) {
                idx = 1;
            }
        }
        return value + ' ' + strings[idx];
    },
    toPrice: (value, params) => {
        if (!params) {
            params = {};
        }
        value = value * 1;
        let kop = Math.floor((Math.abs(value - Math.floor(value)) + 0.005) * 100);
        if (kop < 10) {
            kop = '0' + kop;
        }
        // console.log(kop);
        value = Math.floor(value + 0.0001);
        value = value + '';
        let text = '';
        let l = value.length;
        let i = 0;
        let k;
        while (i < l) {
            k = ((i === 0) && (l % 3 > 0)) ? l % 3 : 3;
            if (i + k < l) {
                text = text + value.substr(i, k) + ' ';
            } else {
                text = text + value.substr(i, k);
            }
            i = i + k;
        }
        if (params.pointer) {
            text = text + params.pointer + kop;
        }
        if (params.sign) {
            text = text + ' ' + params.sign;
        }
        return text;
    },
    validateEmail: (email) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    },
    formatTel: (number) => {
        if (number) {
            // eslint-disable-next-line
            return `tel:${number.replace(/[^\d\+]/g, '')}`
        }

        return false
    },
    range: (start, end, step = 1, toFixed = null) => {
        let arr = []
        
        while(start <= end) {
            if (toFixed)
                start = Number(start.toFixed(toFixed))
            arr.push(start)
            start += step
        }
        return arr
    },
    getFilename: (filepath) => {
        // eslint-disable-next-line
        return filepath.replace(/^.*[\\\/]/, '')
    },
    dateRangeToDaysHours(start, end) {
        let limit = (end - start) / 1000;
        let days = Math.floor(Math.abs(limit / (3600 * 24)));
        let hours = Math.floor(Math.abs(limit / 3600 - days * 24));
        let mins = Math.floor(Math.abs(limit / 60 - days * 24 - hours * 60));
        let string = '';
        if (days !== 0) {
            string = helpers.stringForNumber(days, ['день', 'дня', 'дней']) + ' ' + helpers.stringForNumber(hours, ['час', 'часа', 'часов']);
        } else {
            string = helpers.stringForNumber(hours, ['час', 'часа', 'часов']) + ' ' + helpers.stringForNumber(mins, ['минута', 'минуты', 'минут']);
        }
        return string;
    },
    timerToDaysTime(timer) {
        let limit = new Date(timer).getTime();
        console.log(limit);
        let days = Math.floor(Math.abs(limit / (3600 * 24)));
        let time = Math.abs(limit / 3600 - days * 24);
        let string = helpers.stringForNumber(days, ['день', 'дня', 'дней']) + ' ' + helpers.toHHMMSS(time);
        return string;
    },

    setDocumentTitle(obj) {
        let title = document.title;
        let description = document.querySelector('head meta[name="description"]');
        let keywords = document.querySelector('head meta[name="keywords"]');
        if (obj) {
            Object.keys(obj).map((key) => {
                title = title.replace(`%${key}%`, obj[key]);
            });
            document.title = title;
        }
    },
    setDocumentMeta(obj) {
        if (obj) {
            const description = document.querySelector('head meta[name="description"]');
            const keywords = document.querySelector('head meta[name="keywords"]');
            if (obj.description) {
                description.setAttribute('content', obj.description);
            } else {
                Object.keys(obj).map((key) => {
                    description.content = description.content.replace(`%${key}%`, obj[key]);
                });
            }
            if (obj.keywords) {
                keywords.setAttribute('content', obj.keywords || '');
            } else {
                Object.keys(obj).map((key) => {
                    keywords.content = keywords.content.replace(`%${key}%`, obj[key]);
                });
            }
        }
    },
    createTitle: (obj, route) => {
        if (obj && obj.title) return obj.title;
        let metaTemplates = store.state.metaScheme;
        let title = (metaTemplates.commonPfx?.title || '') + (metaTemplates[route.name]?.title || obj.name || route.meta.title) + ' ' + (metaTemplates.commonSfx?.title || '');
        Object.keys(obj).map((key) => {
            title = title.replace(`%${key}%`, obj[key]);
        });
        title = title.replace(/%.*%/, '');
        return title;
    },

    createDescription: (obj, route) => {
        if (obj && obj.description) return obj.description;
        let metaTemplates = store.state.metaScheme;
        let description = (metaTemplates.commonPfx?.description || '') + (metaTemplates[route.name]?.description || '') + ' ' + (metaTemplates.commonSfx?.description || '');
        Object.keys(obj).map((key) => {
            description = description.replace(`%${key}%`, obj[key]);
        });
        description = description.replace(/%.*%/, '');
        return description;
    },

    createKeywords: (obj, route) => {
        console.log(store.state);
        if (obj && obj.keywords) return obj.keywords;
        let metaTemplates = store.state.metaScheme;
        let keywords = (metaTemplates.commonPfx?.keywords || '') + (metaTemplates[route.name]?.keywords || '') + ' ' + (metaTemplates.commonSfx?.keywords || '');
        Object.keys(obj).map((key) => {
            keywords = keywords.replace(`%${key}%`, obj[key]);
        });
        keywords = keywords.replace(/%.*%/, '');
        return keywords;
    },
    curDateMSK() {
        return parse(new Date().toLocaleString('ru', { timeZone: 'Europe/Moscow' }), 'DD.MM.YYYY, HH:mm:ss');
    }
}

export default {
    install (app) {
        app.helpers = helpers
        app.config.globalProperties.$helpers = helpers
    }
}
export {
    helpers    
}