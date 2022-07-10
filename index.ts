import express from 'express';
import { appConfig} from './src/config';
import initLoaders from './src/loaders';


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
