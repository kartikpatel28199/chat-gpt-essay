import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.get("/", (req: Request, res: Response) => {
  res.send("Easy server with chat gpt");
});

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
