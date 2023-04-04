import path from "path";
import { serve } from "local-api";
import { Command } from "commander";

export const serveCommand = new Command()
  .command("serve [filename]")
  .description("Open a file for editing")
  .option("-p, --port <number>", "port to run server on", "4005")
  //take in arguments - filename is optional, set the default below to notebook js
  //need to communicate the port and filename over to the local api
  .action(async (filename = "notebook.js", options: { port: string }) => {
    try {
      //how to figure out directory
      const dir = path.join(process.cwd(), path.dirname(filename));

      //second arg, how to find actual filename
      await serve(parseInt(options.port), path.basename(filename), dir);
      console.log(
        `Opened ${filename}. Navigate to http://localhost:${options.port} to edit the file`
      );
    } catch (err: any) {
      if (err.code === "EADDRINUSE") {
        console.error("Port is already in use");
      } else {
        console.log("This is the problem:", err.message);
      }
      process.exit(1);
    }
  });
