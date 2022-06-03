import { createApp } from 'vue';
import { plugin, defaultConfig } from '@formkit/vue';
import { ru } from '@formkit/i18n';
import App from './App.vue';

import router from './router/router';
import store from './store/store';
import helpers from './utils/helpers';


const app = createApp(App);

app.use(store);
app.use(router);
app.use(helpers);

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
            messages: '$reset field__comment'
        }
    }
};

app.use(plugin, defaultConfig(confFormKit));

app.mount('#app');
