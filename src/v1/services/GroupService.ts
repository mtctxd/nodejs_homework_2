import {
  groupValidator,
  userValidator,
} from '../middlewares/validator/Validator';
import { Group, GroupCreateProperties } from '../types';
import { v4 as uuid } from 'uuid';
import { FindOptions, Op } from 'sequelize';
import { Request } from 'express';
import { GroupCreationAttributes, GroupModel } from '../models/groupModel';
import { UserModel } from '../models/userModel';

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

  public getByPK = async (id: number) => {
    const item = await this.model.findByPk(id, {
      include: [
        {
          model: UserModel,
        },
      ],
    });

    return item;
  };

  public create = async (reqBody: Required<U>) => {
    await this.validateRequestBody(reqBody, 'create');
    const { name, premissions } = reqBody;
    const group_id = uuid();

    const newGroupData: GroupCreationAttributes = {
      group_id,
      name,
      premissions,
    };

    const newGroup = await this.model.create(newGroupData);

    await this.addUsersToGroup(newGroup, reqBody);

    return newGroup;
  };

  public update = async (id: number, reqBody: Partial<U>) => {
    await this.validateRequestBody(reqBody, 'update');
    
    const item = await this.getByPK(id);
    
    if (!item) {
      throw new Error('not found');
    }
    
    const updatedGroup = await item.update(reqBody);
    
    await this.addUsersToGroup(updatedGroup, reqBody);

    return updatedGroup;
  };

  public delete = async (id: number) => {
    const item = await this.model.findByPk(id);

    item?.destroy();

    return item;
  };

  protected validateRequestBody = async (
    reqBody: Partial<U> | U,
    key: 'create' | 'update'
  ) => {
    const validationInfo = this.validator.validate(reqBody, key);

    if (!validationInfo?.success) {
      throw validationInfo?.error.issues;
    }

    if (reqBody.name && (await this.uniqueFieldUsed(reqBody.name))) {
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
      include: {
        model: UserModel,
      },
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

  protected addUsersToGroup = async (
    model: GroupModel,
    { users }: Partial<U> | U
  ): Promise<void> => {
    if (users) {
      const usersToAdd: UserModel[] = await UserModel.findAll({
        where: {
          user_id: {
            [Op.any]: users,
          },
        },
      });
      
      await model.addUserModels(usersToAdd);
    }
  };
}

export const groupService = new GroupService(GroupModel, groupValidator);
