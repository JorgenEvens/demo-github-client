import VueRouter from 'vue-router';

import routes from './index';

export const router = new VueRouter({
    mode: 'history',
    routes
});

export default router;
