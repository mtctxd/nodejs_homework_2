import { Request, Response, Router } from 'express';
import { send } from 'process';
import { User } from '../../types';
import Joi from 'joi';

const router = Router();
const userCreateScheme = Joi.object<User>().keys({
  // id: Joi.number().integer(),
  login: Joi.string().min(6).max(18).required(),
  password: Joi.string().min(6).max(32).required(),
  age: Joi.number().min(7).max(110).required(),
  // isDeleted: Joi.boolean().required(),
});
const userUpdateScheme = Joi.object<User>().keys({
  login: Joi.string().min(6).max(18),
  password: Joi.string().min(6).max(32),
  age: Joi.number().min(7).max(110),
  isDeleted: Joi.boolean(),
});

const users: User[] = [
  { id: 1, age: 18, isDeleted: false, login: 'romka', password: 'password' },
  { id: 2, age: 9, isDeleted: true, login: 'ilone', password: 'ilona1234' },
  {
    id: 3,
    age: 55,
    isDeleted: false,
    login: 'dudka',
    password: 'passwordDUDKA',
  },
  { id: 4, age: 99, isDeleted: false, login: 'sashka', password: 'sashka123' },
];

const getMaxId = (data: User[]): number => {
  return Math.max(...data.map(({ id }) => id)) + 1 || 1;
};

router.get('/', (req: Request, res: Response, next) => {
  console.log('get /');

  res.send(users);
});

router.get('/:id', (req: Request, res: Response, next) => {
  console.log('get /:id');
  const { id } = req.params;
  const result = users.find((user) => user.id === +id);

  if (!result) {
    res.status(404).send({ message: `There no user with id: ${id}` });
  } else {
    res.status(200).send(result);
  }
});

router.post('/', (req: Request, res: Response, next) => {
  const userData = userCreateScheme.validate(req.body);

  if (userData.error) {
    res.send({ message: userData.error?.details[0].message });
  }

  const { password, login, age } = req.body;

  const newUser: User = {
    id: getMaxId(users),
    password,
    isDeleted: false,
    login,
    age,
  };

  res.status(201).send(newUser);
  res.status(201).send('created');
});

router.put('/:id', (req: Request, res: Response, next) => {
  const { id } = req.params;
  const userData = userUpdateScheme.validate(req.body);
  let user = users.find((user) => user.id === +id);

  if (userData.error) {
    res.send({ message: userData.error?.details[0].message });
  }

  if (user) {
    const updatedUser = {
      ...user,
      ...req.body,
    };

    console.log('##################################');
    console.log(updatedUser);
    console.log('##################################');

    res.send(updatedUser);
  } else {
    res.status(404).send({ message: `There no user with id: ${id}` });
  }

  next();
});

export default router;
