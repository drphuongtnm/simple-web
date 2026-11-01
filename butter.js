const http = require("node:http");
const fs = require("node:fs/promises");

class Butter {
    constructor() {
        this.server = http.createServer();
        this.routes = {};

        this.server.on("request", (req, res) => {
            res.sendFile = async (path, mime) => {
                const fileHandler = await fs.open(path, 'r');
                const fileStream = fileHandler.createReadStream();
                res.setHeader("Content-Type", mime);
                fileStream.pipe(res);
            }

            res.status = (code) => {
                res.statusCode = code;
                return res;
            }

            // small json data, less than High Water Mark value
            res.json = (data) => {
                res.setHeader("Content-Type", "application/json");
                res.end(JSON.stringify(data));
            }

           const handler = this.routes[req.method.toLowerCase()]?.[req.url];
            if (handler) {
                handler(req, res);
            }else {
                res.status(404).json({ error: `Cannot ${req.method} ${req.url}` });
            }
        })
    }

    listen = (port, callback) => {
        this.server.listen(port, callback);
    }

    route = (method, path, cb) => {
        const methodLower = method.toLowerCase();
        if (!this.routes[methodLower]) {
            this.routes[methodLower] = {};
        }
        this.routes[methodLower][path] = cb;
    }
}

module.exports = Butter;