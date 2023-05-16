import express, { Express, Request, Response } from "express";
import ENV from "./core/config/configuration";
import { validateSchema } from "./core/config/validation";
import { AppDataSource } from "./core/database/connection";
import AppRoutes from "./modules/routes";
import * as bodyParser from "body-parser";
import errorMiddleware from "./core/middleware/error-middleware";
import { requestLoggerMiddleware } from "./core/interceptors/log.interceptor";

const app: Express = express();
const port = ENV.port || 3000;

validateSchema();

// Body Parser
app.use(
  bodyParser.urlencoded({
    limit: "250mb",
    extended: true,
  })
);
app.use(
  bodyParser.json({
    limit: "250mb",
  })
);
app.use(
  bodyParser.raw({
    type: "application/octet-stream",
    limit: "250mb",
  })
);
app.use(errorMiddleware);

AppDataSource.initialize()
  .then(() => {
    console.log("Database Data Source has been initialized!");
  })
  .catch((err) => {
    console.error("Error during Data Source initialization", err);
  });

app.use(requestLoggerMiddleware({ logger: console.log }));

app.get("/health", (req: Request, res: Response) => {
  res.send("Server is up and running successfully");
});
app.use("", AppRoutes);

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
