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
  { id: 1, age: 18, isDeleted: false, login: 'Romka', password: 'RRRpassword' },
  { id: 2, age: 18, isDeleted: false, login: 'romka', password: 'password' },
  { id: 3, age: 9, isDeleted: true, login: 'ilone', password: 'ilona1234' },
  {
    id: 4,
    age: 55,
    isDeleted: false,
    login: 'dudka',
    password: 'passwordDUDKA',
  },
  { id: 5, age: 99, isDeleted: false, login: 'sashka', password: 'sashka123' },
];

function getAutoSuggestUsers(
  loginSubscring: string = '',
  limit: string = '10'
): User[] {
  let result = [...users];

  if (loginSubscring) {
    result = result
      .filter((user) =>
        user.login.toLowerCase().includes(loginSubscring.toLowerCase())
      )
      .sort((current: User, prev: User) =>
        current.login.localeCompare(prev.login)
      );
  }

  if (limit) {
    result.splice(+limit);
  }

  return result;
}

const getMaxId = (data: User[]): number => {
  return Math.max(...data.map(({ id }) => id)) + 1 || 1;
};

router.get('/', (req: Request, res: Response, next) => {
  const login = req.query.login as string;
  const limit = req.query.limit as string;
  res.send(getAutoSuggestUsers.call(users, login, limit));
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

router.post('/:id', (req: Request, res: Response, next) => {
  const userData = userCreateScheme.validate(req.body);

  const { id } = req.params;

  if (users.find((user) => user.id === +id)) {
    res.status(404).send({ message: 'You are trying to add existing user' });
  } else if (userData.error) {
    res.status(404).send({ message: userData.error?.details[0].message });
  } else {
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
    res.status(204).send(updatedUser);
  } else {
    res.status(404).send({ message: `There no user with id: ${id}` });
  }

  next();
});

router.delete('/:id', (req: Request, res: Response, next) => {
  const { id } = req.params;
  const user = users.find((user) => user.id === +id);

  if (!user) {
    res.status(404).send({ message: 'there no such user' });
  } else {
    user.isDeleted = true;
    console.log(`User ${user.login} was deleted`);
    res.status(204).send();
  }
});

export default router;
