import { Router } from "express";
import userCotroller from "../../../controllers/userController";
import UserController from "../../../controllers/userController";

const userRouter = Router();


userRouter.get('/', userCotroller.getAll);
userRouter.get('/:id', userCotroller.getById);
userRouter.post('/', userCotroller.createUser);
userRouter.put('/:id', userCotroller.updateUser);
userRouter.delete('/:id', userCotroller.deleteUser);

export default userRouter;