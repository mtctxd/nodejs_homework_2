import {
  groupValidator,
  userValidator,
} from '../middlewares/validator/Validator';
import { Group, GroupCreateProperties } from '../types';
import { v4 as uuid } from 'uuid';
import { FindOptions, Op } from 'sequelize';
import { Request } from 'express';
import { GroupModel } from '../models/gropuModel';

class GroupService<
  T extends typeof GroupModel,
  V extends typeof groupValidator,
  U extends GroupCreateProperties
> {
  protected model: T;
  protected validator: V;

  constructor(model: T, validator: V) {
    this.model = model;
    this.validator = validator;
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

  public create = async (itemData: Required<U>) => {
    await this.validateRequestBody(itemData, 'create');

    const newGroupData = {
      group_id: uuid(),
      ...itemData,
    };

    const newUser = await this.model.create(newGroupData);

    return newUser;
  };

  public update = async (id: number, itemData: Partial<U> | U) => {
    await this.validateRequestBody(itemData, 'update');

    const item = await this.getByID(id);

    if (!item) {
      throw new Error('not found');
    }

    const updatedUser = item.update(itemData);

    return updatedUser;
  };

  public delete = async (id: number) => {
    const item = await this.model.findByPk(id);

    item?.destroy();

    return item;
  };

  protected validateRequestBody = async (
    itemData: Partial<U> | U,
    key: 'create' | 'update'
  ) => {
    const validationInfo = this.validator.validate(itemData, key);

    if (!validationInfo?.success) {
      throw validationInfo?.error.issues;
    }

    if (itemData.name && (await this.uniqueFieldUsed(itemData.name))) {
      throw [{ message: `this name already taken` }];
    }
  };

  protected uniqueFieldUsed = async (uniqueFieldKey: string) => {
    const group = await this.model.findAll({
      where: {
        name: {
          [Op.like]: uniqueFieldKey as string,
        },
      },
    });

    return group.length > 0;
  };

  protected applyQuery = ({ query }: Request) => {
    const { name, limit } = query;
    const options: FindOptions<Group> = {
      where: {},
      limit: Number(limit) || 10,
    };

    if (name) {
      options.where = {
        ...options.where,
        name: {
          [Op.iLike]: ('%' + name + '%') as string,
        },
      };
    }

    return options;
  };
}

export const groupService = new GroupService(GroupModel, groupValidator);
