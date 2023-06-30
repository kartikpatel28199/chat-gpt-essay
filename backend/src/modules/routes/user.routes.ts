import { FastifyInstance } from "fastify";
import { authMiddleware } from "../../core/middleware/auth.middleware";
import { UserController } from "../users/users.controller";

const userController = new UserController();

export default async function userRouter(fastify: FastifyInstance) {
  fastify.get(
    "/",
    {
      preHandler: [authMiddleware],
      schema: {
        summary: "Get user information",
        tags: ["Users"],
        security: [
          {
            bearerAuth: [],
          },
        ],
      },
    },
    userController.getUserInformation
  );
}
