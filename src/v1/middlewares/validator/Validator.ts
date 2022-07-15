import { z } from 'zod';
import { ValidationMethods } from '../../../types';
import {
  GroupCreateProperties,
  GroupUpdateProperties,
  UserCreateProperties,
  UserUpdateProperties,
} from '../../types';
import groupValidationSchema from './schema/groupSchema';
import userValidationSchema from './schema/userSchema';

type PlaceholderSchema = {
  create: z.Schema<any>;
  update: z.Schema<any>;
};

type PlaceholderProps =
  | GroupCreateProperties
  | GroupUpdateProperties
  | UserCreateProperties
  | UserUpdateProperties;

class Validator {
  public schema: PlaceholderSchema;
  constructor(schema: PlaceholderSchema) {
    this.schema = schema;
  }

  private processValidation = (
    data: PlaceholderProps,
    valodationMethod: z.Schema<any>
  ) => {
    const result = valodationMethod.safeParse(data);

    return result;
  };

  public validate = (data: PlaceholderProps, type: keyof PlaceholderSchema) => {
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
export const groupValidator = new Validator(groupValidationSchema);
