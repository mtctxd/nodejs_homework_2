import { DataTypes } from 'sequelize';
import { userDB } from '../../loaders/userDb';

export const groupModel = userDB.define(
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
  },
  {
    freezeTableName: true,
    modelName: 'group',
    tableName: 'group',
  }
);

export const userModel = userDB.define(
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

export const userGroup = userDB.define(
  'user_group',
  {
    user_id: {
      type: DataTypes.STRING,
    },
    group_id: {
      type: DataTypes.STRING,
    },
  },
  {
    timestamps: false,
  }
);

userModel.belongsToMany(groupModel, {
  through: userGroup,
  foreignKey: 'user_id',
});
groupModel.belongsToMany(userModel, {
  through: userGroup,
  foreignKey: 'group_id',
});
