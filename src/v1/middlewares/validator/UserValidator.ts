import { userModel } from '../../models';
import { User, UserModel, ValidationOptions } from '../../types';
import { validationShcemes } from './schemes';
import { userValidationsSchema } from './schemes/userSchema';
import Validator from './Validator';

class UserValidator<
  T extends typeof validationShcemes.user,
  M extends UserModel,
  U extends ValidationOptions<keyof User>
> extends Validator<T, M, U> {
  constructor(schema: T, model: M, options?: U) {
    super(schema, model, options);
  }
}

export const userValidator = new UserValidator(
  userValidationsSchema,
  userModel,
  {
    uniqueField: 'login',
  }
);
