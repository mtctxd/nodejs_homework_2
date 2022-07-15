import { groupValidaror, userValidator } from '../middlewares/validator/Validator';
import { UserModel } from '../models/userModel';
import { GroupCreateProperties, UniqueKeys, User, UserCreateProperties } from '../types';
import { v4 as uuid } from 'uuid';
import { FindOptions, Op } from 'sequelize';
import { Request } from 'express';
import { GroupModel } from '../models/gropuModel';

class Service<
  T extends typeof UserModel | typeof GroupModel,
  V extends typeof userValidator | typeof groupValidaror,
  B extends UserCreateProperties | GroupCreateProperties
> {
  protected model: T;
  protected validator: V;
  protected uniqueFieldKey: UniqueKeys;

  constructor(model: T, validator: V, uniqueFieldKey: UniqueKeys) {
    this.model = model;
    this.validator = validator;
    this.uniqueFieldKey = uniqueFieldKey;
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

  public create = async (itemData: B) => {
    await this.validateRequestBody(itemData, 'create');

    const newUserData = {
      user_id: uuid(),
      ...itemData,
    };

    const newUser = await this.model.create(newUserData);

    return newUser;
  };

  public update = async (id: number, itemData: B) => {
    await this.validateRequestBody(itemData, 'update');

    const item = await this.getByID(id);

    if (!item) {
      throw new Error('not found');
    }

    const updatedUser = item.update(itemData);

    return updatedUser;
  };

  protected validateRequestBody = async (
    itemData: { [key: string]: any },
    key: 'create' | 'update'
  ) => {
    const validationInfo = this.validator.validate(itemData, key);

    if (!validationInfo?.success) {
      throw validationInfo?.error.issues;
    }

    if (
      itemData[this.uniqueFieldKey] &&
      (await this.uniqueFieldUsed(itemData[this.uniqueFieldKey]))
    ) {
      throw [{ message: `this ${this.uniqueFieldKey} already taken` }];
    }
  };

  protected uniqueFieldUsed = async (uniqueFieldKey: string) => {
    const user = await this.model.findAll({
      where: {
        [this.uniqueFieldKey]: {
          [Op.like]: uniqueFieldKey as string,
        },
      },
    });

    return user.length > 0;
  };

  protected applyQuery = ({ query }: Request) => {
    const { login, limit } = query;
    const options: FindOptions<User> = {
      where: {},
      limit: Number(limit) || 10,
    };

    if (login) {
      options.where = {
        ...options.where,
        [this.uniqueFieldKey]: {
          [Op.iLike]: ('%' + login + '%') as string,
        },
      };
    }

    return options;
  };
}

export default Service;
