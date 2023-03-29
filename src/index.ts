// sync node errors
process.on("uncaughtException", (e) => {
    console.error(e);
});

// async node errors
process.on("unhandledRejection", (e) => {
    console.error(e);
});

//load variables from .env file, IMPORTANT: import this first before creating the server
import * as dotenv from "dotenv";
dotenv.config();
import config from "./config";
// dynamic options for various environments

//EXPRESS
import app from "./server";

app.listen(config.port || 3001, () => {
    console.log(`server on http://localhost:${config.port}`);
});
// equivalent to without using a framework like express
/* const http = require('http');
const server = http.createServer((req, res) => {
    console.log(req)
    console.log(res)
    if (req.method === 'GET' && req.url === '/') {
        res.statusCode = 200
        res.end()
    }
})
server.listen(3001, () => {
    console.log('server on http://localhost:3001')
}) */
