import express from "express";
import openAi from "./open-ai.routes";

const router = express.Router();

router.use("/open-ai", openAi);

export default router;
