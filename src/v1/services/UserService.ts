
import { UserModel } from '../models/userModel';
import Service from './service';
import { userValidator } from '../middlewares/validator/Validator';
import { UserCreateProperties } from '../types';

class UserService<
  T extends typeof UserModel,
  V extends typeof userValidator,
  U extends UserCreateProperties
> extends Service<T, V, U> {

}

export const userService = new UserService(UserModel, userValidator, 'login');
