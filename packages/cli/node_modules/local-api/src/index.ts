import express from "express";
import { createProxyMiddleware } from "http-proxy-middleware";
import path from "path";
import { createCellsRouter } from "./routes/cells";

//running locally on our machine, then we want a proxy
//running on a users machine, serve up files from the build directory in local-client

export const serve = (
  port: number,
  filename: string,
  dir: string,
  useProxy: boolean
) => {
  //initial setup for express server
  const app = express();

  if (useProxy) {
    app.use(
      createProxyMiddleware("/", {
        target: "http://127.0.0.1:3000/",
        ws: true,
        changeOrigin: true,
        logLevel: "silent",
        headers: {
          Connection: "keep-alive",
        },
      })
    );
  } else {
    //figures out the location of index.html. will be the absolute path, not relative
    const packagePath = require.resolve("local-client/build/index.html");
    //don't want the entire path, just everything up to the build folder
    app.use(express.static(path.dirname(packagePath)));
  }
  app.use(createCellsRouter(filename, dir));
  //wrapping express in our own promise, we will either resolve or reject.
  return new Promise<void>((resolve, reject) => {
    app.listen(port, "0.0.0.0", resolve).on("error", reject);
  });
};
