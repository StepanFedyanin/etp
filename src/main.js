import { createApp } from 'vue';
import datePickerInput from '@/components/inputs/date-picker-input';
import maskaInput from '@/components/inputs/maska-input';
import multiselectInput from '@/components/inputs/multiselect-input';
import { plugin, defaultConfig, createInput } from '@formkit/vue';
import { vfmPlugin } from 'vue-final-modal';
import { ru } from '@formkit/i18n';
import Maska from 'maska';

import App from './App.vue';

import router from './router/router';
import store from './store/store';
import helpers from './utils/helpers';


const app = createApp(App);

app.use(store);
app.use(router);
app.use(helpers);

app.use(vfmPlugin);
app.use(Maska);

const confFormKit = {
    locales: { ru },
    locale: 'ru',
    config: {
        validationVisibility: 'submit',
        classes: {
            outer: '$reset field',
            wrapper: '$reset field__inner',
            label: '$reset field__label',
            inner: '$reset field__input',
            input: '$reset input',
            messages: '$reset field__comment',
            message: '$reset field__comment-item',
            legend: '$reset field__legend',
            fieldset: '$reset field__fieldset',
            options: '$reset field__options',
            option: '$reset field__option',
            decorator: '$reset field__decorator'
        },
    },
    messages: {
        ru: {
            validation: {
                date_after({ name, args }) {
                    if (Array.isArray(args) && args.length) {
                        return `${name} должна быть позже ${date(args[0])}`;
                    }
                    return `${name} должна быть в будущем.`;
                },
                date_before({ name, args }) {
                    if (Array.isArray(args) && args.length) {
                        return `${name} должна быть раньше ${date(args[0])}`;
                    }
                    return `${name} должна быть в прошлом.`;
                },
            }
        }
    },
    inputs: {
        datepicker: createInput(datePickerInput, {
            props: ['mode'],
        }),
        select: createInput(multiselectInput, {
            props: ['options', 'placeholder', 'mode', 'searchable'],
        }),
        multiselect: createInput(multiselectInput, {
            props: ['options', 'placeholder', 'mode', 'searchable'],
        }),
        maska: createInput(maskaInput, {
            props: ['maska', 'placeholder', 'disabled', 'readonly'],
        }),
    },
};

app.use(plugin, defaultConfig(confFormKit));

app.mount('#app');

function date(date) {
    const dateTime = typeof date === 'string' ? new Date(Date.parse(date)) : date;
    if (!(dateTime instanceof Date)) {
        return '(unknown)';
    }
    return new Intl.DateTimeFormat(undefined, {
        dateStyle: 'medium',
    }).format(dateTime);
}