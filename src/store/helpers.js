import _get from 'lodash/get';
import _debounce from 'lodash/debounce';
import _mapValues from 'lodash/mapValues';
import { resource, shouldFetch } from '@jorgenevens/rest-store';

const resourceDefaults = {
    namespace: null,
    fetch: 'fetch'
};

export function getResource(selector, options) {
    options = { ...resourceDefaults, ...options };

    const getId = typeof selector === 'function' ?
        selector : (cmp) => _get(cmp, selector);

    const { namespace } = options;
    let { fetch } = options;

    if (namespace && typeof fetch === 'string')
        fetch = `${namespace}/${fetch}`;

    return function() {
        const { state, dispatch } = this.$store;
        const id =  getId(this);

        if (shouldFetch(state[namespace], id))
            dispatch(fetch, { id });

        return resource(state[namespace], id);
    };
}

export
function throttleAll(methods) {
    return _mapValues(methods, method => {
        return _debounce(method, 500, { leading: true });
    });
}

export function apply(action, state, ...args) {
    const next = action(state, ...args);

    state = state || {};
    Object.assign(state, next);

    return state;
}
