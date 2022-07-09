import { NextFunction, Request, Response } from 'express';
import Joi from 'joi';
import {
    ServerCallback,
  User,
  ValidatorMethods,
  ValidatorOptions,
} from '../../types';

export class Validator<T> {
  private method: ValidatorMethods<T>;

  constructor(options: ValidatorOptions<T>) {
    this.method = {};
    this.method.create = options.create;
    this.method.update = options.update;
  }

  /**
   * Bad code, dont look. Need to spit logic. Probably validator should not send error
   * @param  {ServerCallback} serverCallback
   * @param  {any} validationSchema
   */
  private validateUserCallback(
    serverCallback: ServerCallback,
    validationSchema: any
  ) {
    const { req, res, next } = serverCallback;
    const userData = validationSchema.validate(req.body);

    if (userData?.error) {
      res.status(404).send({ message: userData.error?.details[0].message });
    } else {
      next();
    }
  }
  /**
   * not shure if i what i need to send if no matches...
   * probably should be better type notation
   * @param  {keyoftypeofthis.method} validatorWithMethod
   */
  validate(validatorWithMethod: keyof typeof this.method) {
    return (req: Request, res: Response, next: NextFunction) => {
      const serverCallback: ServerCallback = { req, res, next };
      switch (validatorWithMethod) {
        case 'create':
          this.validateUserCallback(serverCallback, this.method.create);
          break;

        case 'update':
          this.validateUserCallback(serverCallback, this.method.update);
          break;

        default:
          console.error('uncorrect scheme validation');

          res.status(500).send({ message: 'server error' });
          break;
      }
    };
  }
}

const userValidator = new Validator<User>({
  create: Joi.object().keys({
    login: Joi.string().min(6).max(18).required(),
    password: Joi.string().min(6).max(32).required(),
    age: Joi.number().min(7).max(110).required(),
  }),
  update: Joi.object().keys({
    id: Joi.number().integer().required(),
    login: Joi.string().min(6).max(18),
    password: Joi.string().min(6).max(32),
    age: Joi.number().min(7).max(110),
  }),
  delete: Joi.object().keys({
    id: Joi.number().integer().required()
  })
});

export default userValidator;
