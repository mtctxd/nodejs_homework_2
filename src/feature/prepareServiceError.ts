import { HTTP_STATUS, ServiceError } from "../types";

export const prepareServiceError = (
  code: HTTP_STATUS,
  message: string,
  data: unknown = []
) => {
  const error: ServiceError = {
    status: code,
    info: {
      message,
      data,
    },
  };

  return error;
};
