class Validator {
    static required(value) {
        if (value !== '') {
            return null;
        }
        return 'Обязательно для заполнения';
    }
    static date(value) {
        if (value === '') {
            return null;
        }

        if (/^(\d\d\d\d)-(\d\d)-(\d\d)$/.test(value)) {
            let d = parseInt(RegExp.$3),
                m = parseInt(RegExp.$2) - 1,
                Y = parseInt(RegExp.$1);

            let date = new Date(Y, m, d);
            if (date.getFullYear() === Y && date.getMonth() === m && date.getDate() === d) {
                return null;
            } else {
                return 'Дата не существует';
            }
        }
        return 'Неверный формат даты';
    }
    static email(value) {
        if (value === '') {
            return null;
        }

        if (/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value)) {
            return null;
        }
        return 'Неверный формат email';
    }
    static tel(value) {
        if (value === '') {
            return null;
        }

        if (/^\+7\s*(\d\d\d)\s(\d\d\d)\s(\d\d)\s(\d\d)$/.test(value)) {
            return null;
        }
        return 'Неверный формат телефона';
    }
    static number(value) {
        if (value === '') {
            return null;
        }

        if (/^(-|\+)?[0-9]+(\.[0-9]+)?$/i.test(value)) {
            return null;
        }
        return 'Необходимо ввести число';
    }
    static integer(value) {
        if (value === '') {
            return null;
        }

        if (/^(-|\+)?[0-9]+$/i.test(value)) {
            return null;
        }
        return 'Необходимо ввести целое число';
    }
    static name(value) {
        if (value === '') {
            return null;
        }

        if (/^[a-zа-яё0-9.,\-\s]+$/i.test(value)) {
            return null;
        }
        return 'Содержит недопустимые символы';
    }
    static regexp(value, re) {
        if (value === '' || re.test(value)) {
            return null;
        }
        return 'Содержит недопустимые символы';
    }
    static func(value, f) {
        if (value === '') {
            return null;
        }

        return f(value);
    }
}

export default Validator;
