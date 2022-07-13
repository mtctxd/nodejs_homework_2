import { Request } from 'express';
import { Op } from 'sequelize';
import { User, UserBodyRequest, UserModel } from '../types/index';
import { v4 as uuid } from 'uuid';
import Service from './Service';
import { groupModel } from '../models';

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
    return await this.model.findByPk(id);
  }

  public async create(userInfo: Partial<User>) {
    const { login, age, password } = userInfo;
    const newUser = await this.model.create({
      user_id: uuid(),
      login,
      age,
      password,
    });

    return newUser;
  }

  public async update(id: string, userInfo: UserBodyRequest) {
    const { login, password, age, group } = userInfo;

    try {
      const newUser = await this.model.update(
        { login, password, age },
        {
          where: {
            id,
          },
        }
      );

      if (group) {
      }

      return newUser;
    } catch (error) {
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
      return { messege: 'server error: ', error };
    }
  }

  public addGrpup() {}
}

export default UserService;
