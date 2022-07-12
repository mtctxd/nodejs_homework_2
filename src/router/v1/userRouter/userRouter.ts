import { Router } from 'express';
import userCotroller from '../../../controllers/userController';
import { userValidator } from '../../../middlewares/validator/UserValidator';

const userRouter = Router();

(async () => {
  userRouter.get('/', userCotroller.getAll);
  userRouter.get('/:id', userCotroller.getById);
  userRouter.post(
    '/',
    await userValidator.validate('create'),
    userCotroller.createUser
  );
  userRouter.put(
    '/:id',
    await userValidator.validate('update'),
    userCotroller.updateUser
  );
  userRouter.delete('/:id', userCotroller.deleteUser);
})();

export default userRouter;
