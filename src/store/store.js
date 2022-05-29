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
            state.token = tokens.token;
            state.refreshToken = tokens.refreshToken;
        },
        removeToken(state) {
            state.token = null;
            state.refreshToken = null;
        },
        stepRegistration(state, step) {
            state.stepRegistration = step;
        },
        updateError(state, error) {
            state.error = error;
        }
    },
    actions: {
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
        showError(context, error) {
            context.commit('error', error);
        },
        hideError(context) {
            context.commit('error', null);
        },
        showLoader(context, loader) {
            context.commit('loader', loader);
        },
        hideLoader(context) {
            context.commit('loader', null);
        }
    }
});
