import { Sequelize } from 'sequelize';
import { dbConfig } from '../../config';
import { groupModel, userGroup, userModel } from '../../v1/models';

export const userDB = new Sequelize(
  dbConfig.database,
  dbConfig.username,
  dbConfig.password,
  {
    host: dbConfig.host,
    dialect: dbConfig.dialect,
    pool: dbConfig.pool,
  }
);

export const startUserDB = async () => {
  try {
    await userDB.authenticate();
    await groupModel.sync({force: true});
    await userModel.sync({force: true});
    await userGroup.sync({force: true});
    await userDB.sync({force: true});
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};
