
<template>
    <div>
        <pre>{{ JSON.stringify(this.user, null, 2) }}</pre>
        <strong v-if="loading">Loading</strong>
    </div>
</template>

<script>
import { getResource } from '@/store/helpers';
import { isLoading } from '@jorgenevens/rest-store';

export default {
    computed: {
        loading() {
            return isLoading(this.user);
        },
        user: getResource('$route.params.id', { namespace: 'users' })
    }
}
</script>
