import * as express from 'express';
import userModel from '../../models/userModel';
import UserService from '../../services/UserService';

class UserController {
  private userService: UserService;
  constructor(userService: UserService) {
    this.userService = userService;
  }

  public getAll = async (req: express.Request, res: express.Response) => {
    const users = await this.userService.getAll();

    res.send(users);
  };

  public getById = async (req: express.Request, res: express.Response) => {
    const matchedUser = await this.userService.getById(req.params.id);

    if (matchedUser) {
      res.send(matchedUser);
    } else {
      res.status(404).send({ message: 'not found' });
    }
  };

  public createUser = async (req: express.Request, res: express.Response) => {
    try {
      const newUser = await this.userService.createUser(req.body);

      res.status(202).send(newUser);
    } catch (error) {
      res.status(500).send({ message: 'server error: ' + error });
    }
  };

  public updateUser = async (req: express.Request, res: express.Response) => {
    const newUser = await this.userService.updateUser(req.params.id, req.body);

    if (newUser) {
      res.status(202).send(newUser);
    } else {
      res.status(404).send({ message: 'not found' });
    }
  };

  public deleteUser = async (req: express.Request, res: express.Response) => {
    const deletedUser = await this.userService.deleteUser(req.params.id);

    if (deletedUser) {
      res.send(deletedUser);
    } else {
      res.status(404).send({ message: 'not found' });
    }
  };
}

const userService = new UserService(userModel);
const userCotroller = new UserController(userService);

export default userCotroller;
