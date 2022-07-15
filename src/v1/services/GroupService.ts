import Service from './service';
import { groupValidaror, userValidator } from '../middlewares/validator/Validator';
import { GroupCreateProperties, UserCreateProperties } from '../types';
import { GroupModel } from '../models/gropuModel';

class GroupService<
  T extends typeof GroupModel,
  V extends typeof groupValidaror,
  U extends GroupCreateProperties
> extends Service<T, V, U> {}

export const groupService = new GroupService(GroupModel, groupValidaror, 'name');
