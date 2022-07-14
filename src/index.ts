import express, { Application } from 'express';
import { Sequelize } from 'sequelize';

import appConfig from './config';
import userRouter from './v1/routers/userRouter';

class App<T extends typeof appConfig> {
  public appDB: Sequelize | undefined;
  public app: Application;

  private config: T;

  constructor(config: T) {
    this.app = express();
    this.config = config;
  }

  public initApp = () => {
    this.initLoaders();    

    return this;
  };

  private initLoaders = async () => {
    await this.initDB();
    console.log('$$$$$$$$$$$$$$$$$$$$$$$$$$', this.appDB);
    console.log('Database initialised!');
    this.initExpress();
    console.log('Express initialised!');
  };

  private initDB = async () => {
    const { database, username, password, host, dialect } = this.config.db;
    this.appDB = new Sequelize(database, username, password, {
      host,
      dialect,
    });
  };

  private initExpress = () => {
    this.app.use(express.json());
    this.app.use('/v1/user', userRouter);

    this.app.listen(this.config.express.port, () => {
      console.log(`Server is started on port ${this.config.express.port}`);
    });
  };
}

const { app, appDB } = new App(appConfig).initApp() as {
  app: Application;
  appDB: Sequelize;
};

export { app, appDB };
