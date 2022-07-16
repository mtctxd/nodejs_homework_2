import express, { Application } from 'express';
import appConfig from '../config';
import { GroupModel } from '../v1/models/gropuModel';
import { UserGroupModel } from '../v1/models/userGroupModel';
import { UserModel } from '../v1/models/userModel';
import groupRouter from '../v1/routers/groupRouter';
import userRouter from '../v1/routers/userRouter';

const initExpress = (app: Application) => {
  app.use(express.json());
  app.use('/v1/user', userRouter);
  app.use('/v1/group', groupRouter);

  app.get('/v1/drop', async (req, res, next) => {
    try {
      await UserModel.drop();
      console.log('UserModel table droped');
      await GroupModel.drop();
      console.log('GroupModel table droped');
      await UserGroupModel.drop();
      console.log('UserGroup table droped');

      res.send('droped');
    } catch (error) {
      res.send(error);
    }
  });

  app.listen(appConfig.express.port, () => {
    console.log(`Server is started on port ${appConfig.express.port}`);
  });
};

export default initExpress;
