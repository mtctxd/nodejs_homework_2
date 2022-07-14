import { DataTypes, Model, Optional } from 'sequelize';
import { appDB } from '../../loaders/appDB';

import { User } from '../types';

export type UserCreationAttributes = Optional<User, 'id' | 'is_deleted'>;

export class UserModel extends Model<User, UserCreationAttributes> {
  declare id: number;
  declare user_id: string;
  declare login: string;
  declare password: string;
  declare age: number;
  declare is_deleted: boolean;
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
