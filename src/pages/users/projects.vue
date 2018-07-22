<template>
    <div>
        <h1>
            <router-link :to="{ name: 'user', params: { userId: userId }}">
                {{ userId }}
            </router-link>
            <span> - Projects</span>
        </h1>
        <ul style="list-style: none">
            <li v-for="project in projects" :key="project && project.full_name" v-if="!!project">
                <router-link :to="{ name: 'project', params: { projectId: project.full_name } }">
                    {{ project.full_name }}
                </router-link>
            </li>
        </ul>
        <strong v-if="loading">Loading</strong>
        <button @click="previous">Previous</button>
        <button @click="next">Next</button>
    </div>
</template>

<script>
import _pick from 'lodash/pick';
import { getPage } from '@/store/helpers';
import { isLoading } from '@jorgenevens/rest-store';

export default {
    methods: {
        changePage(change = 0) {
            const { userId, page = 1 } = this.$route.params;

            this.$router.push({
                name: 'user.projects.page',
                params: {
                    userId,
                    page: Math.max(parseInt(page, 10) + change, 1)
                }
            });

        },
        previous() {
            this.changePage(-1);
        },
        next() {
            this.changePage(1);
        }
    },
    computed: {
        userId() {
            return this.$route.params.userId
        },
        loading() {
            return isLoading(this.projects);
        },
        projects: getPage(
            '$route.params.page',
            (cmp) => 'projects.' + cmp.userId,
            { namespace: 'projects',
              params: (cmp) => _pick(cmp.$route.params, 'userId')}
        )
    }
}
</script>
