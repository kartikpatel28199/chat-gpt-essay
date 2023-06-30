import { FastifyInstance } from "fastify";
import { AuthController } from "../auth/auth.controller";

const authController = new AuthController();

export default async function authRouter(fastify: FastifyInstance) {
  fastify.post(
    "/register",
    {
      schema: {
        summary: "Register user",
        tags: ["Auth"],
        body: {
          type: "object",
          properties: {
            name: { type: "string" },
            email: { type: "string" },
            password: { type: "string" },
          },
        },
      },
    },
    authController.registerUser
  );

  fastify.post(
    "/login",
    {
      schema: {
        summary: "Login user",
        tags: ["Auth"],
        body: {
          type: "object",
          properties: {
            email: { type: "string" },
            password: { type: "string" },
          },
        },
      },
    },
    authController.loginUser
  );
}
