import store from 'store';
import { GitHub } from '@/lib/api/github';

const LS_STATE = 'ghc/state';
const LS_TOKEN = 'ghc/access_token';
const LS_TARGET = 'ghc/target';

const uniqueState = store.get(LS_STATE) || Math.floor(Math.random() * 999999999);
store.set(LS_STATE, uniqueState);

export default {
    namespaced: true,

    state: {
        state: uniqueState,
        token: store.get(LS_TOKEN) || null,
        target: store.get(LS_TARGET) || null
    },

    actions: {
        exchangeCode({ commit }, { code, state }) {
            const gh = new GitHub();

            gh.exchangeCode(state, code)
                .then(token => commit('addToken', token));
        },
        setRedirectUri({ commit }, params) {
            commit('setRedirectUri', params);
        }
    },

    mutations: {
        addToken(state, token) {
            const { access_token } = token;

            store.set(LS_TOKEN, access_token);
            state.token = access_token;
        },
        setRedirectUri(state, { location }) {
            store.set(LS_TARGET, location);
            state.target = location;
        }
    }

}
