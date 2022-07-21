import { groupValidator } from '../middlewares/validator/Validator';
import { Group, GroupCreateProperties } from '../types';
import { v4 as uuid } from 'uuid';
import { FindOptions, Op } from 'sequelize';
import { Request } from 'express';
import { GroupCreationAttributes, GroupModel } from '../models/groupModel';
import { UserModel } from '../models/userModel';
import { userService } from './UserService';
import { prepareServiceError } from '../../feature/prepareServiceError';
import { HTTP_STATUS } from '../../types';

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

  public getByPK = async (id: string) => {
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

    return await this.getByPK(group_id);
  };

  public update = async (id: string, reqBody: Partial<U>) => {
    await this.validateRequestBody(reqBody, 'update');

    const item = await this.getByPK(id);

    if (!item) {
      throw prepareServiceError(HTTP_STATUS.NOT_FOUND_404, 'group not found');
    }

    const updatedGroup = await item.update(reqBody);

    await this.addUsersToGroup(updatedGroup, reqBody);

    return await this.getByPK(updatedGroup.group_id);
  };

  public delete = async (id: string) => {
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
      throw prepareServiceError(
        HTTP_STATUS.BAD_REQUEST_400,
        'validation error',
        [validationInfo?.error.issues]
      );
    }

    if (reqBody.name && (await this.uniqueFieldUsed(reqBody.name))) {
      throw prepareServiceError(
        HTTP_STATUS.BAD_REQUEST_400,
        'this name already used'
      );
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
      const usersToAdd = (
        await Promise.all(
          users.map(async (user) => await userService.getByPK(user))
        )
      ).filter(Boolean) as UserModel[];

      await model.addUserModels(usersToAdd);
    }
  };
}

export const groupService = new GroupService(GroupModel, groupValidator);
