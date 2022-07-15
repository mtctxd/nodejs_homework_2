import { DataTypes, Model, Optional } from 'sequelize';
import { appDB } from '../../loaders/appDB';

import { Premission, Group } from '../types';

export type GroupCreationAttributes = Optional<Group, 'id'>;

export class GroupModel extends Model<Group, GroupCreationAttributes> {
  declare id: number;
  declare group_id: string;
  declare name: string;
  declare premissions: Premission[];
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
