import express from "express";

export const serve = (port: number, filename: string, dir: string) => {
  //initial setup for express server
  const app = express();
  //wrapping express in our own promise, we will either resolve or reject.
  return new Promise<void>((resolve, reject) => {
    app.listen(port, resolve).on("error", reject);
  });
};
