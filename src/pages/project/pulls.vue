
<template>
    <div>
        <h2>
            <router-link :to="links.owner">{{ project.owner.login }}</router-link>
            <span> / </span>
            <router-link :to="links.project">{{ project.name }}</router-link>
        </h2>
        <div v-for="pull in pulls" :key="pull.number">
            <h2>{{ pull.title }}</h2>
            <div>
                <span class="tag">open</span>
                <span class="tag"
                    v-for="label in pull.labels"
                    :key="label.id"
                    :style="{ background: '#' + label.color }">
                    {{ label.name }}
                </span>
            </div>
            <p>
                {{ pull.body }}
            </p>
        </div>
    </div>
</template>

<script>
import { getPage, getResource } from '@/store/helpers';

export default {
    computed: {
        projectId() {
            return this.$route.params.projectId;
        },
        links() {
            return {
                owner: {
                    name: 'user',
                    params: {
                        userId: this.project.owner.login
                    }
                },
                project: {
                    name: 'project',
                    params: {
                        projectId: this.project.full_name
                    }
                }
            };
        },

        project: getResource('projectId', { namespace: 'projects' }),
        pulls: getPage(
            () => 1,
            (cmp) => `pulls.${cmp.projectId}`,
            { namespace: 'issues',
                params: ({ projectId }) => ({ projectId, type: 'pull_request' })}
        )
    }
}
</script>
