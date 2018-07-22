import { throttleAll } from '@/store/helpers';
import github from '@/lib/api/github';

export default throttleAll({
    fetch({ commit }, opts) {
        commit('loadingProject', { id: opts.id });

        github.getProject(opts.id)
            .then(project => commit('addProject', { project }))
            .catch(err => console.error(err)); // eslint-disable-line
    },
    fetchPage({ commit }, opts) {
        commit('loadingUserProjects', opts);

        const { page, listName } = opts;

        const query = {
            page,
            per_page: 10
        };

        github.getUserProjects(opts.userId, query)
            .then(projects => commit('addUserProjects', { page, listName, projects }))
            .catch(err => console.error(err)); // eslint-disable-line
    }
});
