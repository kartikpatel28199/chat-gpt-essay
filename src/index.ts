import express, { Express, Request, Response } from "express";
import ENV from "./core/config/configuration";
import { AppDataSource } from "./core/database/connection";
import AppRoutes from "./module/routes";

const app: Express = express();
const port = ENV.port || 3000;

app.get("/", (req: Request, res: Response) => {
  res.send("Easy server with chat gpt");
});

AppDataSource.initialize()
  .then(() => {
    console.log("Database Data Source has been initialized!");
  })
  .catch((err) => {
    console.error("Error during Data Source initialization", err);
  });

app.use("", AppRoutes);

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
