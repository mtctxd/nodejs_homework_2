import { Request, Response } from 'express';
import groupModel from '../models/groupModel';
import userModel from '../models/userModel';
import GroupService from '../services/GroupService';
import UserService from '../services/UserService';
import { GroupModel, UserModel } from '../types';

class Controller<T extends UserService<UserModel> | GroupService<GroupModel>> {
  private service: T;
  constructor(service: T) {
    this.service = service;
  }

  public getAll = async (req: Request, res: Response) => {
    const users = await this.service.getAll(req);

    res.send(users);
  };

  public getById = async (req: Request, res: Response) => {
    const matchedUser = await this.service.getById(req.params.id);

    if (matchedUser) {
      res.send(matchedUser);
    } else {
      res.status(404).send({ message: 'not found' });
    }
  };

  public createUser = async (req: Request, res: Response) => {
    try {
      const newUser = await this.service.create(req.body);

      res.status(202).send(newUser);
    } catch (error) {
      res.status(500).send({ message: 'server error: ' + error });
    }
  };

  public updateUser = async (req: Request, res: Response) => {
    const newUser = await this.service.update(req.params.id, req.body);

    if (newUser) {
      res.status(202).send(newUser);
    } else {
      res.status(404).send({ message: 'not found' });
    }
  };

  public deleteUser = async (req: Request, res: Response) => {
    const deletedUser = await this.service.delete(req.params.id);

    if (deletedUser) {
      res.send(deletedUser);
    } else {
      res.status(404).send({ message: 'not found' });
    }
  };
}

const userService = new UserService(userModel);
export const userController = new Controller<UserService<UserModel>>(
  userService
);

const groupService = new GroupService(groupModel);
export const groupController = new Controller<GroupService<GroupModel>>(
  groupService
);
