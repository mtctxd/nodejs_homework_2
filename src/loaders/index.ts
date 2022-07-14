import { Application } from 'express';
import { initDB } from './appDB';
import initExpress from './express';

const initServer = async (app: Application) => {
  await initDB();
  console.log('Database initialised!');

  initExpress(app);
  console.log('Express initialised!');
};

export default initServer;
