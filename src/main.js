import { createApp } from 'vue'
import App from './App.vue'

import router from './router/router';
import store from './store/store';
import helpers from './utils/helpers';


const app = createApp(App);

app.use(store);
app.use(router);
app.use(helpers);

app.mount('#app');
