import { Router } from 'express';
import { userController } from '../controllers';

const userRouter = Router();



(async () => {
  userRouter.get('/', (...args) => userController.getAll(...args));
  userRouter.get('/:id', (...args) => userController.getByID(...args));
  userRouter.post('/', (...args) => userController.create(...args));
  userRouter.put('/:id', (...args) => userController.update(...args));
  userRouter.delete('/:id', (...args) => userController.delete(...args));
})();

export default userRouter;
