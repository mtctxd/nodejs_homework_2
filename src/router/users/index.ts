import { NextFunction, Request, Response, Router } from 'express';
import { User } from '../../types';
import Joi from 'joi';
import Validator from '../../middlewares/Valiadtor';
import userControler from '../../controllers/UserController';
import userValidator from '../../middlewares/Valiadtor';

const router = Router();

router.get('/', userControler.getAll());

router.get('/:id', userControler.getById());

router.post('/', userControler.createUser());

router.put('/:id', userControler.updateUser());

router.delete('/:id', userControler.deleteUser());

export default router;
