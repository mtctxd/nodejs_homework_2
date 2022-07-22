import { DataTypes, Model } from "sequelize";
import { appDB } from "../../loaders/appDB";
import { GroupModel } from "./groupModel";
import { UserModel } from "./userModel";

export class UserGroupModel extends Model {
  declare id: number;
  declare group_id: string;
  declare user_id: string;
}

UserGroupModel.init(
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
    user_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize: appDB,
    tableName: "user_group",
  }
);

UserModel.belongsToMany(GroupModel, {
  through: UserGroupModel,
  foreignKey: "user_id",
  otherKey: "group_id",
});
GroupModel.belongsToMany(UserModel, {
  through: UserGroupModel,
  foreignKey: "group_id",
  otherKey: "user_id",
});