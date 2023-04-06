import dotenv from "dotenv";
dotenv.config();

export default {
  port: process.env.PORT,
  database: {
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT as string),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    schema: process.env.DB_NAME,
  },
  openAIKey: process.env.OPENAI_API_KEY as string,
};
