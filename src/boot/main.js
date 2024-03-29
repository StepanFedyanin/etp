import { boot } from 'quasar/wrappers'
// import breadcrumbs from 'vue-3-breadcrumbs'
// import VueDatePicker from '@vuepic/vue-datepicker'
// import '@vuepic/vue-datepicker/dist/main.css'
import * as Sentry from '@sentry/vue';
import 'vue-final-modal/style.css'
import { VueFinalModal } from 'vue-final-modal'

import AppBreadcrumbs from '@/components/app-breadcrumbs.vue';

import datePickerInput from '@/components/inputs/date-picker-input';
import maskaInput from '@/components/inputs/maska-input';
import multiselectInput from '@/components/inputs/multiselect-input';
import phoneWithCodeInput from '@/components/inputs/phone-with-code-input';

import { plugin, defaultConfig, createInput } from '@formkit/vue'
import { ru } from '@formkit/i18n'
import Popper from 'vue3-popper';
import ResizeTextarea from 'resize-textarea-vue3'
import helpers from '@/utils/helpers'

// "async" is optional;
// more info on params: https://v2.quasar.dev/quasar-cli/boot-files
export default boot(async ({ app, router }) => {
    app.config.globalProperties.$router = router
    // app.use(breadcrumbs, {
    // includeComponent: false // {boolean} [includeComponent=false] - Include global breadcrumbs component or not
    // });
    console.log(process.env.BUILD_MODE);
    if (process.env.BUILD_MODE === 'production') {
        Sentry.init({
            app,
            dsn: "https://58dcbe2ab75d35ba65339fb488599f69@jora.flexites.org/11",
            integrations: [
                new Sentry.BrowserTracing({
                    // Set 'tracePropagationTargets' to control for which URLs distributed tracing should be enabled
                    tracePropagationTargets: ['localhost', /^https:\/\/etptugan\.ru\/api/],
                    routingInstrumentation: Sentry.vueRouterInstrumentation(router),
                }),
                new Sentry.Replay(),
            ],
            // Performance Monitoring
            tracesSampleRate: 1.0, // Capture 100% of the transactions
            // Session Replay
            replaysSessionSampleRate: 0.1, // This sets the sample rate at 10%. You may want to change it to 100% while in development and then sample at a lower rate in production.
            replaysOnErrorSampleRate: 1.0, // If you're not already sampling the entire session, change the sample rate to 100% when sampling sessions where errors occur.
        });
    }

    app.use(helpers);
    app.component('appBreadcrumbs', AppBreadcrumbs);
    app.component('VueFinalModal', VueFinalModal);
    // app.component('VueDatePicker', VueDatePicker);
    app.use(ResizeTextarea);
    const confFormKit = {
        locales: { ru },
        locale: 'ru',
        config: {
            validationVisibility: 'submit',
            classes: {
                outer: '$reset field',
                wrapper: '$reset field__inner',
                label: '$reset field__label',
                help: '$reset field__help',
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
                            return `${name} должна быть позже ${new Intl.DateTimeFormat(undefined, { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' }).format(typeof args[0] === 'string' ? new Date(Date.parse(args[0])) : args[0]) }`;
                        }
                        return `${name} должна быть в будущем.`;
                    },
                    date_before({ name, args }) {
                        if (Array.isArray(args) && args.length) {
                            return `${name} должна быть раньше ${new Intl.DateTimeFormat(undefined, { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' }).format(typeof args[0] === 'string' ? new Date(Date.parse(args[0])) : args[0]) }`;
                        }
                        return `${name} должна быть в прошлом.`;
                    },
                },
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
            phoneWithCode: createInput(phoneWithCodeInput, {
                props: ['options', 'placeholder', 'mode', 'searchable', 'maska', 'placeholder', 'disabled', 'readonly'],
            }),
        },
    };

    app.use(plugin, defaultConfig(confFormKit));
    app.component('Popper', Popper);
})

function date(date) {
    const dateTime = typeof date === 'string' ? new Date(Date.parse(date)) : date;
    if (!(dateTime instanceof Date)) {
        return '(unknown)';
    }
    return new Intl.DateTimeFormat(undefined, {
        dateStyle: 'medium',
    }).format(dateTime);
}