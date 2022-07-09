import { NextFunction, Request, Response, Router } from 'express';
import { User } from '../../types';
import Joi from 'joi';
import Validator from '../../middlewares/Valiadtor';
import userControler from '../../config/controllers/UserController';
import userValidator from '../../middlewares/Valiadtor';

const router = Router();

router.get('/', userControler.getAll());

router.get('/:id', userControler.getById());

router.post('/', userControler.createUser());

router.put('/', userControler.updateUser());

router.delete('/', userControler.deleteUser());

export default router;
