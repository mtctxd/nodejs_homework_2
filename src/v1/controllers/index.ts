import { NextFunction, Request, Response } from 'express';
import { HTTP_STATUS } from '../../types';
import { groupService } from '../services/GroupService';
import { userService } from '../services/UserService';

const ErrorCatchable =
  (metadata: any = {}) =>
  (_target: any, _propertyKey: string, descriptor: PropertyDescriptor) => {
    const fn = descriptor.value;

    descriptor.value = (req: Request, res: Response, next: NextFunction) => {
      try {
        fn.call(this, req, res, next);
      } catch (error) {
        console.error({
          type: 'controller error',
          info: JSON.stringify(error),
        });
        res
          .status(HTTP_STATUS.BAD_REQUEST_400)
          .send({ message: 'Bad Request', details: error });
      }
    };
  };

class Controller<T extends typeof userService | typeof groupService> {
  constructor(protected readonly service: T) {
    this.service = service;
  }

  @ErrorCatchable()
  public async getAll(req: Request, res: Response, next: NextFunction) {
    console.log(this);

    const items = await this.service.getAll(req);

    res.status(HTTP_STATUS.OK_200).send(items);
  }

  @ErrorCatchable()
  public async getByID(req: Request, res: Response, next: NextFunction) {
    console.log(this);
    const item = await this.service.getByPK(req.params.id);

    res.status(HTTP_STATUS.OK_200).send(item || []);
  }

  @ErrorCatchable()
  public async create(req: Request, res: Response, next: NextFunction) {
    const item = await this.service.create(req.body);

    res.status(HTTP_STATUS.CREATED_201).send(item);
  }

  @ErrorCatchable()
  public async update(req: Request, res: Response, next: NextFunction) {
    const item = await this.service.update(req.params.id, req.body);

    res.status(HTTP_STATUS.ACCEPTED_202).send(item);
  }

  @ErrorCatchable()
  public async delete(req: Request, res: Response, next: NextFunction) {
    const item = await this.service.delete(+req.params.id);

    res.status(HTTP_STATUS.ACCEPTED_202).send(item);
  }
}

export const userController = new Controller(userService);
export const groupController = new Controller(groupService);
