import { throttleAll } from '@/store/helpers';
import github from '@/lib/api/github';

export default throttleAll({
    fetch({ commit }, opts) {
        commit('loadingUser', { id: opts.id });

        github.getUser(opts.id)
            .then(user => commit('addUser', { user }))
            .catch(err => console.error(err)); // eslint-disable-line
    }
});
