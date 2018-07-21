import Vue from 'vue';
import Vuex from 'vuex';

import users from './users';
import projects from './projects';

Vue.use(Vuex);

export const store = new Vuex.Store({
    modules: {
        users,
        projects
    }
});

export default store;
