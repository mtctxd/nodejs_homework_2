import { NextFunction, Request, Response } from 'express';
import { Logger } from 'winston';
import { logerCreator } from '../../feature/logger';
import { HTTP_STATUS } from '../../types';
import { groupService } from '../services/GroupService';
import { userService } from '../services/UserService';

// const ErrorCatchable =
//   (metadata: any = {}) =>
//   (_target: any, _propertyKey: string, descriptor: PropertyDescriptor) => {
//     const fn = descriptor.value;
//     console.log(_target, _propertyKey);
    

//     descriptor.value = (req: Request, res: Response, next: NextFunction) => {
//       try {        
//         fn.call(req, res, next);
//       } catch (error) {
//         console.error({
//           type: 'controller error',
//           info: JSON.stringify(error),
//         });
//         res
//           .status(HTTP_STATUS.BAD_REQUEST_400)
//           .send({ message: 'Bad Request', details: error });
//       }
//     };
//   };

const ErrorCatchable =
  (metadata: any = {}) =>
  (_target: any, _propertyKey: string, descriptor: PropertyDescriptor) => {
    const childF = descriptor.value;

    descriptor.value = (...args: any[]) => {
        childF.call(this, args);
    };
  };



/**
 * You need to bind callback in router
 * because you loosing context.
 * The reason is because of using decorators i could not use arrow functions on methods, so i will not loose function descriptor
 *
 * @example userRouter.get('/', userController.getAll.bind(userController));
 */

class Controller<T extends typeof userService | typeof groupService> {
  constructor(
    protected readonly service: T,
    protected readonly logger: Logger
  ) {
    this.service = service;
    this.logger = logger;
  }

  @ErrorCatchable().bind(this)
  public async getAll(req: Request, res: Response, next: NextFunction) {
    const items = await this.service.getAll(req);

    res.status(HTTP_STATUS.OK_200).send(items);
  }

  // @ErrorCatchable()
  public async getByID(req: Request, res: Response, next: NextFunction) {
    const item = await this.service.getByPK(req.params.id);

    res.status(HTTP_STATUS.OK_200).send(item || []);
  }

  // @ErrorCatchable()
  public async create(req: Request, res: Response, next: NextFunction) {
    const item = await this.service.create(req.body);

    res.status(HTTP_STATUS.CREATED_201).send(item);
  }

  // @ErrorCatchable()
  public async update(req: Request, res: Response, next: NextFunction) {
    const item = await this.service.update(req.params.id, req.body);

    res.status(HTTP_STATUS.ACCEPTED_202).send(item);
  }

  // @ErrorCatchable()
  public async delete(req: Request, res: Response, next: NextFunction) {
    const item = await this.service.delete(+req.params.id);

    res.status(HTTP_STATUS.ACCEPTED_202).send(item);
  }
}

const userLogger = logerCreator('user_logger');
const groupLogger = logerCreator('group_logger');

export const userController = new Controller(userService, userLogger);
export const groupController = new Controller(groupService, groupLogger);
