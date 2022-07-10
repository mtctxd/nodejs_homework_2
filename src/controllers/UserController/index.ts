import * as express from 'express';
import UserService from '../../services/UserService';

class UserController {
  private userService: UserService;
  constructor(userService: UserService) {
    this.userService = userService;
  }

  public getAll = (req: express.Request, res: express.Response) => {
    const users = this.userService.getAll();

    res.send(users);
  };

  public getById = (req: express.Request, res: express.Response) => {
    const matchedUser = this.userService.getById(req.params.id);

    if (matchedUser) {
      res.send(matchedUser);
    } else {
      res.status(404).send({ message: 'not found' });
    }
  };

  public createUser = (req: express.Request, res: express.Response) => {
    const newUser = this.userService.createUser(req.body);

    res.status(202).send(newUser);
  };

  public updateUser = (req: express.Request, res: express.Response) => {
    const newUser = this.userService.updateUser(req.params.id, req.body);

    if (newUser) {
      res.status(202).send(newUser);
    } else {
      res.status(404).send({ message: 'not found' });
    }
  };

  public deleteUser = (req: express.Request, res: express.Response) => {
    const deletedUser = this.userService.deleteUser(req.params.id);

    if (deletedUser) {
      res.send(deletedUser);
    } else {
      res.status(404).send({ message: 'not found' });
    }
  }
}

const userService = new UserService();
const userCotroller = new UserController(userService);

export default userCotroller;
