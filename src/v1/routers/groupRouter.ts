import { Router } from 'express';
import { groupController } from '../controllers';

const groupRouter = Router();

(async () => {
  groupRouter.get('/', (...args) => groupController.getAll(...args));
  groupRouter.get('/:id', (...args) => groupController.getByID(...args));
  groupRouter.post('/', (...args) => groupController.create(...args));
  groupRouter.put('/:id', (...args) => groupController.update(...args));
  groupRouter.delete('/:id', (...args) => groupController.delete(...args));
})();

export default groupRouter;
