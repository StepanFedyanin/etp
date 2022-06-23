import { createStore } from 'vuex'
import VuexPersist from 'vuex-persist';

const vuexPersist = new VuexPersist({
    key: 'tugan-v-cirk-ne-hodim',
    storage: window.localStorage
});

// Vue.use(Vuex);

export default createStore({
    state () {
        return {
            token: null,
            refreshToken: null,
            user: null,
            loader: null,
            error: null
        }
    },
    plugins: [vuexPersist.plugin],
    mutations: {
        user(state, user) {
            state.user = user;
        },
        updateToken(state, tokens) {
            state.token = tokens.access;
            state.refreshToken = tokens.refresh;
        },
        removeToken(state) {
            state.token = null;
            state.refreshToken = null;
        },
        stepRegistration(state, step) {
            state.stepRegistration = step;
        },
        regData(state, data) {
            state.regData = data;
        },
        updateError(state, error) {
            state.error = error;
        }
    },
    actions: {
        setToken(context, tokens) {
            context.commit('updateToken', tokens);
        },
        setUser(context, user) {
            context.commit('user', user);
        },
        deathUser(context) {
            context.commit('user', null);
            context.commit('removeToken');
        },
        setStepRegistration(context, step) {
            context.commit('stepRegistration', step);
        },
        setRegData(context, data) {
            context.commit('regData', data);
        },
        showError(context, error) {
            context.commit('updateError', error);
        },
        hideError(context) {
            context.commit('updateError', null);
        },
        showLoader(context, loader) {
            context.commit('loader', loader);
        },
        hideLoader(context) {
            context.commit('loader', null);
        }
    }
});
