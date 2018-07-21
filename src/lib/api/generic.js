import fetch from 'unfetch';
import qs from 'qs';

const defaultOptions = {
    _fetch: fetch
};

export
function addQuery(url, query) {
    const [ ,
        path,
        originalQuery = '',
        fragment = ''
    ] = /^([^?]+)(\?[^#]+)?(#.*)?$/.exec(url);

    const parsedQuery = qs.parse(originalQuery.replace(/^\?/, ''));

    query = qs.stringify({
        ...parsedQuery,
        ...query
    });

    if (query)
        query = '?' + query;

    return [ path, query, fragment ].filter(v => !!v).join('');
}

export
function isAbsolute(url) {
    return /^https?:\/\//.test(url);
}

export default
class ApiClient {

    constructor(options = {}) {
        options = {
            ...defaultOptions,
            ...options
        };

        this._baseUrl = options.baseUrl.replace(/\/*$/, '/');
        this._fetch = options._fetch;
        this._options = options;
    }

    request(url, options = {}) {
        options = this._applyOptions(options);

        if (!isAbsolute(url))
            url = this._baseUrl + url.replace(/^\/+/, '');

        return this._fetch(url, options)
            .then(resp => this._validate(resp))
            .then(resp => this._transform(resp))
            .catch(err => this._error(err));
    }

    _applyOptions(options = {}) {
        let { method, headers } = this._options;

        const { body } = options;
        const {
            tokenType = 'Bearer',
            token
        } = options.authorization || this._options.authorization || {};

        const authorization = token && {
            Authorization: `${tokenType} ${token}`
        };

        return {
            method: options.method || method,
            headers: {
                ...headers,
                ...options.headers,
                ...authorization
            },
            body: body && JSON.stringify(body)
        };
    }

    _transform(resp) {
        return resp;
    }

    _validate(resp) {
        if (Math.floor(resp.status / 100) == 2)
            return resp;

        throw new Error(`Unexpected response code: ${resp.status} ${resp.statusText}`);
    }

    _error(err) {
        throw err;
    }

    get(url, query, options = {}) {
        url = addQuery(url, query);

        return this.request(url, {
            ...options,
            method: 'GET'
        });
    }

    post(url, body, options = {}) {
        return this.request(url, {
            ...options,
            method: 'POST',
            body
        });
    }

    put(url, body, options = {}) {
        return this.request(url, {
            ...options,
            method: 'PUT',
            body
        });
    }

    patch(url, body, options = {}) {
        return this.request(url, {
            ...options,
            method: 'PATCH',
            body
        });
    }

    del(url, options = {}) {
        return this.request(url, {
            ...options,
            method: 'DELETE'
        });
    }
}
