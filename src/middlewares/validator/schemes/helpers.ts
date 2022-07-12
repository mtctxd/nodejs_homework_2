import Joi from 'joi';
import { validationShcemes, ValidatorSchema } from '.';

export const makeFieldsRequired: any = (
  scheme: ValidatorSchema
): Joi.ObjectSchema<any> => {
  return Object.entries(scheme).reduce((acc, [key, value]: [string, any]) => {
    return {
      ...acc,
      [key]: value.required(),
    };
  }, {} as Joi.ObjectSchema);
};
