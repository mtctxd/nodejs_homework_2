import Joi from 'joi';
import { premisionTypes } from '../../../types';
import { makeFieldsRequired } from './helpers';

const groupValidationsField = {
  name: Joi.string().trim().min(6).max(21),
  premissions: Joi.array().items(Joi.string().valid(...premisionTypes)),
};

export const groupValidationsSchema = {
  update: Joi.object(groupValidationsField).options({ abortEarly: false }),
  create: Joi.object(makeFieldsRequired(groupValidationsField)).options({
    abortEarly: false,
  }),
};
