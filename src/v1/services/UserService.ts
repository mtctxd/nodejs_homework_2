import { UserModel } from '../models/userModel';
import { userValidator } from '../middlewares/validator/Validator';
import { User, UserCreateProperties } from '../types';
import { v4 as uuid } from 'uuid';
import { FindOptions, Op } from 'sequelize';
import { Request } from 'express';
import { GroupModel } from '../models/groupModel';

class UserService<
  T extends typeof UserModel,
  V extends typeof userValidator,
  U extends UserCreateProperties
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
          model: GroupModel,
        },
      ],
    });

    return item;
  };

  public create = async (reqBody: Required<U>) => {
    await this.validateRequestBody(reqBody, 'create');
    const user_id = uuid();

    const newUserData = {
      user_id,
      ...reqBody,
    };

    const newUser = await this.model.create(newUserData);
    await this.addGroupsToUsers(newUser, reqBody)

    return newUser;
  };

  public update = async (id: number, reqBody: Partial<U>) => {
    await this.validateRequestBody(reqBody, 'update');

    const item = await this.getByPK(id);

    if (!item) {
      throw new Error('not found');
    }

    const updatedUser = await item.update(reqBody);

    await this.addGroupsToUsers(updatedUser, reqBody);

    return updatedUser;
  };

  public delete = async (id: number) => {
    const item = await this.model.findByPk(id);

    item?.update({
      is_deleted: true,
    });

    return item;
  };

  protected validateRequestBody = async (
    reqBody: Partial<UserCreateProperties> | UserCreateProperties,
    key: 'create' | 'update'
  ) => {
    const validationInfo = this.validator.validate(reqBody, key);

    if (!validationInfo?.success) {
      throw validationInfo?.error.issues;
    }

    if (reqBody.login && (await this.uniqueFieldUsed(reqBody.login))) {
      throw [{ message: `this login already taken` }];
    }
  };

  protected uniqueFieldUsed = async (uniqueFieldKey: string) => {
    const user = await this.model.findAll({
      where: {
        login: {
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
      include: {
        model: GroupModel,
      },
    };

    if (login) {
      options.where = {
        ...options.where,
        login: {
          [Op.iLike]: ('%' + login + '%') as string,
        },
      };
    }

    return options;
  };

  protected addGroupsToUsers = async (
    model: UserModel,
    { groups }: Partial<U> | U
  ): Promise<void> => {
    if (groups) {
      const usersToAdd: GroupModel[] = await GroupModel.findAll({
        where: {
          group_id: {
            [Op.any]: groups,
          },
        },
      });
      
      await model.addGroupModels(usersToAdd);
    }
  };
}

export const userService = new UserService(UserModel, userValidator);
