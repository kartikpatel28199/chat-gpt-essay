import axios from "axios";
import { API_URL } from "../constant";

const askQuestion = async (data: any) => {
  try {
    const response = await axios.post(`${API_URL}/open-ai/ask`, { ...data });
    return response;
  } catch (error) {
    throw error;
  }
};

const openAIAPI = {
  askQuestion,
};
export default openAIAPI;
