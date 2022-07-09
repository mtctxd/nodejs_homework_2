import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import router from './src/router/users';
import { dbConfig } from './src/config';
import { Options, Sequelize, DataTypes, Dialect } from 'sequelize';

dotenv.config();

const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.username,
  dbConfig.password,
  {
    host: dbConfig.host,
    dialect: dbConfig.dialect as Dialect | undefined,
    pool: dbConfig.pool,
  }
);

const startBase = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};
startBase();

const User = sequelize.define('User', {
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  login: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  is_deleted: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
});

const app: Express = express();
const port = process.env.PORT;

app.use(express.json());
app.use('/users', router);

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});
