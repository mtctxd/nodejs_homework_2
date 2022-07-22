/* eslint-disable @typescript-eslint/no-explicit-any */
import { Op } from 'sequelize';
import { z } from 'zod';
import { prepareServiceError } from '../../../feature/prepareServiceError';
import { HTTP_STATUS, ValidationMethods } from '../../../types';
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
  login?: z.ZodSchema<any>;
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

      case ValidationMethods.LOGIN:
        if (this.schema.login) {
          return this.processValidation(data, this.schema.login);
        }

        break;

      default:
        break;
    }
  };

  public validateRequestBody = async (
    reqBody:
      | Partial<UserCreateProperties | GroupCreateProperties>
      | UserCreateProperties
      | GroupCreateProperties,
    isUniqueFieldUsed: boolean,
    key: 'create' | 'update'
  ) => {
    const validationInfo = this.validate(reqBody, key);

    if (!validationInfo?.success) {
      throw prepareServiceError(
        HTTP_STATUS.BAD_REQUEST_400,
        'validation error',
        [validationInfo?.error.issues]
      );
    }

    if (isUniqueFieldUsed) {
      throw prepareServiceError(
        HTTP_STATUS.BAD_REQUEST_400,
        'this login already used'
      );
    }
  };

  public uniqueFieldUsed = async (uniqueFieldKey: string, key: string, model: any) => {
    const user = await model.findAll({
      where: {
        [key]: {
          [Op.like]: uniqueFieldKey as string,
        },
      },
    });

    return user.length > 0;
  };
}

export const userValidator = new Validator(userValidationSchema);
export const groupValidator = new Validator(groupValidationSchema);
