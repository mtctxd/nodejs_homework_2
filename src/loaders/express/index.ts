import * as express from 'express';
import groupRouter from '../../router/v1/groupRouter/groupRouter';
import userRouter from '../../router/v1/userRouter/userRouter';

const startExpress = async (app: express.Application) => {
  app.use(express.json());
  app.use('/v1/user', userRouter);
  app.use('/v1/group', groupRouter)
  app.get('/', (_req, res) => {
    res.send('Server is working');
  });

  return app;
};

export default startExpress;
