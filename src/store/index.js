import Vue from 'vue';
import Vuex from 'vuex';

import auth from './auth';
import users from './users';
import projects from './projects';

Vue.use(Vuex);

export const store = new Vuex.Store({
    modules: {
        auth,
        users,
        projects
    }
});

export default store;
