import { Router } from 'express';
import dotenv from 'dotenv';
import authController from '../controllers/authController';

dotenv.config();

const loginRouter = Router();

(async () => {
  loginRouter.post('/login', (req, res) => authController.login(req, res));
})();

export default loginRouter;
