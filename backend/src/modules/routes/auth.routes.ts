import { FastifyInstance } from "fastify";
import { AuthController } from "../auth/auth.controller";

const authController = new AuthController();

export default async function authRouter(fastify: FastifyInstance) {
  fastify.post("/register", authController.registerUser);
  fastify.post("/login", authController.loginUser);
}
