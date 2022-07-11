import { NextFunction, Request, RequestHandler, Response } from 'express';
import Joi, { valid } from 'joi';
import userModel from '../../models/userModel';
import { UserModel } from '../../types';

const passwordRules = {
  errorMessage:
    'password should contain eight characters, at least one uppercase letter, one lowercase letter, one number and one special character',
  regexp:
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
};

const userValidationsField = {
  login: Joi.string().trim().min(6).max(21),
  age: Joi.number().integer().min(4).max(130),
  password: Joi.string()
    .trim()
    .regex(passwordRules.regexp)
    .message(passwordRules.errorMessage),
};

const makeFieldsRequired = (scheme: typeof userValidationsField) => {
  return Object.entries(scheme).reduce((acc, [key, value]) => {
    return {
      ...acc,
      [key]: value.required(),
    };
  }, {});
};

const userValidationsSchemas = {
  update: Joi.object(userValidationsField).options({ abortEarly: false }),
  create: Joi.object(makeFieldsRequired(userValidationsField)).options({
    abortEarly: false,
  }),
};

class Validator {
  private schema: typeof userValidationsSchemas;
  private model: UserModel;

  constructor(schema: typeof userValidationsSchemas, model: UserModel) {
    this.schema = schema;
    this.model = model;
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

  private validateIfExist = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const isUserExist = await this.doUserExistAlready(req.body.login);

    if (isUserExist) {
      res.status(400).send({ message: 'this login already used' });
    } else {
      next();
    }
  };

  private makeErrorMessages = ({ details }: Joi.ValidationError) => {
    return {
      message: details.map(({ message }) => message),
    };
  };

  private doUserExistAlready = async (login: string) => {
    const user = await this.model.findAll({
      where: {
        login: login,
      },
    });

    return user.length > 0;
  };

  public validate = async (validationType: keyof typeof this.schema) => {
    switch (validationType) {
      case 'create':
        return [this.validateBody(this.schema.create), this.validateIfExist];

      case 'update':
        return this.validateBody(this.schema.update);

      default:
        return (req: Request, res: Response, next: NextFunction) => {
          res.status(400).send({ message: 'bad request' });
        };
    }
  };
}

const userValidator = new Validator(userValidationsSchemas, userModel);

export default userValidator;
