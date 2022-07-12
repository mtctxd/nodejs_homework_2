import Joi, { string } from 'joi';
import groupModel from '../models/groupModel';
import userModel from '../models/userModel';

export const premisionTypes = ['READ', 'WRITE', 'DELETE', 'SHARE', 'UPLOAD_FILES'] as const;

export type Premission = typeof premisionTypes[number];

export interface User {
  user_id: string;
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
  group_id: string;
  name: string;
  premissions: Array<Premission>;
};

export type ValidationOptions<T> = {
  uniqueField: T;
};

export type JoiValidatinosSchema<T> = Partial<
  Record<HTTPMethod, Joi.ObjectSchema<T>>
>;

export type UserModel = typeof userModel;
export type GroupModel = typeof groupModel;
export type Models = UserModel | GroupModel;
