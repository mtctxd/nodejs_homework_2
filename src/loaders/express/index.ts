import * as express from 'express';
import userRouter from '../../router/v1/userRouter/userRouter';

const startExpress = async (app: express.Application) => {
  app.use(express.json());
  app.use('/v1/user', userRouter);
  app.get('/', (_req, res) => {
    res.send('Server is working');
  });

  return app;
};

export default startExpress;
