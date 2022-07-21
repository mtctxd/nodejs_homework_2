import dotenv from "dotenv";
import { Dialect } from "sequelize/types";
dotenv.config();

const expressConfig = {
  port: process.env.PORT || 3000,
};

const dbConfig = {
  username: "postgres",
  password: process.env.DB_PASSWORD,
  database: "node_mentoring_user",
  host: "localhost",
  dialect: "postgres" as Dialect,
};

const appConfig = {
  express: expressConfig,
  db: dbConfig,
};

export default appConfig;
