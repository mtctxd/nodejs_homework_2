import { NextFunction, Request, Response } from 'express';
import { HTTP_STATUS } from '../types';

function ErrorCatchable() {
  return function (
    object: Object,
    propertyName: string,
    descriptor: PropertyDescriptor
  ): void {
    const originalFunction = descriptor.value;
    descriptor.value = async function (
      req: Request,
      res: Response,
      next: NextFunction
    ) {
      try {
        await originalFunction.call(this, req, res, next);
      } catch (error) {
        console.error({
          type: 'controller error',
          info: JSON.stringify(error),
        });
        res
          .status(HTTP_STATUS.BAD_REQUEST_400)
          .send({ message: 'Bad Request', details: error });
      }
    };
  };
}

export default ErrorCatchable;
