import { attach, add } from '@jorgenevens/rest-store';
import loading from '@jorgenevens/rest-store/lib/resource/loading';
import { apply, throttleAll } from './helpers';
import github from '@/lib/api/github';

export default {
    namespaced: true,

    state: apply(attach),

    actions: throttleAll({
        fetch({ commit }, opts) {
            commit('loadingUser', { id: opts.id });

            github.getUser(opts.id)
            .then(user => commit('addUser', { user }))
            // TODO: error handling
        }
    }),

    mutations: {
        loadingUser: (state, { id }) => apply(loading, state, id),
        addUser: (state, { user }) => apply(add, state, user.login, user)
    }
}
