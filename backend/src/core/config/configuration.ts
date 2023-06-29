import dotenv from "dotenv";
dotenv.config();

export default {
  port: process.env.PORT as unknown as number,
  nodeEnv: process.env.NODE_ENV,
  databaseUrl: process.env.DATABASE_URL,
  openAIKey: process.env.OPENAI_API_KEY as string,
  jwtSecretKey: process.env.JWT_SECRET_KEY,
  jwtExpiresIn: Number(process.env.JWT_EXPIRES_IN_DAYS) * 24 * 60 * 60,
};
