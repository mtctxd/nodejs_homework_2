import Joi from 'joi';
import userModel from '../models/userModel';

export interface User {
  id: string;
  login: string;
  password: string;
  age: number;
  isDeleted: boolean;
}

export enum HTTPMethod {
  create = 'create',
  update = 'update',
  delete = 'delete',
}

export type JoiValidatinosSchema<T> = Partial<
  Record<HTTPMethod, Joi.ObjectSchema<T>>
>;

export type UserModel = typeof userModel;
