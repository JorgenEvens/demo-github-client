import { add, addPage, loading, loadingPage } from '@jorgenevens/rest-store';
import { apply } from '@/store/helpers';

export default {
    loadingIssue: (state, { id }) => apply(loading, state, id),
    addIssue: (state, { issue }) => apply(add, state, issue.number, issue),

    loadingProjectIssues: (state, { listName, page }) => {
        apply(loadingPage, state, listName, page);
    },
    addProjectIssues: (state, { listName, page, issues }) => {
        const ids = issues.map(p => {
            apply(add, state, p.number, p);
            return p.number;
        })
        apply(addPage, state, listName, page, ids);

    }
};
