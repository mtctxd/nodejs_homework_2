import * as express from 'express';

const mockUsers: User[] = [
  {
    id: '1',
    login: 'romka',
    password: 'passwordRomka',
    age: 15,
    isDeleted: false,
  },
  {
    id: '2',
    login: 'sashka',
    password: 'passwordSashka',
    age: 19,
    isDeleted: false,
  },
  {
    id: '3',
    login: 'dashka',
    password: 'passwordDashka',
    age: 25,
    isDeleted: false,
  },
  {
    id: '4',
    login: 'john',
    password: 'passwordJohn',
    age: 90,
    isDeleted: false,
  },
];

class UserController {
  constructor() {}

  getAll(req: express.Request, res: express.Response) {
    const users = mockUsers;
    res.send(users);
  }

  getById(req: express.Request, res: express.Response) {
    const { id }: Partial<User> = req.params;

    const matchedUser = mockUsers.find((user) => user.id === id);

    if (matchedUser) {
      res.send(matchedUser);
    } else {
      res.status(404).send({ message: 'not found' });
    }
  }

  createUser(req: express.Request, res: express.Response) {
    const { login, password, age }: Partial<User> = req.body;

    const newUser: Partial<User> = {
      id: mockUsers.length + 1 + '',
      login,
      password,
      age,
      isDeleted: false,
    };

    res.status(202).send(newUser);
  }

  updateUser(req: express.Request, res: express.Response) {
    const { id } = req.params;
    const { login, password, age }: Partial<User> = req.body;

    const matchedUser = mockUsers.find((user) => user.id === id);


    if (matchedUser) {
      const newUser = {
        ...matchedUser,
        login: login || matchedUser.login,
        password: password || matchedUser.password,
        age: age || matchedUser.age,
      };
      
      res.status(202).send(newUser);
    } else {
      res.status(404).send({ message: 'not found' });
    }
  }

  deleteUser(req: express.Request, res: express.Response) {
    const { id }: Partial<User> = req.params;

    const matchedUser = mockUsers.find((user) => user.id === id);

    if (matchedUser) {
      matchedUser.isDeleted = true;
      res.send(matchedUser);
    } else {
      res.status(404).send({ message: 'not found' });
    }
  }
}

const userCotroller = new UserController();

export default userCotroller;
