import { createApp } from 'vue';
import datePickerInput from '@/components/inputs/date-picker-input';
import maskaInput from '@/components/inputs/maska-input';
import multiselectInput from '@/components/inputs/multiselect-input';
import { plugin, defaultConfig, createInput } from '@formkit/vue';
import { vfmPlugin } from 'vue-final-modal';
import { ru } from '@formkit/i18n';
import Maska from 'maska';
import VueYandexMetrika from 'vue3-yandex-metrika';
import { createHead } from '@vueuse/head';
//import { createMetaManager } from 'vue-meta';
//import { plugin as vueMetaPlugin } from 'vue-meta';

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

app.use(createHead());
//app.use(createMetaManager());

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

const clickOutside = {
    beforeMount: (el, binding) => {
        el.clickOutsideEvent = event => {
            if (!(el == event.target || el.contains(event.target))) {
                binding.value();
            }
        };
        document.addEventListener('click', el.clickOutsideEvent);
    },
    unmounted: el => {
        document.removeEventListener('click', el.clickOutsideEvent);
    },
};
app.directive('clickOut', clickOutside);

app.use(VueYandexMetrika, {
    id: 90339048,
    router: router,
    env: 'production',
    debug: true,
    options: {
        clickmap: true,
        trackLinks: true,
        accurateTrackBounce: true,
        webvisor: true
    }
});

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