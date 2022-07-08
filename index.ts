import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import router from './src/router/users';
import { dbConfig } from './src/config';
import { Options, Sequelize } from 'sequelize';

dotenv.config();

const sequelize = new Sequelize(...dbConfig);

const startBase = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

startBase();

// id: Joi.number().integer().required(),
// login: Joi.string().min(6).max(18),
// password: Joi.string().min(6).max(32),
// age: Joi.number().min(7).max(110),

// id: number;
// login: string;
// password: string;
// age: number;
// isDeleted: boolean;

// const User = sequelize.define('testUsers', {
//   // login: { type: Sequelize.STRING, allowNull: false },
//   // password: { type: Sequelize.STRIGN, allowNull: false },
//   // age: { type: Sequelize.INTEGER, allowNull: false},
//   // isDeleted: {type: Sequelize.BOOLEAN, allowNull: false, defaultValue: false}
//   name: {type: Sequelize.STRING}
// });

// User.create({
//   name: 'romka'
// })

const app: Express = express();
const port = process.env.PORT;

app.use(express.json());
app.use('/users', router);

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});
