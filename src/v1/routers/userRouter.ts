import { Router } from "express";
import { userController } from "../controllers";

const userRouter = Router();

(async () => {
    userRouter.get('/', userController.getAll)
    userRouter.get('/:id', userController.getByID)
    userRouter.post('/', userController.create)
})()

export default userRouter;