import Vue from 'vue';
import Vuex from 'vuex';
import VuexPersist from 'vuex-persist';

const vuexPersist = new VuexPersist({
    key: 'tugan-v-cirk-ne-hodim',
    storage: window.localStorage
});

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        token: null,
        refreshToken: null,
        user: null,
        loader: null,
        error: null
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
        updateError(state, error) {
            state.error = error;
        }
    },
    getters: {
        getUserRole: state => state.role,
        getUserName: state => state.username,
        getUserId: state => state.id
    },
    actions: {
        deathUser(context) {
            context.commit('user', null);
            context.commit('removeToken');
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
