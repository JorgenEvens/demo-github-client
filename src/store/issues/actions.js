import { throttleAll } from '@/store/helpers';
import { GitHub } from '@/lib/api/github';

export default throttleAll({
    fetch({ rootState, commit }, opts) {
        commit('loadingIssue', { id: opts.id });

        GitHub.fromState(rootState)
            .getIssue(opts.id)
            .then(issue => commit('addIssue', { issue }))
            .catch(err => console.error(err)); // eslint-disable-line
    },
    fetchPage({ rootState, commit }, opts) {
        commit('loadingProjectIssues', opts);

        const { page, listName, type } = opts;

        const query = {
            page,
            per_page: 10
        };

        const method = type === 'issue' ? 'getProjectIssues' : 'getProjectPulls';

        GitHub.fromState(rootState)[method](opts.projectId, query)
            .then(issues => commit('addProjectIssues', { page, listName, issues }))
            .catch(err => console.error(err)); // eslint-disable-line
    }
});
