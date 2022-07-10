import * as express from 'express';
import startExpress from './express';
import { startUserDB } from './userDb';

// import express from 'express';
// import startExpress from './express';

// const startServer = async () => {
//   const app = express();

//   await startExpress(app);
// };

// export default startServer;


const initLoaders = async (app: express.Application) => {
    await startUserDB();
    console.log('userDB started seccesfuly');
    await startExpress(app);
    console.log('Express initialized');
}

export default initLoaders;