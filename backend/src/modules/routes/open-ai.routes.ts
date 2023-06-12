import { FastifyInstance } from "fastify";
import { OpenAIController } from "../open-ai/open-ai.controller";

const openAIController = new OpenAIController();

export default async function openAIRouter(fastify: FastifyInstance) {
  fastify.get("/test", openAIController.testOpenAI);
  fastify.post("/ask", openAIController.askQuestion);
}
