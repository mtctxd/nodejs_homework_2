import Joi, { string } from 'joi';
import groupModel from '../models/groupModel';
import userModel from '../models/userModel';

export type Premission = 'READ' | 'WRITE' | 'DELETE' | 'SHARE' | 'UPLOAD_FILES';

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

export type Group = {
  id: string;
  name: string;
  premissions: Array<Premission>;
};

export type ValidationOptions<T> = {
  uniqueField: T
}

export type JoiValidatinosSchema<T> = Partial<
  Record<HTTPMethod, Joi.ObjectSchema<T>>
>;

export type UserModel = typeof userModel;
export type GroupModel = typeof groupModel;
export type Models = UserModel | GroupModel;
