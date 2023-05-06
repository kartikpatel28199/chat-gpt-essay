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
}
