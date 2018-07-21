import wrapNode from '@/components/router/root-node';

import Users from '@/pages/users.vue';
import User from '@/pages/user.vue';

export default wrapNode('/users', [{
    name: 'users',
    component: Users
}, {
    name: 'user',
    path: ':id',
    component: User
}]);
