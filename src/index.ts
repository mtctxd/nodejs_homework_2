import express from 'express';
import initServer from './loaders';

const init = async () => {
  const app = express();
  await initServer(app);
};

init();
