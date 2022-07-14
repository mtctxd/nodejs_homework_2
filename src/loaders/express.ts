import express, { Application } from 'express';
import appConfig from '../config';
import userRouter from '../v1/routers/userRouter';

const initExpress = (app: Application) => {
  app.use(express.json());
  app.use('/v1/user', userRouter);

  app.listen(appConfig.express.port, () => {
    console.log(`Server is started on port ${appConfig.express.port}`);
  });
};

export default initExpress;
