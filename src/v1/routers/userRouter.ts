import { Router } from "express";
import { userController } from "../controllers";

const userRouter = Router();

(async () => {
  userRouter.get("/", (req, res) => userController.getAll(req, res));
  userRouter.get("/:id", (req, res) => userController.getByID(req, res));
  userRouter.post("/", (req, res) => userController.create(req, res));
  userRouter.put("/:id", (req, res) => userController.update(req, res));
  userRouter.delete("/:id", (req, res) => userController.delete(req, res));
})();

export default userRouter;
