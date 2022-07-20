import { createLogger, format, transports } from 'winston';
import dotenv from 'dotenv';

import { LoggingTypes } from '../v1/types';

dotenv.config();

export const logerCreator = (serviceName: string) => {
  let logger = createLogger({
    level: 'info',
    format: format.combine(
      format.timestamp({
        format: 'YYYY-MM-DD HH:mm:ss',
      }),
      format.errors({ stack: true }),
      format.splat(),
      format.json()
    ),
    defaultMeta: { service: serviceName },
    transports: [
      new transports.File({
        filename: `./logs/${serviceName}/error.txt`,
        level: LoggingTypes.Error,
      }),
      new transports.File({
        filename: `./logs/${serviceName}/combined.txt`,
        level: LoggingTypes.Info,
      }),
    ],
  });

  if (process.env.NODE_ENV !== 'production') {
    logger.add(
      new transports.Console({
        format: format.combine(format.colorize(), format.simple()),
      })
    );
  }

  return logger;
};