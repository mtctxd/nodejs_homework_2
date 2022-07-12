import { Router } from 'express';
import { userController } from '../../../controllers';
import { userValidator } from '../../../middlewares/validator/UserValidator';

const userRouter = Router();

(async () => {
  userRouter.get('/', userController.getAll);
  userRouter.get('/:id', userController.getById);
  userRouter.post(
    '/',
    await userValidator.validate('create'),
    userController.createUser
  );
  userRouter.put(
    '/:id',
    await userValidator.validate('update'),
    userController.updateUser
  );
  userRouter.delete('/:id', userController.deleteUser);
})();

export default userRouter;
