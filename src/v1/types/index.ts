import Joi, { string } from 'joi';
import { groupModel, userModel } from '../models';
// import groupModel from '../models/groupModel';
// import userModel from '../models/userModel';

export const premisionTypes = [
  'READ',
  'WRITE',
  'DELETE',
  'SHARE',
  'UPLOAD_FILES',
] as const;

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

export type SafelyMergedObject<T, U> = Omit<U, keyof T> & {
  [K in keyof T]: K extends keyof U
    ? [U[K], T[K]] extends [object, object]
      ? SafelyMergedObject<T[K], U[K]>
      : T[K]
    : T[K];
} extends infer O
  ? { [K in keyof O]: O[K] }
  : never;

export type UserBodyRequest = Partial<
  Omit<
    SafelyMergedObject<User, { group: string[] }>,
    'user_id' | 'isDeleted'
  >
>;

export type UserModel = typeof userModel;
export type GroupModel = typeof groupModel;
export type Models = UserModel | GroupModel;
