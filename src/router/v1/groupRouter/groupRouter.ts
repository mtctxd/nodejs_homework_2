import { Router } from 'express';
import { groupController } from '../../../controllers';

const groupRouter = Router();

(async () => {
  groupRouter.get('/', groupController.getAll);
  groupRouter.get('/:id', groupController.getById);
  groupRouter.post(
    '/',
    // await userValidator.validate('create'),
    groupController.createUser
  );
  groupRouter.put(
    '/:id',
    // await userValidator.validate('update'),
    groupController.updateUser
  );
  groupRouter.delete('/:id', groupController.deleteUser);
})();

export default groupRouter;
