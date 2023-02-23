<template>
    <div>
        <div>
            <h2>View User</h2>
            <input type="text" v-model="username" />
            <input type="button" value="View" @click="viewUser">
        </div>
        <div>
            <h2>View Project</h2>
            <input type="text" v-model="project" />
            <input type="button" value="View" @click="viewProject">
        </div>
    </div>
</template>

<script>
export default {

    data() {
        return {
            username: 'JorgenEvens',
            project: 'JorgenEvens/rest-store'
        };
    },

    methods: {
        viewUser() {
            this.$router.push({
                name: 'user',
                params: { userId: this.username },
            });
        },
        viewProject() {
            this.$router.push({
                name: 'project',
                params: { projectId: this.project },
            });
        }
    }


};
</script>
