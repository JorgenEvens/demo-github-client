<template>
    <div>
        <strong>Authorization Code: </strong>
        <span>{{ $route.query.code }}</span>
    </div>
</template>
<script>
export default {
    created() {
        const { code, state } = this.$route.query;

        if (!code)
            return;

        this.$store.dispatch('auth/exchangeCode', { code, state });
    },
    computed: {
        token() {
            return this.$store.state.auth.token;
        }
    },
    watch: {
        token(token) {
            if (!token)
                return;

            const { target } = this.$store.state.auth;

            if (target)
                return this.$router.push(target);

            this.$router.push({
                name: 'dashboard',
            });
        }
    }
}

</script>
