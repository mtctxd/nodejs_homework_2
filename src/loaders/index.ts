import { Application } from 'express';
import startExpress from './express';
import { startUserDB } from './userDb';

const initLoaders = async (app: Application) => {
  await startUserDB();
  console.log('userDB started seccesfuly');
  await startExpress(app);
  console.log('Express initialized');
};

export default initLoaders;
