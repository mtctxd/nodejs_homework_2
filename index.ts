import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
// import router from './src/router/users';
import { appConfig, dbConfig } from './src/config';
import { Options, Sequelize, DataTypes, Dialect, Model } from 'sequelize';
import initLoaders from './src/loaders';

// dotenv.config();

// const sequelize = new Sequelize(
//   dbConfig.database,
//   dbConfig.username,
//   dbConfig.password,
//   {
//     host: dbConfig.host,
//     dialect: dbConfig.dialect as Dialect | undefined,
//     pool: dbConfig.pool,
//   }
// );

// const startBase = async () => {
//   try {
//     await sequelize.authenticate();
//     console.log('Connection has been established successfully.');
//   } catch (error) {
//     console.error('Unable to connect to the database:', error);
//   }
// };

// const app: Express = express();
// const port = process.env.PORT;

// app.use(express.json());
// app.use('/users', router);

// app.listen(port, () => {
//   console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
// });

const startServer = async () => {
  const app = express();

  await initLoaders(app);

  app
    .listen(appConfig.port, () => {
      console.log('Server started seccesfuly on port ' + appConfig.port);
    })
    .on('error', console.error);
};

startServer();
