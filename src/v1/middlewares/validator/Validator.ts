import { ValidationMethods } from '../../../types';
import { UserCreateUpdateProperties } from '../../types';
import userValidationSchema, {
  UserValidationSchema,
} from './schema/userSchema';

class Validator {
  public schema: UserValidationSchema;
  constructor(schema: UserValidationSchema) {
    this.schema = schema;
  }

  private processValidation = (
    data: UserCreateUpdateProperties,
    valodationMethod: UserValidationSchema[keyof UserValidationSchema]
  ) => {
    const result = valodationMethod.safeParse(data);

    return result;
  };

  public validate = (
    data: UserCreateUpdateProperties,
    type: keyof UserValidationSchema
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
