import { where } from 'sequelize/types';
import userModel from '../../models/userModel';
import { User } from '../../types/index';

const mockUsers: User[] = [
  {
    id: '1',
    login: 'romka',
    password: 'passwordRomka',
    age: 15,
    isDeleted: false,
  },
  {
    id: '2',
    login: 'sashka',
    password: 'passwordSashka',
    age: 19,
    isDeleted: false,
  },
  {
    id: '3',
    login: 'dashka',
    password: 'passwordDashka',
    age: 25,
    isDeleted: false,
  },
  {
    id: '4',
    login: 'john',
    password: 'passwordJohn',
    age: 90,
    isDeleted: false,
  },
];

export class UserService {
  constructor() {}

  public async getAll() {
    return await userModel.findAll();
  }

  public async getById(id: string) {
    return await userModel.findByPk(id);
  }

  public async createUser(userInfo: Partial<User>) {
    const { login, age, password } = userInfo;
    const newUser = await userModel.create({
      login,
      age,
      password,
    });

    return newUser;
  }

  public async updateUser(id: string, userInfo: Partial<User>) {
    const { login, password, age } = userInfo;

    try {
      await userModel.update(
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
      await userModel.update(
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
