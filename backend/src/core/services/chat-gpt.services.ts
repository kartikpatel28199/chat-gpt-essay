import { Configuration, OpenAIApi } from "openai";
import ENV from "../../core/config/configuration";
import HttpException from "../validations/http-exception";

export class ChatGPT {
  private readonly openAI: OpenAIApi;
  private readonly gptTurboModel = "gpt-3.5-turbo";
  private readonly gptAssistantRole = "assistant";

  constructor() {
    const configuration = new Configuration({
      apiKey: ENV.openAIKey,
    });
    this.openAI = new OpenAIApi(configuration);
  }

  /**
   * Create chat completion
   * @param content
   * @returns
   */
  async createChatCompletion(
    content: string
  ): Promise<{ error?: HttpException; data?: string }> {
    try {
      const completion = await this.openAI.createChatCompletion({
        model: this.gptTurboModel,
        messages: [{ role: this.gptAssistantRole, content }],
      });

      return {
        data: completion.data.choices[0].message.content,
      };
    } catch (error) {
      console.log("error", error);
      return {
        error: new HttpException(500, `Something went wrong. ${error.message}`),
      };
    }
  }
}
