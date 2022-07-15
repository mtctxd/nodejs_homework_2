import { generateMock } from '@anatine/zod-mock';
import { NextFunction, Request, Response } from 'express';
import { HTTP_STATUS } from '../../types';
import userValidationSchema from '../middlewares/validator/schema/userSchema';
import { groupService } from '../services/GroupService';
import { userService } from '../services/UserService';

class Controller<T extends typeof userService | typeof groupService> {
  public service: T;

  constructor(service: T) {
    this.service = service;
  }

  public getAll = async (req: Request, res: Response, next: NextFunction) => {
    this.warpWithErrorHandling(res, async () => {
      const items = await this.service.getAll(req);

      res.status(HTTP_STATUS.OK_200).send(items);
    });
  };

  public getByID = async (req: Request, res: Response, next: NextFunction) => {
    const item = await this.service.getByID(+req.params.id);

    res.status(HTTP_STATUS.OK_200).send(item);
  };

  public create = async (req: Request, res: Response, next: NextFunction) => {
    this.warpWithErrorHandling(res, async () => {
      const item = await this.service.create(req.body);

      res.status(HTTP_STATUS.CREATED_201).send(item);
    });
  };

  public update = async (req: Request, res: Response, next: NextFunction) => {
    this.warpWithErrorHandling(res, async () => {
      const item = await this.service.update(+req.params.id, req.body);

      res.status(HTTP_STATUS.ACCEPTED_202).send(item);
    });
  };

  public delete = async (req: Request, res: Response, next: NextFunction) => {
    this.warpWithErrorHandling(res, async () => {
      const item = await this.service.update(+req.params.id, req.body);

      res.status(HTTP_STATUS.ACCEPTED_202).send(item);
    });
  };

  private warpWithErrorHandling = async (res: Response, f: Function) => {
    try {
      await f();
    } catch (error) {
      console.error({ type: 'controller error', info: JSON.stringify(error) });
      res
        .status(HTTP_STATUS.BAD_REQUEST_400)
        .send({ message: 'Bad Request', details: error });
    }
  };
}

export const userController = new Controller(userService);
export const groupController = new Controller(groupService)
