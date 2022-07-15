import { Router } from 'express';
import { groupController } from '../controllers';

const groupRouter = Router();

(async () => {
  groupRouter.get('/', groupController.getAll);
  groupRouter.get('/:id', groupController.getByID);
  groupRouter.post('/', groupController.create);
  groupRouter.put('/:id', groupController.update);
  groupRouter.delete('/:id', groupController.delete);
})();

export default groupRouter;
