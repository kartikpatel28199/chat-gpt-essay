import { validateDto } from "../../core/validations/dto-validation";
import { AskQuestionDto } from "./dto/ask-question.dto";
import { OpenAIService } from "./open-ai.service";
import { Request, Response } from "express";

export class OpenAIController {
  private readonly openAIService = new OpenAIService();

  constructor() {
    this.openAIService = new OpenAIService();
  }

  /**
   * Test OpenAI
   * @param req
   * @param res
   * @returns
   */
  testOpenAI = async (req: Request, res: Response) => {
    const result = await this.openAIService.testOpenAI();
    if (result.error) {
      res.status(result.error.status).json({ message: result.error.message });
      return;
    }

    res.status(201).json({ message: "Test successful", data: result.data });
  };

  /**
   * Ask question
   * @param req
   * @param res
   * @returns
   */
  askQuestion = async (req: Request, res: Response) => {
    const questionDto = new AskQuestionDto({ ...req.body });

    const error = await validateDto(questionDto);
    if (error) {
      res.status(400).json({ error });
      return;
    }

    const result = await this.openAIService.askQuestion(questionDto);
    if (result.error) {
      res.status(result.error.status).json({ message: result.error.message });
      return;
    }

    res
      .status(200)
      .json({ message: "Question asked successfully", data: result.data });
  };
}
