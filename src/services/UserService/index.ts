import { where } from 'sequelize/types';
import userModel from '../../models/userModel';
import { User, UserModel } from '../../types/index';

export class UserService {
  private model: UserModel;
  constructor(model: UserModel) {
    this.model = model;
  }

  public async getAll() {
    return await this.model.findAll();
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
