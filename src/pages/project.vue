<template>
    <div>
        <h1>Projects</h1>
        <div v-if="isOK">
            <h2>
                <router-link :to="ownerLink">{{ project.owner.login }}</router-link>
                <span> / {{ project.name }}</span>
            </h2>
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
import { getResource } from '@/store/helpers';

export default {
    computed: {
        projectId() { return this.$route.params.projectId },
        ownerLink() {
            return {
                name: 'user',
                params: {
                    userId: this.project.owner.login
                }
            }
        },

        isOK() { return isOK(this.project); },
        isLoading() { return isLoading(this.project); },
        project: getResource('projectId', { namespace: 'projects' }),
        last_pushed() { return moment(this.project.pushed_at).fromNow(); }
    }
}
</script>
