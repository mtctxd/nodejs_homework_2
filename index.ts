import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import router from './src/router/users';

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.use(express.json())
app.use('/users', router);

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});
