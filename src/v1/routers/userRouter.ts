import { Router } from "express";
import { userController } from "../controllers";

const userRouter = Router();

(async () => {
    userRouter.get('/', userController.getAll)
    userRouter.get('/:id', userController.getByID)
    userRouter.post('/', userController.create);
    userRouter.put('/:id', userController.update);
    userRouter.delete('/:id', userController.delete);
})()

export default userRouter;