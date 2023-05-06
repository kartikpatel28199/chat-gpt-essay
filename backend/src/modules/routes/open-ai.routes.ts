import { OpenAIController } from "../open-ai/open-ai.controller";
import { Router } from "express";

const openAIRouter = Router();
const openAIController = new OpenAIController();

openAIRouter.get("/test", openAIController.testOpenAI);

export default openAIRouter;
