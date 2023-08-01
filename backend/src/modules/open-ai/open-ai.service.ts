import HttpException from "../../core/validations/http-exception";
import { AskQuestionDto } from "./dto/ask-question.dto";
import { ChatGPT } from "../../core/services/chat-gpt.services";

export class OpenAIService {
  private readonly chatGPT: ChatGPT;

  constructor() {
    this.chatGPT = new ChatGPT();
  }

  async testOpenAI(): Promise<{ error?: HttpException; data?: any }> {
    return this.chatGPT.createChatCompletion("What is chatgpt?");
  }

  /**
   * Ask question
   * @param askQuestionDto
   * @returns
   */
  async askQuestion(
    askQuestionDto: AskQuestionDto
  ): Promise<{ error?: HttpException; data?: string }> {
    return this.chatGPT.createChatCompletion(askQuestionDto.question);
  }

  /**
   * Ask question from web socket
   * @param question
   * @returns
   */
  async askQuestionFromWebSocket(question: string) {
    return this.chatGPT.createChatCompletionFromWebSocket(question);
  }
}
