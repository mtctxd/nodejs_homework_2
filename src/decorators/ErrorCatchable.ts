import { NextFunction, Request, Response } from 'express';
import { Logger } from 'winston';
import {
  ErrorCatchableMetadata,
  ErrorCatchableTypes,
  HTTP_STATUS,
  ServiceError,
} from '../types';
import { LoggingTypes } from '../v1/types';

function ErrorCatchable(
  metadata?: ErrorCatchableMetadata
): (
  object: object,
  propertyName: string,
  descriptor: PropertyDescriptor
) => void {
  switch (metadata?.type) {
    case ErrorCatchableTypes.AUTH:
      return processStandartError;

    default:
      return processStandartError;
  }
}

function processStandartError(
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
      body: {
        ...req.body,
        password: '...',
      },
      params: req.params,
    };

    console.log(params_passed);

    try {
      const startTime = performance.now();

      console.log(req.body.password);
      const { code } = await originalFunction.call(this, req, res, next);

      const endTime = performance.now();

      logger.log(LoggingTypes.Info, {
        satus_code: code,
        service_method: propertyName,
        params_passed,
        time_to_process: (endTime - startTime).toFixed(3),
      });
    } catch (error) {
      const customError = error as ServiceError;
      logger.error(LoggingTypes.Error, {
        type: 'controller_error',
        service_method: propertyName,
        params_passed,
        error_data: JSON.stringify(error),
      });

      res
        .status(customError.status || HTTP_STATUS.INTERNAL_SERVER_ERROR_500)
        .send(error);
    }
  };
}

export default ErrorCatchable;
