import { HTTP_STATUS } from '../types';
import { ServiceError } from '../v1/types';

export const prepareServiceError = (code: HTTP_STATUS, message: string, data: any[] = []) => {
  const error: ServiceError = {
    status: code,
    info: {
      message,
      data,
    },
  };

  return error;
};
