import { DataTypes } from 'sequelize/types';
import { userDB } from '../loaders/userDb';

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
      type: DataTypes.STRING,
      allowNull: true,

      get() {
        return this.getDataValue('favColors').split(';');
      },
      set(val: string[]) {
        this.setDataValue('favColors', val.join(';'));
      },
    },
  },
  {
    freezeTableName: true,
    modelName: 'user',
    tableName: 'user',
  }
);

export default groupModel;
