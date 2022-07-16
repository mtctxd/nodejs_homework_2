import { DataTypes, Model, Optional } from 'sequelize';
import { appDB } from '../../loaders/appDB';
import { GroupModel } from './gropuModel';
import { UserModel } from './userModel';

export class UserGroupModel extends Model {
  declare id: number;
  declare group_id: string;
  declare user_id: string;
}

UserGroupModel.init(
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
    user_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize: appDB,
    tableName: 'user_group'
  }
);

UserModel.belongsToMany(GroupModel, {through: UserGroupModel});
GroupModel.belongsToMany(UserModel, {through: UserGroupModel});
