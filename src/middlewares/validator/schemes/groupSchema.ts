import Joi from "joi";
import { makeFieldsRequired } from "./helpers";
  
  const groupValidationsField = {
    name: Joi.string().trim().min(6).max(21),
    age: Joi.number().integer().min(4).max(130),
  };

export const groupValidationsSchema = {
    update: Joi.object(groupValidationsField).options({ abortEarly: false }),
    create: Joi.object(makeFieldsRequired(groupValidationsField)).options({
      abortEarly: false,
    }),
};