import { createApp } from 'vue';
import { plugin, defaultConfig } from '@formkit/vue';
import { vfmPlugin } from 'vue-final-modal';
import { ru } from '@formkit/i18n';
//import Maska from 'maska';

import App from './App.vue';

import router from './router/router';
import store from './store/store';
import helpers from './utils/helpers';


const app = createApp(App);

app.use(store);
app.use(router);
app.use(helpers);

app.use(vfmPlugin);

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
            options: '$reset field__options',
            option: '$reset field__option',
            decorator: '$reset field__decorator'
        }
    }
};

app.use(plugin, defaultConfig(confFormKit));
//app.use(Maska);

app.mount('#app');
