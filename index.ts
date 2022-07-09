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

const User = sequelize.define(
  'User',
  {
    user_id: {
      type: DataTypes.INTEGER,
    },
    login: {
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.STRING,
    },
    is_deleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    modelName: 'User',
  }
);

const manageBase = async () => {
  try {
    const result = await sequelize.sync({ force: true });
    // console.log('result of syncing:_______ ', result);
  } catch (e) {
    console.error('User sync error:________ ', e);
  }
};

const createUser = async (user_id: number) => {
  try {
    const result = await User.create({ user_id });

    console.log('result of creating____', result);
  } catch (error) {
    console.error('Error of creating_______', error);
  }
};

const initBase = async () => {
  try {
    await manageBase();
    await createUser(Number(Math.random().toFixed()));
    console.log('initBase is done______________');
  } catch (error) {
    console.error(error);
  } finally {
    await User.findAll();
  }
};

initBase();

const app: Express = express();
const port = process.env.PORT;

app.use(express.json());
app.use('/users', router);

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});
