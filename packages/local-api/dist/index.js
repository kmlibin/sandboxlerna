"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.serve = void 0;
const express_1 = __importDefault(require("express"));
const http_proxy_middleware_1 = require("http-proxy-middleware");
const path_1 = __importDefault(require("path"));
const cells_1 = require("./routes/cells");
//running locally on our machine, then we want a proxy
//running on a users machine, serve up files from the build directory in local-client
const serve = (port, filename, dir, useProxy) => {
    //initial setup for express server
    const app = (0, express_1.default)();
    if (useProxy) {
        app.use((0, http_proxy_middleware_1.createProxyMiddleware)("/", {
            target: "http://127.0.0.1:3000/",
            ws: true,
            changeOrigin: true,
            logLevel: "silent",
            headers: {
                Connection: "keep-alive",
            },
        }));
    }
    else {
        //figures out the location of index.html. will be the absolute path, not relative
        const packagePath = require.resolve("local-client/build/index.html");
        //don't want the entire path, just everything up to the build folder
        app.use(express_1.default.static(path_1.default.dirname(packagePath)));
    }
    app.use((0, cells_1.createCellsRouter)(filename, dir));
    //wrapping express in our own promise, we will either resolve or reject.
    return new Promise((resolve, reject) => {
        app.listen(port, "0.0.0.0", resolve).on("error", reject);
    });
};
exports.serve = serve;
