import ENV from "./core/config/configuration";
import { validateSchema } from "./core/config/validation";
import { AppDataSource } from "./core/database/connection";
import errorMiddleware from "./core/middleware/error-middleware";
import Fastify from "fastify";
import CorsPlugin from "@fastify/cors";
import openAIRouter from "./modules/routes/open-ai.routes";
import userRouter from "./modules/routes/user.routes";
import authRouter from "./modules/routes/auth.routes";

const app = Fastify({
  logger: true,
});

const port: number = ENV.port || 3000;

validateSchema();

app.register(CorsPlugin, { origin: true });

AppDataSource.initialize()
  .then(() => {
    console.log("Database Data Source has been initialized!");
  })
  .catch((err) => {
    console.error("Error during Data Source initialization", err);
  });

app.register(authRouter, { prefix: "auth" });
app.register(openAIRouter, { prefix: "open-ai" });
app.register(userRouter, { prefix: "user" });
app.setErrorHandler(errorMiddleware);

app.get("/health", (req, reply) => {
  reply.send("Server is up and running successfully");
});

app.listen({ port: port }, (err, address) => {
  if (err) throw err;
  console.log(`Server started on port ${address}`);
});
