import { Router } from 'express';
import { groupController } from '../controllers';

const groupRouter = Router();

(async () => {
  groupRouter.get('/', groupController.getAll.bind(groupController));
  groupRouter.get('/:id', groupController.getByID.bind(groupController));
  groupRouter.post('/', groupController.create.bind(groupController));
  groupRouter.put('/:id', groupController.update.bind(groupController));
  groupRouter.delete('/:id', groupController.delete.bind(groupController));
})();

export default groupRouter;
