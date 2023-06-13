import { FastifyReply } from "fastify";
import { validateDto } from "../../core/validations/dto-validation";
import { AskQuestionDto } from "./dto/ask-question.dto";
import { OpenAIService } from "./open-ai.service";
import { Request } from "../../core/types/request.types";

export class OpenAIController {
  private readonly openAIService = new OpenAIService();

  constructor() {
    this.openAIService = new OpenAIService();
  }

  /**
   * Test OpenAI
   * @param req
   * @param reply
   * @returns
   */
  testOpenAI = async (req: Request, reply: FastifyReply) => {
    const result = await this.openAIService.testOpenAI();
    if (result.error) {
      reply.code(result.error.status).send({ error: result.error.message });
      return;
    }

    reply.code(201).send({ message: "Test successful", data: result.data });
  };

  /**
   * Ask question
   * @param req
   * @param reply
   * @returns
   */
  askQuestion = async (req: Request, reply: FastifyReply) => {
    req.body;
    const questionDto = new AskQuestionDto({ ...(req.body as any) });

    const error = await validateDto(questionDto);
    if (error) {
      reply.code(400).send({ error });
      return;
    }

    const result = await this.openAIService.askQuestion(questionDto);
    if (result.error) {
      reply.code(result.error.status).send({ error: result.error.message });
      return;
    }

    reply
      .code(200)
      .send({ message: "Question asked successfully", data: result.data });
  };
}
