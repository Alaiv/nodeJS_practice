class Router {
    constructor() {
        this.endpoints = {};
    }

    request(method = 'GET', path, handler) {
        if (!this.endpoints[path]) {
            this.endpoints[path] = {};
        }

        const endpoint = this.endpoints[path];

        if (endpoint[method]) {
            throw new Error('Уже существует');
        }

        endpoint[method] = handler;
    }

    get(path, cb) {
        this.request('GET', path, cb);
    }

    post(path, cb) {
        this.request('POST', path, cb);
    }

    put(path, cb) {
        this.request('PUT', path, cb);
    }

    delete(path, cb) {
        this.request('DELETE', path, cb);
    }
}

export default Router;