import ENV from "./core/config/configuration";
import { validateSchema } from "./core/config/validation";
import errorMiddleware from "./core/middleware/error-middleware";
import Fastify from "fastify";
import CorsPlugin from "@fastify/cors";
import openAIRouter from "./modules/routes/open-ai.routes";
import userRouter from "./modules/routes/user.routes";
import authRouter from "./modules/routes/auth.routes";
import { prisma } from "./prisma";
import editorContentRouter from "./modules/routes/editor-content.routes";

const app = Fastify({
  logger: true,
});

const port: number = ENV.port || 3000;

validateSchema();

app.register(import("@fastify/swagger"), {
  mode: "dynamic",
  openapi: {
    openapi: "3.0.3",
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    info: {
      title: "Assignment Ace API",
      description: "Assignment Ace API Swagger",
      version: "1.0",
    },
  },
});

if (ENV.nodeEnv !== "PRODUCTION") {
  app.register(import("@fastify/swagger-ui"), {
    routePrefix: "/doc",
    uiConfig: {
      docExpansion: "list",
      deepLinking: false,
    },
    uiHooks: {
      onRequest: function (request, reply, next) {
        next();
      },
      preHandler: function (request, reply, next) {
        next();
      },
    },
    staticCSP: true,
    transformStaticCSP: (header) => header,
    transformSpecification: (swaggerObject, request, reply) => {
      return swaggerObject;
    },
    transformSpecificationClone: true,
  });
}

app.register(CorsPlugin, { origin: true });
app.register(authRouter, { prefix: "auth" });
app.register(openAIRouter, { prefix: "open-ai" });
app.register(userRouter, { prefix: "user" });
app.register(editorContentRouter, { prefix: "editor-content" });
app.setErrorHandler(errorMiddleware);

app.get("/health", (req, reply) => {
  reply.send("Server is up and running successfully");
});

const start = async () => {
  await prisma.$connect();
  await app.listen({ port: port }, async (err, address) => {
    if (err) {
      app.log.error(err);
      process.exit(1);
    }
    console.log(`Server started on port ${address}`);
  });
};

start();
