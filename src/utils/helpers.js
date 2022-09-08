//import _keys from 'lodash/keys';
import { parse, format } from 'fecha';


const helpers = {
    parseDate: (value, template) => {
        return (value && value.length === template.length) ? parse(value, template) : new Date(null);
    },
    formatDate: (value, template) => {
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
        let string = helpers.stringForNumber(days, ['день', 'дня', 'дней']) + ' ' + helpers.stringForNumber(hours, ['час', 'часа', 'часов']);
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
        console.log(title);
        if (obj) {
            Object.keys(obj).map((key) => {
                console.log(key);
                title = title.replace(`%${key}%`, obj[key]);
            });
            document.title = title;
        }
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
