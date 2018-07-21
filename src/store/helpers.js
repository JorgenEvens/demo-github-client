import _get from 'lodash/get';
import _debounce from 'lodash/debounce';
import _mapValues from 'lodash/mapValues';
import {
    resource,
    page as fetchPage,
    shouldFetch,
    shouldFetchPage
} from '@jorgenevens/rest-store';

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

const pageDefaults = {
    namespace: null,
    listName: 'all',
    fetch: 'fetchPage'
};

export function getPage(pageSelector, listName, options = {}) {
    options = { ...pageDefaults, ...options };

    const { namespace, params } = options;
    let { fetch } = options;

    const getPage = typeof pageSelector === 'function' ?
        pageSelector : (cmp) => _get(cmp, pageSelector);

    const getListName = typeof listName === 'function' ?
        listName : () => listName;

    const getParams = typeof params === 'function' ?
        params : () => params || {};

    if (namespace && typeof fetch === 'string')
        fetch = `${namespace}/${fetch}`;

    return function() {
        const { state, dispatch } = this.$store;
        const opts = getParams(this);
        const page =  getPage(this, opts) || 1;
        const listName = getListName(this, opts);

        if (page < 1)
            throw new Error('page must be greater than 0');

        if (shouldFetchPage(state[namespace], listName, page))
            dispatch(fetch, { listName, page, ...opts });

        return fetchPage(state[namespace], listName, page)
            .filter(v => !!v);
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
