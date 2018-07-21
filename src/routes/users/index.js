import { wrapNode } from '@/routes/helpers';

import Users from '@/pages/users';
import User from '@/pages/users/user';
import Projects from '@/pages/users/projects';

export default wrapNode('/users', [
    {
        name: 'users',
        component: Users
    },
    wrapNode(':userId', [{
        name: 'user',
        component: User
    }, {
        name: 'user.projects',
        path: 'projects',
        component: Projects
    }, {
        name: 'user.projects.page',
        path: 'projects/:page',
        component: Projects
    }])
]);
