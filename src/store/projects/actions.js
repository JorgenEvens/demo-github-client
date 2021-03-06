import { throttleAll } from '@/store/helpers';
import { GitHub } from '@/lib/api/github';

export default throttleAll({
    fetch({ rootState, commit }, opts) {
        commit('loadingProject', { id: opts.id });

        GitHub.fromState(rootState)
            .getProject(opts.id)
            .then(project => commit('addProject', { project }))
            .catch(err => console.error(err)); // eslint-disable-line
    },
    fetchPage({ rootState, commit }, opts) {
        commit('loadingUserProjects', opts);

        const { page, listName } = opts;

        const query = {
            page,
            per_page: 10
        };

        GitHub.fromState(rootState)
            .getUserProjects(opts.userId, query)
            .then(projects => commit('addUserProjects', { page, listName, projects }))
            .catch(err => console.error(err)); // eslint-disable-line
    }
});
