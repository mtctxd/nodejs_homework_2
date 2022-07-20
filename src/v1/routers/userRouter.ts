import { Router } from 'express';
import { userController } from '../controllers';

const userRouter = Router();



(async () => {
  userRouter.get('/', userController.getAll.bind(userController));
  userRouter.get('/:id', userController.getByID.bind(userController));
  userRouter.post('/', userController.create.bind(userController));
  userRouter.put('/:id', userController.update.bind(userController));
  userRouter.delete('/:id', userController.delete.bind(userController));
})();

export default userRouter;
