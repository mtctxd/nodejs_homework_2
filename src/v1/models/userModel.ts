import { DataTypes } from 'sequelize';
import { userDB } from '../../loaders/userDb';

const userModel = userDB.define(
  'user',
  {
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
      defaultValue: false,
    },
  },
  {
    freezeTableName: true,
    modelName: 'user',
    tableName: 'user',
  }
);

export default userModel;
