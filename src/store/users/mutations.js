import { add, addPage, loading } from '@jorgenevens/rest-store';
import { apply } from '@/store/helpers';

export default {
    loadingUser: (state, { id }) => apply(loading, state, id),
    addUser: (state, { user }) => apply(add, state, user.login, user),
    loadingUserProjects: (state, { listName, page }) => {
        console.log('Loading projects', { listName, page }); //eslint-disable-line
        // TODO: needs library implementation
    },
    addUserProjects: (state, { listName, page, projects }) => {
        apply(addPage, state, listName, page, projects);
    }
};
