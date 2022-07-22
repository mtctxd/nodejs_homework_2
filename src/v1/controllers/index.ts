import { Request, Response } from 'express';
import { Logger } from 'winston';
import ErrorCatchable from '../../decorators/ErrorCatchable';
import { loggerCreator } from '../../feature/logger';
import { HTTP_STATUS } from '../../types';
import { groupService } from '../services/GroupService';
import { userService } from '../services/UserService';

export class Controller<T extends typeof userService | typeof groupService> {
  constructor(protected readonly service: T, public readonly logger: Logger) {
    this.service = service;
    this.logger = logger;
  }

  @ErrorCatchable()
  public async getAll(req: Request, res: Response) {
    const items = await this.service.getAll(req);

    res.status(HTTP_STATUS.OK_200).send(items);
    return {
      code: HTTP_STATUS.OK_200,
    };
  }

  @ErrorCatchable()
  public async getByID(req: Request, res: Response) {
    const item = await this.service.getByPK(req.params.id);

    res.status(HTTP_STATUS.OK_200).send(item || []);
    return {
      code: HTTP_STATUS.OK_200,
    };
  }

  @ErrorCatchable()
  public async create(req: Request, res: Response) {
    const item = await this.service.create(req.body);

    res.status(HTTP_STATUS.CREATED_201).send(item);
    return {
      code: HTTP_STATUS.CREATED_201,
    };
  }

  @ErrorCatchable()
  public async update(req: Request, res: Response) {
    const item = await this.service.update(req.params.id, req.body);

    res.status(HTTP_STATUS.ACCEPTED_202).send(item);
    return {
      code: HTTP_STATUS.ACCEPTED_202,
    };
  }

  @ErrorCatchable()
  public async delete(req: Request, res: Response) {
    const item = await this.service.delete(req.params.id);

    res.status(HTTP_STATUS.ACCEPTED_202).send(item);
    return {
      code: HTTP_STATUS.ACCEPTED_202,
    };
  }
}

const userLogger = loggerCreator('user_logger');
const groupLogger = loggerCreator('group_logger');

export const userController = new Controller(userService, userLogger);
export const groupController = new Controller(groupService, groupLogger);
