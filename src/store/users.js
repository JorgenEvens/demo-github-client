import { attach, add, loading } from '@jorgenevens/rest-store';
import { apply, throttleAll } from './helpers';
import { GitHub } from '@/lib/api/github';

export default {
    namespaced: true,

    state: apply(attach),

    actions: throttleAll({
        fetch({ rootState, commit }, opts) {
            commit('loadingUser', { id: opts.id });

            GitHub.fromState(rootState)
                .getUser(opts.id)
                .then(user => commit('addUser', { user }))
            // TODO: error handling
        }
    }),

    mutations: {
        loadingUser: (state, { id }) => apply(loading, state, id),
        addUser: (state, { user }) => apply(add, state, user.login, user)
    }
}
