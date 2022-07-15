import { ValidationMethods } from '../../../types';
import { UserUpdateProperties } from '../../types';
import groupValidationSchema, {
  GroupValidationSchema,
} from './schema/groupSchema';
import userValidationSchema, {
  UserValidationSchema,
} from './schema/userSchema';

class Validator {
  public schema: UserValidationSchema | GroupValidationSchema;
  constructor(schema: UserValidationSchema | GroupValidationSchema) {
    this.schema = schema;
  }

  private processValidation = (
    data: UserUpdateProperties,
    valodationMethod:
      | UserValidationSchema[keyof UserValidationSchema]
      | GroupValidationSchema[keyof GroupValidationSchema]
  ) => {
    const result = valodationMethod.safeParse(data);

    return result;
  };

  public validate = (
    data: UserUpdateProperties,
    type: keyof UserValidationSchema | keyof GroupValidationSchema
  ) => {
    switch (type) {
      case ValidationMethods.CREATE:
        return this.processValidation(data, this.schema.create);

      case ValidationMethods.UPDATE:
        return this.processValidation(data, this.schema.update);

      default:
        break;
    }
  };
}

export const userValidator = new Validator(userValidationSchema);
export const groupValidaror = new Validator(groupValidationSchema);
