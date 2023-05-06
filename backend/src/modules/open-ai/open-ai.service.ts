import { Configuration, OpenAIApi } from "openai";
import ENV from "../../core/config/configuration";
import HttpException from "../../core/validations/http-exception";

export class OpenAIService {
  private readonly openAI: OpenAIApi;

  constructor() {
    const configuration = new Configuration({
      apiKey: ENV.openAIKey,
    });
    this.openAI = new OpenAIApi(configuration);
  }

  async testOpenAI(): Promise<{ error?: HttpException; data?: any }> {
    try {
      const completion = await this.openAI.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [{ role: "assistant", content: "What is chatgpt?" }],
      });

      return {
        data: completion.data.choices[0].message,
      };
    } catch (error) {
      console.log("error", error);
      return {
        error: new HttpException(500, "Something went wrong"),
      };
    }
  }
}
