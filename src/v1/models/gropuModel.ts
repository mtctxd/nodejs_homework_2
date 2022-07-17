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

import { Premission, Group } from '../types';
import { UserModel } from './userModel';

export type GroupCreationAttributes = Optional<Group, 'id' | 'group_id'>;

export class GroupModel extends Model<Group, GroupCreationAttributes> {
  declare id: number;
  declare group_id: string;
  declare name: string;
  declare premissions: Premission[];

  declare getUsers: HasManyGetAssociationsMixin<UserModel>; // Note the null assertions!
  declare addUser: HasManyAddAssociationMixin<UserModel, number>;
  declare addUsers: HasManyAddAssociationsMixin<UserModel, number>;
  declare setUsers: HasManySetAssociationsMixin<UserModel, number>;
  declare removeUser: HasManyRemoveAssociationMixin<UserModel, number>;
  declare removeUsers: HasManyRemoveAssociationsMixin<UserModel, number>;
  declare hasUser: HasManyHasAssociationMixin<UserModel, number>;
  declare hasUsers: HasManyHasAssociationsMixin<UserModel, number>;
  declare countUsers: HasManyCountAssociationsMixin;
  // declare createUser: HasManyCreateAssociationMixin<UserModel, 'ownerId'>;

  declare users?: NonAttribute<UserModel[]>;

  declare static associations: {
    users: Association<UserModel, UserModel>;
  };
}

GroupModel.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    group_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    premissions: {
      type: DataTypes.JSON,
      allowNull: false,
    },
  },
  {
    sequelize: appDB,
    tableName: 'groups',
  }
);
