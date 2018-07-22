<template>
    <div>
        <h1>Projects</h1>
        <div v-if="isOK">
            <h2>
                <router-link :to="links.owner">{{ project.owner.login }}</router-link>
                <span> / {{ project.name }}</span>
            </h2>
            <hr />
            <nav>
                <ul>
                    <li>
                        <router-link :to="links.issues">
                            {{ issues.length }} issues
                        </router-link>
                    </li>
                    <li>
                        <router-link :to="links.pulls">
                            {{ pulls.length }} pulls
                        </router-link>
                    </li>
                </ul>
            </nav>
            <hr />
            <ul>
                <li>Stars: {{ project.stargazers_count }}</li>
                <li>Forks: {{ project.forks_count }}</li>
                <li>Clone: {{ project.ssh_url }}</li>
                <li>Last Pushed: {{ last_pushed }}</li>
            </ul>
        </div>
        <div v-if="isLoading">
            Loading
        </div>
    </div>
</template>
<script>
import moment from 'moment';
import { isOK, isLoading } from '@jorgenevens/rest-store';
import { getResource, getPage } from '@/store/helpers';

export default {
    computed: {
        projectId() { return this.$route.params.projectId },
        links() {
            return {
                owner: {
                    name: 'user',
                    params: {
                        userId: this.project.owner.login
                    }
                },
                issues: {
                    name: 'project.issues',
                    params: {
                        projectId: this.project.full_name
                    }
                },
                pulls: {
                    name: 'project.pulls',
                    params: {
                        projectId: this.project.full_name
                    }
                }
            };
        },

        isOK() { return isOK(this.project); },
        isLoading() { return isLoading(this.project); },
        project: getResource('projectId', { namespace: 'projects' }),
        pulls: getPage(
            () => 1,
            (cmp) => `pulls.${cmp.projectId}`,
            { namespace: 'issues',
                params: ({ projectId }) => ({ projectId, type: 'pull_request' })}
        ),
        issues: getPage(
            () => 1,
            (cmp) => `issues.${cmp.projectId}`,
            { namespace: 'issues',
                params: ({ projectId }) => ({ projectId, type: 'issue' })}
        ),
        last_pushed() { return moment(this.project.pushed_at).fromNow(); }
    }
}
</script>
