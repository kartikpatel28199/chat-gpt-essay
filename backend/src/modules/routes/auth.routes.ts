import passport from "passport";
import { AuthController } from "../auth/auth.controller";
import { Router } from "express";

const authRouter = Router();
const authController = new AuthController();

authRouter.post("/register", authController.registerUser);
authRouter.post("/login", authController.loginUser);
authRouter.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);
authRouter.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  authController.googleLoginCallback
);

export default authRouter;
