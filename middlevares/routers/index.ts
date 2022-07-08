import { NextFunction, Request, Response, Router } from 'express';
import { send } from 'process';
import { User } from '../../types';
import Joi from 'joi';

const router = Router();
const userCreateScheme = Joi.object().keys({
  login: Joi.string().min(6).max(18).required(),
  password: Joi.string().min(6).max(32).required(),
  age: Joi.number().min(7).max(110).required(),
});

const userUpdateScheme = Joi.object().keys({
  id: Joi.number().integer().required(),
  login: Joi.string().min(6).max(18),
  password: Joi.string().min(6).max(32),
  age: Joi.number().min(7).max(110),
});

const users: User[] = [
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

type ValidatorOptions<T> = {
  create?: Joi.ObjectSchema<T>;
  update?: Joi.ObjectSchema<T>;
};

type ValidatorMethods<T> = {
  create?: Joi.ObjectSchema<T>;
  update?: Joi.ObjectSchema<T>;
};

type ServerCallback = {
  req: Request;
  res: Response;
  next: NextFunction;
};

class Validator<T> {
  private method: ValidatorMethods<T>;

  constructor(options: ValidatorOptions<T>) {
    this.method = {};
    this.method.create = options.create;
    this.method.update = options.update;
  }

  /**
   * Bad code, dont look. Need to spit logic. Probably validator should not send error
   * @param  {ServerCallback} serverCallback
   * @param  {any} validationSchema
   */
  private validateUserCallback(
    serverCallback: ServerCallback,
    validationSchema: any
  ) {
    const { req, res, next } = serverCallback;
    const userData = validationSchema.validate(req.body);

    if (userData?.error) {
      res.status(404).send({ message: userData.error?.details[0].message });
    } else {
      next();
    }
  }
  /**
   * not shure if i what i need to send if no matches...
   * probably should be better type notation
   * @param  {keyoftypeofthis.method} validatorWithMethod
   */
  validate(validatorWithMethod: keyof typeof this.method) {
    return (req: Request, res: Response, next: NextFunction) => {
      const serverCallback: ServerCallback = { req, res, next };
      switch (validatorWithMethod) {
        case 'create':
          this.validateUserCallback(serverCallback, this.method.create);
          break;

        case 'update':
          this.validateUserCallback(serverCallback, this.method.update);
          break;

        default:
          console.error('uncorrect scheme validation');

          res.status(500).send({ message: 'server error' });
          break;
      }
    };
  }
}

const userValidator = new Validator<User>({
  create: userCreateScheme,
  update: userUpdateScheme,
});

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
