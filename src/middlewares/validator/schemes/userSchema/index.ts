import Joi from 'joi';
import { makeFieldsRequired } from '../helpers';

const passwordRules = {
  errorMessage:
    'password should contain eight characters, at least one uppercase letter, one lowercase letter, one number and one special character',
  regexp:
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
};

const userValidationsField = {
  login: Joi.string().trim().min(6).max(21),
  age: Joi.number().integer().min(4).max(130),
  password: Joi.string()
    .trim()
    .regex(passwordRules.regexp)
    .message(passwordRules.errorMessage),
};

export const userValidationsSchema = {
  update: Joi.object(userValidationsField).options({ abortEarly: false }),
  create: Joi.object(makeFieldsRequired(userValidationsField)).options({
    abortEarly: false,
  }),
};
