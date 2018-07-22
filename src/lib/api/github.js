import Api from './generic';

export
class GitHub extends Api {

    constructor(options = {}) {
        super({
            ...options,
            headers: {
                'content-type': 'application/json',
                ...options.headers
            },
            baseUrl: 'https://api.github.com'
        });
    }

    _transform(resp) {
        return resp.json();
    }

    getUser(username) {
        return this.get(`/users/${username}`);
    }

    getUserProjects(username, query = {}) {
        return this.get(`/users/${username}/repos`, query);
    }

    getProject(project) {
        return this.get(`/repos/${project}`);
    }

    exchangeCode(state, code) {
        const reqOptions = {
            headers: { accept: 'application/json' }
        };

        return this.post(`${window.location.origin}/_api/gh/access_token`, {
            state,
            code,
            client_id: process.env.VUE_APP_CLIENT_ID,
            client_secret: process.env.VUE_APP_CLIENT_SECRET,
        }, reqOptions);
    }

}

export const github = new GitHub();
export default github;
