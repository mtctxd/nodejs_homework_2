import { DataTypes } from 'sequelize';
import { userDB } from '../../loaders/userDb';

const userModel = userDB.define(
  'user',
  {
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
