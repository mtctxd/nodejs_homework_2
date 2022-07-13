import { Request } from 'express';
import { Op } from 'sequelize';
import { User, UserBodyRequest, UserModel } from '../types/index';
import { v4 as uuid } from 'uuid';
import Service from './Service';
import { groupModel, userGroup } from '../models';

class UserService<T extends UserModel> extends Service<T> {
  constructor(model: T) {
    super(model);
  }

  public async getAll(req: Request) {
    const { limit, login } = req.query;

    if (login) {
      return await this.model.findAll({
        limit: Number(limit) || 10,
        where: {
          login: {
            [Op.iLike]: '%' + login + '%',
          },
        },
        include: groupModel,
      });
    } else {
      return await this.model.findAll({
        limit: Number(limit) || 10,
        include: groupModel,
      });
    }
  }

  public async getById(id: string) {
    return await this.model.findByPk(id, { include: groupModel });
  }

  public async create(userInfo: UserBodyRequest) {
    const { login, age, password, groups } = userInfo;
    let userData = {};
    const user_id = uuid();

    if (groups) {
      const newUser = await this.model.create(
        {
          user_id,
          login,
          age,
          password,
          groups: [
            {
              name: groups[0],
              userGroup: {},
            },
          ],
        },
        {
          include: userGroup,
        }
      );

      return newUser;
    } else {
      userData = {
        user_id,
        login,
        age,
        password,
      };

      const newUser = await this.model.create(userData);

      return newUser;
    }
  }

  public async update(id: string, userInfo: UserBodyRequest) {
    const { login, password, age, groups } = userInfo;

    try {
      if (groups) {
        await this.model.update(
          { login, password, age, groups },
          {
            where: {
              id,
            },
          }
        );
      } else {
        await this.model.update(
          { login, password, age },
          {
            where: {
              id,
            },
          }
        );
      }

      const user = await this.getById(id);
      return user;
    } catch (error) {
      console.error(error);
      return { messege: 'server error: ', error };
    }
  }

  public async delete(id: string) {
    try {
      await this.model.update(
        { is_deleted: true },
        {
          where: {
            id,
          },
        }
      );

      return await this.getById(id);
    } catch (error) {
      console.error(error);
      return { messege: 'server error: ', error };
    }
  }

  public addGrpup() {}
}

export default UserService;
