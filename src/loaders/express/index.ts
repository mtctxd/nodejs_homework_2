import express, { Application } from 'express';
import initV1Routers from '../../v1/router';




const startExpress = async (app: Application) => {
  app.use(express.json());
  app.get('/', (_req, res) => {
    res.send('Server is working');
  });

  await initV1Routers(app);
  
  return app;
};

export default startExpress;
