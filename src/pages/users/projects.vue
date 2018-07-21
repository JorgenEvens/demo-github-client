<template>
    <div>
        <h1>{{ $route.params.userId }} - Projects</h1>
        <ul v-for="project in projects" :key="project && project.full_name">
            <li v-if="!!project">{{ project.full_name }}</li>
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
        loading() {
            return isLoading(this.projects);
        },
        projects: getPage(
            '$route.params.page',
            (cmp) => 'projects.' + cmp.$route.params.userId,
            { namespace: 'projects',
              params: (cmp) => _pick(cmp.$route.params, 'userId')}
        )
    }
}
</script>
