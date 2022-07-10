import e from 'express';
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

  public getAll() {
    return mockUsers;
  }

  public getById(id: string) {
    return mockUsers.find((user) => user.id === id);
  }

  public createUser(userInfo: Partial<User>) {
    const { login, age, password } = userInfo;

    return {
      id: mockUsers.length + 1 + '',
      login,
      password,
      age,
      isDeleted: false,
    };
  }

  public updateUser(id: string, userInfo: Partial<User>) {
    const matchedUser = mockUsers.find((user) => user.id === id);
    const { login, password, age } = userInfo;
    if (!matchedUser) {
      return null;
    } else {
      return {
        ...matchedUser,
        login: login || matchedUser.login,
        password: password || matchedUser.password,
        age: age || matchedUser.age,
      };
    }
  }

  public deleteUser(id: string) {
    const matchedUser = mockUsers.find((user) => user.id === id);
    if (!matchedUser) {
      return null;
    } else {
      matchedUser.isDeleted = true;
      return matchedUser;
    }
  }
}

export default UserService;
