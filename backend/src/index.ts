import ENV from "./core/config/configuration";
import { validateSchema } from "./core/config/validation";
import errorMiddleware from "./core/middleware/error-middleware";
import Fastify from "fastify";
import CorsPlugin from "@fastify/cors";
import openAIRouter from "./modules/routes/open-ai.routes";
import userRouter from "./modules/routes/user.routes";
import authRouter from "./modules/routes/auth.routes";
import { prisma } from "./prisma";

const app = Fastify({
  logger: true,
});

const port: number = ENV.port || 3000;

validateSchema();

app.register(CorsPlugin, { origin: true });
app.register(authRouter, { prefix: "auth" });
app.register(openAIRouter, { prefix: "open-ai" });
app.register(userRouter, { prefix: "user" });
app.setErrorHandler(errorMiddleware);

app.get("/health", (req, reply) => {
  reply.send("Server is up and running successfully");
});

const start = async () => {
  await prisma.$connect();
  app.listen({ port: port }, async (err, address) => {
    if (err) {
      app.log.error(err);
      process.exit(1);
    }
    console.log(`Server started on port ${address}`);
  });
};

start();
