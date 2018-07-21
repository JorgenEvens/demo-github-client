import { attach } from '@jorgenevens/rest-store';
import { apply } from '@/store/helpers';

import actions from './actions';
import mutations from './mutations';

export default {
    namespaced: true,
    state: apply(attach),

    actions,
    mutations
}
