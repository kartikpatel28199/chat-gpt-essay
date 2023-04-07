import { DataSource } from "typeorm";
import ENV from "../config/configuration";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: ENV.database.host,
  port: ENV.database.port,
  username: ENV.database.username,
  password: ENV.database.password,
  database: ENV.database.schema,
  entities: ["dist/**/*.entity.js"],
  synchronize: false,
  logging: process.env.NODE_ENV === "PRODUCTION" ? false : true,
});
