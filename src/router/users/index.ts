import { NextFunction, Request, Response, Router } from 'express';
import { send } from 'process';
import { User } from '../../../types';
import Joi from 'joi';
import Validator from '../../middlewares/Valiadtor';
import { processUserQueryString } from './features/processUserQueryString';
import { getMaxId } from '../../features/getMaxId';

const router = Router();

export const users: User[] = [
  { id: 1, age: 18, isDeleted: false, login: 'Romka', password: 'RRRpassword' },
  { id: 2, age: 18, isDeleted: false, login: 'romka', password: 'password' },
  { id: 3, age: 9, isDeleted: true, login: 'ilone', password: 'ilona1234' },
  {
    id: 4,
    age: 55,
    isDeleted: false,
    login: 'dua',
    password: 'paDKA',
  },
  { id: 5, age: 99, isDeleted: false, login: 'saa', password: 's23' },
];

const userValidator = new Validator<User>({
  create: Joi.object().keys({
    login: Joi.string().min(6).max(18).required(),
    password: Joi.string().min(6).max(32).required(),
    age: Joi.number().min(7).max(110).required(),
  }),
  update: Joi.object().keys({
    id: Joi.number().integer().required(),
    login: Joi.string().min(6).max(18),
    password: Joi.string().min(6).max(32),
    age: Joi.number().min(7).max(110),
  }),
});

router.get('/', (req: Request, res: Response, next) => {
  const login = req.query.login as string;
  const limit = req.query.limit as string;
  res.send(processUserQueryString.call(users, login, limit));
});

router.get('/:id', (req: Request, res: Response, next) => {
  const { id } = req.params;
  let result = users.find((user) => user.id === +id);

  if (!result) {
    res.status(404).send({ message: `There no user with id: ${id}` });
  } else {
    res.status(200).send(result);
  }
});

router.post(
  '/',
  userValidator.validate('create'),
  (req: Request, res: Response) => {
    const { password, login, age } = req.body;

    const newUser: User = {
      id: getMaxId(users),
      password,
      isDeleted: false,
      login,
      age,
    };

    res.status(201).send(newUser);
  }
);

router.put(
  '/',
  userValidator.validate('update'),
  (req: Request, res: Response) => {
    const { id } = req.body;
    let user = users.find((user) => user.id === +id);

    if (user) {
      const updatedUser = {
        ...user,
        ...req.body,
      };
      res.status(204).send(updatedUser);
    } else {
      res.status(404).send({ message: `There no user with id: ${id}` });
    }
  }
);

router.delete('/:id', (req: Request, res: Response, next) => {
  const { id } = req.params;
  const user = users.find((user) => user.id === +id);

  if (!user) {
    res.status(404).send({ message: 'there no such user' });
  } else {
    user.isDeleted = true;
    res.status(204).send();
  }
});

export default router;
