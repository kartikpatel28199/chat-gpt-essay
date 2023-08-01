import { FastifyInstance } from "fastify";
import { OpenAIController } from "../open-ai/open-ai.controller";

const openAIController = new OpenAIController();

export default async function openAIRouter(fastify: FastifyInstance) {
  fastify.get(
    "/test",
    {
      schema: {
        summary: "Test open AI",
        tags: ["Open AI"],
      },
    },
    openAIController.testOpenAI
  );

  fastify.post(
    "/ask",
    {
      schema: {
        summary: "Ask to open AI",
        tags: ["Open AI"],
        body: {
          type: "object",
          properties: {
            question: { type: "string" },
          },
        },
      },
    },
    openAIController.askQuestion
  );

  fastify.get(
    "/ask-ws",
    {
      websocket: true,
    },
    openAIController.askQuestionFromWebSocket
  );
}
