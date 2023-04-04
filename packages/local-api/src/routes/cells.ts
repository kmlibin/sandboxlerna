import express from "express";
import fs from "fs/promises";
import path from "path";

interface Cell {
  id: string;
  content: string;
  type: "text" | "code";
}

export const createCellsRouter = (filename: string, dir: string) => {
  const router = express.Router();
  router.use(express.json())
  const fullPath = path.join(dir, filename);
  router.get("/cells", async (request, response) => {
    //read file
    try {
      const result = await fs.readFile(fullPath, { encoding: "utf-8" });
      response.send(JSON.parse(result));
    } catch (err: any) {
      if (err.code === "ENOENT") {
        await fs.writeFile(fullPath, '[]', 'utf-8');
        response.send([]);
      } else {
        throw err;
      }
    }
  });

  router.post("/cells", async (request, response) => {
    //take list of cells from request obj
    //turn them into a format that can be safely written into that file
    const { cells }: { cells: Cell[] } = request.body;

    //write cells into file
    await fs.writeFile(fullPath, JSON.stringify(cells), "utf-8");
    response.send({ status: "ok" });
  });
  return router;
};
