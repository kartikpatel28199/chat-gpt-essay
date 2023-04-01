import express, { Express, Request, Response } from "express";
import ENV from "./core/config/configuration";

const app: Express = express();
const port = ENV.port || 3000;

app.get("/", (req: Request, res: Response) => {
  res.send("Easy server with chat gpt");
});

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
