import Project from '@/pages/project';
import Issues from '@/pages/project/issues';
import Pulls from '@/pages/project/pulls';

import { wrapNode } from '@/routes/helpers';

export default wrapNode('projects/:projectId', [{
    name: 'project',
    component: Project
}, {
    name: 'project.issues',
    path: 'issues',
    component: Issues
}, {
    name: 'project.pulls',
    path: 'pulls',
    component: Pulls
}]);
