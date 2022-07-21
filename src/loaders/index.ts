import { Application } from 'express';
import { appLogger } from '../feature/logger';
import { LoggingTypes } from '../v1/types';
import { initDB } from './appDB';
import initExpress from './express';

const initServer = async (app: Application) => {
  try {
    await initDB();
    appLogger.log(LoggingTypes.Info, 'Database initialised!');

    initExpress(app);
    appLogger.log(LoggingTypes.Info, 'Express initialised!');
  } catch (error) {
    appLogger.error(LoggingTypes.Error, {
      type: 'init_server_error',
      error_data: JSON.stringify(error)
    });
  }
};

export default initServer;
