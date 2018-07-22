<template>
    <router-view />
</template>

<script>

export default {
    methods: {
        verifyLogin() {
            const { token } = this.$store.state.auth;

            if (token)
                return;

            this.$store.dispatch('auth/setRedirectUri', {
                location: ('' + window.location).replace(window.location.origin, '')
            });

            this.$router.push({
                name: 'login'
            });
        }
    },
    created() {
        this.verifyLogin();
    },
    watch: {
        $store() {
            this.verifyLogin();
        }
    }
}
</script>
