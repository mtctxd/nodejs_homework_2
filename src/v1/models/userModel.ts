import {
  Association,
  BelongsToManyAddAssociationMixin,
  BelongsToManyAddAssociationsMixin,
  DataTypes,
  BelongsToManyCountAssociationsMixin,
  BelongsToManyCreateAssociationMixin,
  BelongsToManyGetAssociationsMixin,
  BelongsToManyHasAssociationMixin,
  BelongsToManyHasAssociationsMixin,
  BelongsToManyRemoveAssociationMixin,
  BelongsToManyRemoveAssociationsMixin,
  BelongsToManySetAssociationsMixin,
  Model,
  NonAttribute,
  Optional,
} from 'sequelize';
import { appDB } from '../../loaders/appDB';

import { User } from '../types';
import { GroupModel } from './groupModel';

export type UserCreationAttributes = Optional<User, 'id' | 'is_deleted'>;

export class UserModel extends Model<User, UserCreationAttributes> {
  declare id: number;
  declare user_id: string;
  declare login: string;
  declare password: string;
  declare age: number;
  declare is_deleted: boolean;

  declare getGroupModels: BelongsToManyGetAssociationsMixin<GroupModel>; // Note the null assertions!
  declare addGroupModel: BelongsToManyAddAssociationMixin<GroupModel, UserModel>;
  declare addGroupModels: BelongsToManyAddAssociationsMixin<GroupModel, UserModel>;
  declare setGroupModels: BelongsToManySetAssociationsMixin<GroupModel, string>;
  declare removeGroupModel: BelongsToManyRemoveAssociationMixin<GroupModel, string>;
  declare removeGroupModels: BelongsToManyRemoveAssociationsMixin<GroupModel, string>;
  declare hasGroupModel: BelongsToManyHasAssociationMixin<GroupModel, string>;
  declare hasGroupModels: BelongsToManyHasAssociationsMixin<GroupModel, string>;
  declare countGroupModels: BelongsToManyCountAssociationsMixin;
  declare createGroupModel: BelongsToManyCreateAssociationMixin<GroupModel>;

  declare groups?: NonAttribute<GroupModel[]>;

  declare static associations: {
    groups: Association<UserModel, GroupModel>;
  };
}

UserModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    login: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    is_deleted: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  {
    sequelize: appDB,
    tableName: 'users',
  }
);
