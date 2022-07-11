import { NextFunction, Request, Response } from 'express';
import Joi from 'joi';
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
    this.model = userModel;
  }

  private validationMaker =
    (
      validationMethod: Joi.ObjectSchema,
      validationType: keyof typeof this.schema
    ) =>
    (req: Request, res: Response, next: NextFunction) => {
      const validationResult = validationMethod.validate(req.body);

      if (validationResult.error) {
        const message = this.makeErrorMessage(validationResult.error);
        res.status(400).send(message);
      } else {
        if (validationType === 'create') {
          this.declineIfExist(res, req.body.login);
        }
        next();
      }
    };

  private makeErrorMessage = ({ details }: Joi.ValidationError) => {
    return details.map(({ message }) => message);
  };

  private declineIfExist = async (res: Response, login: string) => {
    const isUserExist = await this.model.findAll({
      where: {
        login: login,
      },
    });

    if (isUserExist) {
      res.status(400).send({ message: 'this login already used' });
    }
  };

  public validate = (validationType: keyof typeof this.schema) => {
    switch (validationType) {
      case 'create':
        return this.validationMaker(this.schema.create, validationType);

      case 'update':
        return this.validationMaker(this.schema.update, validationType);

      default:
        return (req: Request, res: Response, next: NextFunction) => {
          res.status(400).send({ message: 'bad request' });
        };
    }
  };
}

const userValidator = new Validator(userValidationsSchemas, userModel);

export default userValidator;
