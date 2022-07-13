import { groupModel } from '../../models';
import { Group, UserModel, ValidationOptions } from '../../types';
import { validationShcemes } from './schemes';
import { groupValidationsSchema } from './schemes/groupSchema';
import Validator from './Validator';

class GroupValidator<
  T extends typeof validationShcemes.group,
  M extends UserModel,
  U extends ValidationOptions<keyof Group>
> extends Validator<T, M, U> {
  constructor(schema: T, model: M, options?: U) {
    super(schema, model, options);
  }
}

export const groupValidator = new GroupValidator(
  groupValidationsSchema,
  groupModel,
  {
    uniqueField: 'name',
  }
);
