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

import { Premission, Group } from '../types';
import { UserModel } from './userModel';

export type GroupCreationAttributes = Optional<Group, 'id' | 'group_id'>;

export class GroupModel extends Model<Group, GroupCreationAttributes> {
  declare id: number;
  declare group_id: string;
  declare name: string;
  declare premissions: Premission[];

  declare getUsers: BelongsToManyGetAssociationsMixin<UserModel>; // Note the null assertions!
  declare addUser: BelongsToManyAddAssociationMixin<UserModel, any>;
  declare addUsers: BelongsToManyAddAssociationsMixin<UserModel, string>;
  declare setUsers: BelongsToManySetAssociationsMixin<UserModel, string>;
  declare removeUser: BelongsToManyRemoveAssociationMixin<UserModel, string>;
  declare removeUsers: BelongsToManyRemoveAssociationsMixin<UserModel, string>;
  declare hasUser: BelongsToManyHasAssociationMixin<UserModel, string>;
  declare hasUsers: BelongsToManyHasAssociationsMixin<UserModel, string>;
  declare countUsers: BelongsToManyCountAssociationsMixin;
  declare createUser: BelongsToManyCreateAssociationMixin<UserModel>;

  declare users?: NonAttribute<UserModel[]>;

  declare static associations: {
    users: Association<GroupModel, UserModel>;
  };
}

GroupModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
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
