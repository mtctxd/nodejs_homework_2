import { NextFunction, Request, Response } from 'express';
import Joi from 'joi';

export interface User {
  id: number;
  login: string;
  password: string;
  age: number;
  isDeleted: boolean;
}

export type ValidatorOptions<T> = {
  create?: Joi.ObjectSchema<T>;
  update?: Joi.ObjectSchema<T>;
};

export type ValidatorMethods<T> = {
  create?: Joi.ObjectSchema<T>;
  update?: Joi.ObjectSchema<T>;
};

export type ServerCallback =  {
  req: Request,
  res: Response,
  next: NextFunction
};
