import Api from './generic';

export
class GitHub extends Api {

    constructor(options = {}) {
        super({
            authorization: {
                tokenType: 'token',
                token: process.env.VUE_APP_GITHUB_TOKEN
            },
            ...options,
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

}

export const github = new GitHub();
export default github;
