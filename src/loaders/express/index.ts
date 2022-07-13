import express, { Application } from 'express';
import { groupService, userService } from '../../v1/controllers/Controller';

import groupRouter from '../../v1/router/groupRouter';
import userRouter from '../../v1/router/userRouter';
import { Group, User } from '../../v1/types';
import { v4 as uuid } from 'uuid';

const mockUsers: Partial<User>[] = [
  {
    age: 32,
    login: 'asdasd12323ss',
    password: '123#saxcaAD',
  },
  {
    age: 12,
    login: 'arrrss',
    password: '123#sA2axcaAD',
  },
  {
    age: 42,
    login: 'ASDasd12323ss',
    password: '323#saxcaAD',
  },
  {
    age: 66,
    login: 'aZVNJUasd12ss',
    password: 'ty3#saxcaAD',
  },
  {
    age: 77,
    login: 'NGsd12323ss',
    password: 'yyuu3#saxcaAD',
  },
];

const mockGroups: Partial<Group>[] = [
  { name: 'asdasdadsAds', group_id: uuid(), premissions: ['DELETE', 'READ'] },
  { name: '123asdadsAds', group_id: uuid(), premissions: ['DELETE'] },
  { name: '765dasdadsAds', group_id: uuid(), premissions: ['DELETE', 'READ'] },
  {
    name: 'SDDSdadsAds',
    group_id: uuid(),
    premissions: ['UPLOAD_FILES', 'READ'],
  },
  { name: 'HRTasdadsAds', group_id: uuid(), premissions: ['SHARE', 'READ'] },
];

const startExpress = async (app: Application) => {
  app.use(express.json());
  app.use('/v1/user', userRouter);
  app.use('/v1/group', groupRouter);
  app.get('/', (_req, res) => {
    res.send('Server is working');
  });

  app.get('/test', async (req, res) => {
    try {
      const data = await {
        data: {
          users: await userService.getAll(req),
          groups: await groupService.getAll(req),
        },
      };

      res.status(200).send(data);
    } catch (e) {
      console.error(e);
      res.sendStatus(404);
    }
  });

  app.post('/test', async (req, res) => {
    try {
      for (let user of mockUsers) {
        await userService.create(user);
      }

      for (let group of mockGroups) {
        await groupService.create(group);
      }

      res.sendStatus(200);
    } catch (e) {
      console.error(e);
      res.sendStatus(404);
    }
  });

  return app;
};

export default startExpress;
