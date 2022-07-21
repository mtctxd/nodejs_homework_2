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
} from "sequelize";
import { appDB } from "../../loaders/appDB";

import { Premission, Group } from "../types";
import { UserModel } from "./userModel";

export type GroupCreationAttributes = Optional<Group, "group_id">;

export class GroupModel extends Model<Group, GroupCreationAttributes> {
  declare group_id: string;
  declare name: string;
  declare premissions: Premission[];

  declare getUserModels: BelongsToManyGetAssociationsMixin<UserModel>; // Note the null assertions!
  declare addUserModel: BelongsToManyAddAssociationMixin<UserModel, GroupModel>;
  declare addUserModels: BelongsToManyAddAssociationsMixin<
    UserModel,
    GroupModel
  >;
  declare setUserModels: BelongsToManySetAssociationsMixin<UserModel, string>;
  declare removeUserModel: BelongsToManyRemoveAssociationMixin<
    UserModel,
    string
  >;
  declare removeUserrModel: BelongsToManyRemoveAssociationsMixin<
    UserModel,
    string
  >;
  declare hasUserModel: BelongsToManyHasAssociationMixin<UserModel, string>;
  declare hasUserrModel: BelongsToManyHasAssociationsMixin<UserModel, string>;
  declare countUserrModel: BelongsToManyCountAssociationsMixin;
  declare createUserModel: BelongsToManyCreateAssociationMixin<UserModel>;

  declare users?: NonAttribute<UserModel[]>;

  declare static associations: {
    users: Association<GroupModel, UserModel>;
  };
}

GroupModel.init(
  {
    group_id: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
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
    tableName: "groups",
  }
);
