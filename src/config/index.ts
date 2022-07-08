import dotenv from 'dotenv';
import { Options } from 'sequelize/types';

dotenv.config();

export const dbConfig = [
  'user',
  'postgres',
  process.env.USER_DB_PASSWORD!.toString(),
  {
    host: 'localhost',
    dialect: 'postgres',
  },
] as Options[];

