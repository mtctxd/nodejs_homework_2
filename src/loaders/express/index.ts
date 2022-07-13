import express, { Application } from 'express';
import { groupService, userService } from '../../v1/controllers/Controller';

import groupRouter from '../../v1/router/groupRouter';
import userRouter from '../../v1/router/userRouter';
import { Group, User } from '../../v1/types';
import { v4 as uuid } from 'uuid';

const mockUsers: Partial<User>[] = [
  {
    age: 32,
    login: 'Zhora332',
    password: '123#saxcaAD',
  },
  {
    age: 12,
    login: 'Andry123',
    password: '123#sA2axcaAD',
  },
  {
    age: 42,
    login: 'Maryna3324',
    password: '323#saxcaAD',
  },
  {
    age: 66,
    login: 'Myroslaw',
    password: 'ty3#saxcaAD',
  },
  {
    age: 77,
    login: 'Tania_2332',
    password: 'yyuu3#saxcaAD',
  },
];

const mockGroups: Partial<Group>[] = [
  { name: 'users', group_id: uuid(), premissions: ['READ', 'SHARE', 'WRITE'] },
  {
    name: 'admins',
    group_id: uuid(),
    premissions: ['READ', 'WRITE', 'DELETE', 'SHARE', 'UPLOAD_FILES'],
  },
  { name: 'guests', group_id: uuid(), premissions: [] },
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
      const data = {
        users: await userService.getAll(req),
        groups: await groupService.getAll(req),
      };

      res.status(200).send({ data });
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
