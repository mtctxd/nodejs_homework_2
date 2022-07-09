import { NextFunction, Request, Response } from 'express';
import { getMaxId } from '../../features/getMaxId';
import userValidator, { Validator } from '../../middlewares/Valiadtor';
import { processUserQueryString } from '../../features/processUserQueryString';
import { User } from '../../types';

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

class UserController {
  private validator: Validator<User>;

  constructor(validator: Validator<User>) {
    this.validator = validator;
  }

  getAll() {
    return (req: Request, res: Response) => {
      const login = req.query.login as string;
      const limit = req.query.limit as string;
      res.send(processUserQueryString(users, login, limit));
    };
  }

  getById() {
    return (req: Request, res: Response) => {
      const { id } = req.params;
      let result = users.find((user) => user.id === +id);

      if (!result) {
        res.status(404).send({ message: `There no user with id: ${id}` });
      } else {
        res.status(200).send(result);
      }
    };
  }

  createUser() {
    return [
      this.validator.validate('create'),
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
      },
    ];
  }

  updateUser() {
    return [
      this.validator.validate('update'),
      (req: Request, res: Response) => {
        const { id } = req.params;
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
      },
    ];
  }

  deleteUser() {
    return (req: Request, res: Response) => {
      const { id } = req.params;
      const user = users.find((user) => user.id === +id);
      console.log(req);

      if (!!!user) {
        res.status(404).send({ message: 'there no such user' });
      } else {
        user.isDeleted = true;
        res.status(204).send();
      }
    };
  }
}

const userControler = new UserController(userValidator);

export default userControler;
