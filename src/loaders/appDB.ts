import { Sequelize } from 'sequelize';
import appConfig from '../config';
import { appLogger } from '../feature/logger';
import { LoggingTypes } from '../v1/types';

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
    appLogger.log(
      LoggingTypes.Info,
      'Connection has been established successfully.'
    );
  } catch (error) {
    throw error;
  }
};
