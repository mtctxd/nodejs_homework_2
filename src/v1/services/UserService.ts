import { v4 as uuid } from 'uuid';
import { Request } from 'express';

import { UserModel } from '../models';
import Service from './service';
import { userValidator } from '../middlewares/validator/Validator';
import { User, UserCreateProperties } from '../types';
import { FindOptions, Op, WhereOptions } from 'sequelize';

class UserService<
  T extends typeof UserModel,
  V extends typeof userValidator
> extends Service<T, V> {
  constructor(model: T, validator: V) {
    super(model, validator);
  }

  public getAll = async (req: Request) => {
    const options = this.applyQuery(req);

    const items = await this.model.findAll(options);
    return items;
  };

  public getByID = async (id: number) => {
    const item = await this.model.findByPk(id);

    return item;
  };

  public create = async (itemData: UserCreateProperties) => {
    const result = this.validator.validate(itemData, 'create');

    if (!result?.success) {
      throw result;
    }

    const newUserData = {
      user_id: uuid(),
      ...itemData,
    };

    const newUser = await this.model.create(newUserData);

    return newUser;
  };

  public update = async (id: number, itemData: UserCreateProperties) => {
    const item = await this.getByID(id);
    if (item) {
      const updatedItem = item.update(itemData);

      return updatedItem;
    }

    throw new Error('not found');
  };

  private applyQuery = ({ query }: Request) => {
    const { login, limit } = query;
    const options: FindOptions<User> = {
      where: {},
      limit: Number(limit) || 10,
    };

    if (login) {
      options.where = {
        ...options.where,
        login: {
          [Op.iLike]: ('%' + login + '%') as string,
        },
      };
      console.log(options.where);
    }

    return options;
  };
}

export const userService = new UserService(UserModel, userValidator);
