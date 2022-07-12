import { Request } from 'express';
import { GroupModel } from '../types';
import Service from './Service';

class GroupService<T extends GroupModel> extends Service<T> {
  constructor(model: T) {
    super(model);
  }
  public getAll = async (req: Request) => {
    const { limit, login } = req.query;

    return await this.model.findAll({
      limit: Number(limit) || 10,
    });
  };

  public getById = async () => {
    return await this.model.findAll({});
  };

  public create = async () => {
    return await this.model.findAll({});
  };

  public update = async () => {
    return await this.model.findAll({});
  };

  public delete = async () => {
    return await this.model.findAll({});
  };
}

export default GroupService;
