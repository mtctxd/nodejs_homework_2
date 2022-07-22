import express from 'express';
import { appLogger } from './feature/logger';
import initServer from './loaders';
import { LoggingTypes } from './v1/types';


const init = async () => {
  const app = express();
  await initServer(app);
};

init();

process.on('unhandledRejection', (error, promis) => {
  appLogger.error(LoggingTypes.Error, {
    type: 'uncaughtException',
    error_data: JSON.stringify({
      error,
      promis,
    }),
  });
});

process.on('uncaughtException', (error) => {
  appLogger.error(LoggingTypes.Error, {
    type: 'uncaughtException',
    error_data: JSON.stringify(error),
  });
  process.exit(1);
});
