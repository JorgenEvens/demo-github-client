import loading from '@jorgenevens/rest-store/lib/resource/loading';
import { add } from '@jorgenevens/rest-store';
import { apply } from '@/store/helpers';

export default {
    loadingUser: (state, { id }) => apply(loading, state, id),
    addUser: (state, { user }) => apply(add, state, user.login, user)
};
