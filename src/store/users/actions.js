import { throttleAll } from '@/store/helpers';
import { GitHub } from '@/lib/api/github';

export default throttleAll({
    fetch({ rootState, commit }, opts) {
        commit('loadingUser', { id: opts.id });

        GitHub.fromState(rootState)
            .getUser(opts.id)
            .then(user => commit('addUser', { user }))
            .catch(err => console.error(err)); // eslint-disable-line
    }
});
