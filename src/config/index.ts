import dotenv from 'dotenv';
import { Options } from 'sequelize/types';

dotenv.config();

export const dbConfig = {
  host: 'localhost',
  database: 'node_mentoring_user',
  dialect: 'postgres',
  username: 'postgres',
  password: process.env.USER_DB_PASSWORD,
  pool: {
    max: 5,
    min: 0,
    idle: 10000,
  }
}

