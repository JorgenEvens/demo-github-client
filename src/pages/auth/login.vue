<template>
    <a :href="authorizationUri">
        Connect to GitHub
    </a>
</template>
<script>
import qs from 'qs';

export default {
    computed: {
        authorizationUri() {
            const { state } = this.$store.state.auth;

            return `https://github.com/login/oauth/authorize?` + qs.stringify({
                client_id: process.env.VUE_APP_CLIENT_ID,
                redirect_uri: 'http://localhost:8080/auth/callback',
                state
            });
        }
    }
}

</script>
