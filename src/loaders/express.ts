import express, { Application } from 'express';
import appConfig from '../config';
import groupRouter from '../v1/routers/groupRouter';
import userRouter from '../v1/routers/userRouter';

const initExpress = (app: Application) => {
  app.use(express.json());
  app.use('/v1/user', userRouter);
  app.use('/v1/group', groupRouter);

  app.listen(appConfig.express.port, () => {
    console.log(`Server is started on port ${appConfig.express.port}`);
  });
};

export default initExpress;
