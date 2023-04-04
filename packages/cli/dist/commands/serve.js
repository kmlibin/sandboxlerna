"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.serveCommand = void 0;
const path_1 = __importDefault(require("path"));
const local_api_1 = require("local-api");
const commander_1 = require("commander");
exports.serveCommand = new commander_1.Command()
    .command("serve [filename]")
    .description("Open a file for editing")
    .option("-p, --port <number>", "port to run server on", "4005")
    //take in arguments - filename is optional, set the default below to notebook js
    //need to communicate the port and filename over to the local api
    .action((filename = "notebook.js", options) => {
    //how to figure out directory
    const dir = path_1.default.join(process.cwd(), path_1.default.dirname(filename));
    //second arg, how to find actual filename
    (0, local_api_1.serve)(parseInt(options.port), path_1.default.basename(filename), dir);
});
