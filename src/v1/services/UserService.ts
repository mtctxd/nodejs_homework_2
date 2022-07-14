import { v4 as uuid } from 'uuid';

import { UserCreationAttributes, UserModel } from '../models';
import Service from './service';
import { User, UserCreateUpdateProperties } from '../types';
import userValidationSchema from '../middlewares/validator/schema/userSchema';

class UserService<T extends typeof UserModel> extends Service<T> {
  constructor(model: T) {
    super(model);
  }

  getAll = async () => {
    const items = await this.model.findAll();
    return items;
  };

  getByID = async (id: number) => {
    const item = await this.model.findByPk(id);

    return item;
  };

  create = async (itemData: UserCreateUpdateProperties) => {
    const result = userValidationSchema.create.safeParse(itemData);

    if (!result.success) {
      console.log(result.error.issues);

      return result.error.issues
    } else {
      const newUserData = {
        user_id: uuid(),
        ...itemData,
      };

      const newUser = await this.model.create(newUserData);

      return newUser;
    }
  };

  update = async (id: number, itemData: UserCreateUpdateProperties) => {
    const item = await this.getByID(id);
    if (item) {
      const updatedItem = item.update(itemData);

      return updatedItem;
    }

    throw new Error('not found');
  };
}

export const userService = new UserService(UserModel);
