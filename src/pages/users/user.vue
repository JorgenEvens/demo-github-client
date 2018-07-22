
<template>
    <div>
        <div v-if="user">
            <h1>{{ user.login }}</h1>
            <hr />
            <nav>
                <router-link :to="projectsUrl">Projects</router-link>
            </nav>
            <hr />
            <ul>
                <li>Repos: {{ user.public_repos }}</li>
                <li>Gists: {{ user.public_gists }}</li>
                <li>Followers: {{ user.followers }}</li>
                <li>Following: {{ user.following }}</li>
            </ul>
            <hr />
            <ul v-for="project in projects" :key="project.full_name">
                <li>
                    <router-link :to="projectUrl(project)">
                        {{ project.full_name }}
                    </router-link>
                </li>
            </ul>
        </div>
        <strong v-if="loading">Loading</strong>
    </div>
</template>

<script>
import _pick from 'lodash/pick';
import { getResource, getPage } from '@/store/helpers';
import { isLoading } from '@jorgenevens/rest-store';

export default {
    methods: {
        projectUrl(project) {
            return {
                name: 'project',
                params: {
                    projectId: project.full_name
                }
            }
        }
    },
    computed: {
        projectsUrl() {
            return {
                name: 'user.projects',
                userId: this.$route.params.userId
            };
        },
        loading() {
            return isLoading(this.user);
        },
        userId() { return this.$route.params.userId },
        page() { return this.$route.params.page },

        user: getResource('userId', { namespace: 'users' }),
        projects: getPage(
            () => 1,
            (cmp) => `projects.${cmp.userId}`,
            { namespace: 'projects',
              params: (cmp) => _pick(cmp, 'userId') }
        )
    }
}
</script>
