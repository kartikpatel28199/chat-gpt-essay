import ENV from "../../core/config/configuration";
import { Request, Response } from "express";

import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: ENV.openAIKey,
});
const openai = new OpenAIApi(configuration);

export const testOpenAI = async (req: Request, res: Response) => {
  try {
    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [{ role: "assistant", content: "What is chatgpt?" }],
    });

    console.log(completion.data.id);
    console.log(completion.data.choices);

    res.send({
      message: "Test successful",
      data: completion.data.choices[0].message,
    });
  } catch (error) {
    console.log("error", error);
    res.send();
  }
};
