import { DataTypes } from 'sequelize';
import { userDB } from '../../loaders/userDb';

const groupModel = userDB.define(
  'group',
  {
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
    is_deleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    freezeTableName: true,
    modelName: 'group',
    tableName: 'group',
  }
);

export default groupModel;
