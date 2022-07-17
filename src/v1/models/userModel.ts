import {
  Association,
  DataTypes,
  HasManyAddAssociationMixin,
  HasManyAddAssociationsMixin,
  HasManyCountAssociationsMixin,
  HasManyCreateAssociationMixin,
  HasManyGetAssociationsMixin,
  HasManyHasAssociationMixin,
  HasManyHasAssociationsMixin,
  HasManyRemoveAssociationMixin,
  HasManyRemoveAssociationsMixin,
  HasManySetAssociationsMixin,
  Model,
  NonAttribute,
  Optional,
} from 'sequelize';
import { appDB } from '../../loaders/appDB';

import { User } from '../types';
import { GroupModel } from './gropuModel';

export type UserCreationAttributes = Optional<User, 'id' | 'is_deleted'>;

export class UserModel extends Model<User, UserCreationAttributes> {
  declare id: number;
  declare user_id: string;
  declare login: string;
  declare password: string;
  declare age: number;
  declare is_deleted: boolean;

  declare getGroups: HasManyGetAssociationsMixin<GroupModel>; // Note the null assertions!
  declare addGroup: HasManyAddAssociationMixin<GroupModel, number>;
  declare addGroups: HasManyAddAssociationsMixin<GroupModel, number>;
  declare setGroups: HasManySetAssociationsMixin<GroupModel, number>;
  declare removeGroup: HasManyRemoveAssociationMixin<GroupModel, number>;
  declare removeGroups: HasManyRemoveAssociationsMixin<GroupModel, number>;
  declare hasGroup: HasManyHasAssociationMixin<GroupModel, number>;
  declare hasGroups: HasManyHasAssociationsMixin<GroupModel, number>;
  declare countGroups: HasManyCountAssociationsMixin;
  // declare createGroup: HasManyCreateAssociationMixin<GroupModel, 'ownerId'>;

  declare groups?: NonAttribute<GroupModel[]>;

  declare static associations: {
    groups: Association<UserModel, GroupModel>;
  };
}

UserModel.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
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
