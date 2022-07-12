import express, { Application, NextFunction, Request, Response } from 'express';
import groupRouter from '../../v1/router/groupRouter';
import userRouter from '../../v1/router/userRouter';

const startExpress = async (app: Application) => {
  app.use(express.json());
  app.use('/v1/user', userRouter);
  app.use('/v1/group', groupRouter)
  app.get('/', (_req, res) => {
    res.send('Server is working');
  });

  return app;
};

export default startExpress;
