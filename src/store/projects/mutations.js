import loading from '@jorgenevens/rest-store/lib/resource/loading';
import { add, addPage } from '@jorgenevens/rest-store';
import { apply } from '@/store/helpers';

export default {
    loadingProject: (state, { id }) => apply(loading, state, id),
    addProject: (state, { project }) => apply(add, state, project.full_name, project),

    loadingUserProjects: (state, { listName, page }) => {
        console.log('Loading projects', { listName, page }); //eslint-disable-line
        // TODO: needs library implementation
    },
    addUserProjects: (state, { listName, page, projects }) => {
        const ids = projects.map(p => {
            apply(add, state, p.full_name, p);
            return p.full_name;
        })
        apply(addPage, state, listName, page, ids);

    }
};
