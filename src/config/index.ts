import dotenv from 'dotenv';
import { Dialect } from 'sequelize/types';

dotenv.config();

export const dbConfig = {
  host: 'localhost',
  database: 'node_mentoring_user',
  dialect: 'postgres' as Dialect | undefined,
  username: 'postgres',
  password: process.env.USER_DB_PASSWORD,
  pool: {
    max: 5,
    min: 0,
    idle: 10000,
  }
}

export const appConfig = {
  port: process.env.PORT || 3000,
}

