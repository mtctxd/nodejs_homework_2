import { NextFunction, Request, Response } from 'express';
import { HTTP_STATUS } from '../../types';
import { userService } from '../services/UserService';

class Controller<T extends typeof userService> {
  public service: T;

  constructor(service: T) {
    this.service = service;
  }

  getAll = async (req: Request, res: Response, next: NextFunction) => {
    const items = await this.service.getAll();

    res.status(HTTP_STATUS.OK_200).send(items);
  };

  getByID = async (req: Request, res: Response, next: NextFunction) => {
    const item = await this.service.getByID(+req.params.id);

    res.status(HTTP_STATUS.OK_200).send(item);
  };

  create = async (req: Request, res: Response, next: NextFunction) => {
    const item = await this.service.create(req.body);

    res.status(HTTP_STATUS.CREATED_201).send(item);
  };

  update = async (req: Request, res: Response, next: NextFunction) => {
      const item = await this.service.update(+req.params.id, req.body);

      res.status(HTTP_STATUS.ACCEPTED_202).send(item);
  };

  delete = async (req: Request, res: Response, next: NextFunction) => {
    const item = await this.service.update(+req.params.id, req.body);

    res.status(HTTP_STATUS.ACCEPTED_202).send(item);
  };
}

export const userController = new Controller(userService);
