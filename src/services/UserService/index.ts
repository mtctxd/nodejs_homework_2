import { Request } from 'express';
import { Op } from 'sequelize';
import { User, UserModel } from '../../types/index';

export class UserService {
  private model: UserModel;
  constructor(model: UserModel) {
    this.model = model;
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
      });
    } else {
      return await this.model.findAll({
        limit: Number(limit) || 10,
      });
    }
  }

  public async getById(id: string) {
    return await this.model.findByPk(id);
  }

  public async createUser(userInfo: Partial<User>) {
    const { login, age, password } = userInfo;
    const newUser = await this.model.create({
      login,
      age,
      password,
    });

    return newUser;
  }

  public async updateUser(id: string, userInfo: Partial<User>) {
    const { login, password, age } = userInfo;

    try {
      await this.model.update(
        { login, password, age },
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

  public async deleteUser(id: string) {
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
}

export default UserService;
