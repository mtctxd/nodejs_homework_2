import { NextFunction, Request, Response } from 'express';
import { Logger } from 'winston';
import { HTTP_STATUS } from '../types';
import { LoggingTypes } from '../v1/types';

function ErrorCatchable() {
  return function (
    object: object,
    propertyName: string,
    descriptor: PropertyDescriptor
  ): void {
    const originalFunction = descriptor.value;
    descriptor.value = async function (
      req: Request,
      res: Response,
      next: NextFunction
    ) {
      const { logger } = this as { logger: Logger };
      const params_passed = {
        query: req.query,
        body: req.body,
        params: req.params,
      }

      try {
        await originalFunction.call(this, req, res, next);
        logger.log(LoggingTypes.Info, {
          service_method: propertyName,
          params_passed,
        });
      } catch (error) {
        logger.error(LoggingTypes.Error, {
          type: 'controller error',
          service_method: propertyName,
          params_passed,
          error_data: JSON.stringify(error),
        });
        res
          .status(
            HTTP_STATUS.BAD_REQUEST_400 || HTTP_STATUS.INTERNAL_SERVER_ERROR_500
          )
          .send({ message: 'Bad Request', details: error });
      }
    };
  };
}

export default ErrorCatchable;
