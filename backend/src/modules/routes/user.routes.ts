import { Router } from "express";
import { authMiddleware } from "../../core/middleware/auth.middleware";
import { UserController } from "../users/users.controller";

const userRouter = Router();
const userController = new UserController();

userRouter.get("", authMiddleware, userController.getUserInformation);

export default userRouter;
