import { Router } from 'express';
import userCotroller from '../../../controllers/userController';
import UserController from '../../../controllers/userController';
import userValidator from '../../../middlewares/validator';

const userRouter = Router();

userRouter.get('/', userCotroller.getAll);
userRouter.get('/:id', userCotroller.getById);
userRouter.post(
  '/',
  userValidator.validate('create'),
  userCotroller.createUser
);
userRouter.put(
  '/:id',
  userValidator.validate('update'),
  userCotroller.updateUser
);
userRouter.delete('/:id', userCotroller.deleteUser);

export default userRouter;
