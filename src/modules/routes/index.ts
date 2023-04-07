import express from "express";
import authRouter from "./auth.routes";
import openAi from "./open-ai.routes";

const router = express.Router();

router.use("/open-ai", openAi);
router.use("/auth", authRouter);

export default router;
