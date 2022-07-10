import { Sequelize } from 'sequelize';
import { dbConfig } from '../../config';

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
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};
