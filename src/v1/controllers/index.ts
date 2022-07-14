import { NextFunction, Request, Response } from 'express';
import { HTTP_STATUS } from '../../types';
import { userService } from '../services/service';

class Controller {
  public service: any;

  constructor(service: any) {
    this.service = service;
  }

  getAll = async (req: Request, res: Response, next: NextFunction) => {
    const items = await this.service.getAll(req);

    res.status(HTTP_STATUS.OK_200).send(items);
  };

  getByID = async (req: Request, res: Response, next: NextFunction) => {
    const item = await this.service.getByID(req.params.id);

    res.status(HTTP_STATUS.OK_200).send(item);
  };

  create = async (req: Request, res: Response, next: NextFunction) => {
    const item = await this.service.create(req.body);

    res.status(HTTP_STATUS.CREATED_201).send(item);
  };
}

export const userController = new Controller(userService);
