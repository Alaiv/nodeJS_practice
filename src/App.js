import http from 'http';
import EventEmitter from 'events';

class App {
    constructor() {
        this.emitter = new EventEmitter();
        this.server = this._createServer();
        this.middlewares = [];
    }

    listen(port, cb) {
        this.server.listen(port, cb);
    }

    use(middleware) {
        this.middlewares.push(middleware);
    }

    addRouter(router) {
        Object.keys(router.endpoints).forEach(path => {
            const endpoint = router.endpoints[path];
            Object.keys(endpoint).forEach(method => {
                this.emitter.on(this._getRouteMask(path, method), (req, res) => {
                    const handler = endpoint[method];
                    handler(req, res);
                });
            })
        })
    }

    _createServer() {
        return http.createServer((req, res) => {
            this.middlewares.forEach(mw => mw(req, res));

            req.on('end', () => {
                const emitted = this.emitter.emit(this._getRouteMask(req.pathname, req.method), req, res);
                if (!emitted) {
                    res.end('No such url')
                }
            })
        })
    }

    _getRouteMask(path, method) {
        return `[${path}]:[${method}]`;
    }

}

export default App;