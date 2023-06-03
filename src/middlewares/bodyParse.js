export default (req, res) => {
    let body = '';

    req.on('data', (chunk) => {
        body += chunk;
        if (body) {
            req.body = JSON.parse(body);
        }
    })

    req.on('end', () => {
        if(body) {
            req.body = JSON.parse(body);
        }
    })
}