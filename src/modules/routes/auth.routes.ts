import { AuthController } from "../auth/auth.controller";
import { Router } from "express";

const authRouter = Router();
const authController = new AuthController();

authRouter.post("/register", authController.registerUser);

export default authRouter;
