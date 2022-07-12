import { NextFunction, Request, Response } from 'express';
import Joi from 'joi';
import {
  Group,
  GroupModel,
  User,
  UserModel,
  ValidationOptions,
} from '../../types';

import { ValidatorSchema } from './schemes';

class Validator<
  T extends ValidatorSchema,
  M extends UserModel | GroupModel,
  U extends ValidationOptions<keyof User | keyof Group>
> {
  public schema: T;
  public model: M;
  public uniqueField?: string;

  constructor(schema: T, model: M, options?: U) {
    this.schema = schema;
    this.model = model;

    if (options?.uniqueField) {
      this.uniqueField = options?.uniqueField;
    }
  }

  private validateBody =
    (validationMethod: Joi.ObjectSchema) =>
    (req: Request, res: Response, next: NextFunction) => {
      const validationResult = validationMethod.validate(req.body);

      if (validationResult.error) {
        const message = this.makeErrorMessages(validationResult.error);

        res.status(400).send(message);
      } else {
        next();
      }
    };

  private validateIfExist =
    (parameterName: string) =>
    async (req: Request, res: Response, next: NextFunction) => {
      const isUserExist = await this.doUserExistAlready(
        req.body[parameterName]
      );

      if (isUserExist) {
        res
          .status(400)
          .send({ message: `this ${this.uniqueField} is already used` });
      } else {
        next();
      }
    };

  private makeErrorMessages = ({ details }: Joi.ValidationError) => {
    return {
      message: details.map(({ message }) => message),
    };
  };

  private doUserExistAlready = async (parameterName: string) => {
    const user = await this.model.findAll({
      where: {
        [this.uniqueField as string]: parameterName,
      },
    });

    return user.length > 0;
  };

  public validate = async (validationType: keyof typeof this.schema) => {
    switch (validationType) {
      case 'create':
        if (this.uniqueField) {
          return [
            this.validateBody(this.schema.create),
            this.validateIfExist(this.uniqueField),
          ];
        } else {
          return this.validateBody(this.schema.create);
        }

      case 'update':
        return this.validateBody(this.schema.update);

      default:
        return (req: Request, res: Response, next: NextFunction) => {
          res.status(400).send({ message: 'bad request' });
        };
    }
  };
}

export default Validator;
