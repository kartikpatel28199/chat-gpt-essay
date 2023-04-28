import express, { Express, Request, Response } from "express";
import ENV from "./core/config/configuration";
import { validateSchema } from "./core/config/validation";
import { AppDataSource } from "./core/database/connection";
import AppRoutes from "./modules/routes";
import * as bodyParser from "body-parser";
import errorMiddleware from "./core/middleware/error-middleware";
import passport from "passport";
import session from "express-session";
import { initPassport } from "./modules/auth/strategy/init";

const app: Express = express();
const port = ENV.port || 3000;

app.get("/", (req: Request, res: Response) => {
  res.send("Easy server with chat gpt");
});

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
app.use(
  session({
    resave: false,
    saveUninitialized: true,
    secret: "SECRET",
  })
);
app.use(passport.initialize());
app.use(passport.session());
initPassport(passport);

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
