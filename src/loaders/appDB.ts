import { Sequelize } from 'sequelize';
import appConfig from '../config';

const { database, username, password, host, dialect } = appConfig.db;

export const appDB = new Sequelize(database, username, password, {
  host,
  dialect,
  logging: false,
});

export const initDB = async () => {
    try {
        await appDB.authenticate();
        await appDB.sync();
        console.log('Connection has been established successfully.');
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }
};
