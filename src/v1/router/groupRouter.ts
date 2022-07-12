import { Router } from 'express';
import { groupController } from '../controllers/Controller';
import { groupValidator } from '../middlewares/validator/GroupValidator';

const groupRouter = Router();

(async () => {
  groupRouter.get('/', groupController.getAll);
  groupRouter.get('/:id', groupController.getById);
  groupRouter.post(
    '/',
    await groupValidator.validate('create'),
    groupController.createUser
  );
  groupRouter.put(
    '/:id',
    await groupValidator.validate('update'),
    groupController.updateUser
  );
  groupRouter.delete('/:id', groupController.deleteUser);
})();

export default groupRouter;
