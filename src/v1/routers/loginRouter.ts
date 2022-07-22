import { Router } from "express";
import dotenv from "dotenv";
import authController from "../controllers/authController";

dotenv.config();

const loginRouter = Router();

(async () => {
  loginRouter.post("/login", (req, res) => authController.login(req, res));
  loginRouter.post("/register", (req, res) =>
    authController.register(req, res)
  );
})();

export default loginRouter;
