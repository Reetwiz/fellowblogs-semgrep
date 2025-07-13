import { NextFunction, Request, Response } from 'express';
import path from 'path';
import winston, { format, transports } from 'winston';

const customLevels = {
  levels: {
    critical: 0,
    error: 1,
    warn: 2,
    http: 3,
    info: 4,
    debug: 5
  },
  colors: {
    critical: 'red',
    error: 'red',
    warn: 'yellow',
    http: 'magenta',
    info: 'green',
    debug: 'blue'
  }
};

winston.addColors(customLevels.colors);

const fileJsonFormat = format.combine(
  format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), 
  format.json()
);

const consoleFormat = format.combine(
  format.colorize({ all: true }),
  format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  format.printf(({ timestamp, level, message }) => `${timestamp} ${level}: ${message}`)
);

// Create the logger instance
export const logger = winston.createLogger({
  levels: customLevels.levels,
  level: 'http', 
  transports: [
    new transports.Console({
      format: consoleFormat
    }),
    
    new transports.File({ 
      level: 'error',
      filename: path.resolve(__dirname, '../../logs/error.log'),
      format: fileJsonFormat 
    }),

    // Log ONLY http requests to requests.log
    new transports.File({
      level: 'http',
      format: format.combine(
        format(info => info.level === 'http' ? info : false)(),
        fileJsonFormat
      ),
      filename: path.resolve(__dirname, '../../logs/requests.log')
    }),
       //combined log file for both http and error logs
       new transports.File({
        level: 'http', 
        format: format.combine(
          // This custom format filters for 'http' OR 'error' logs
          format(info => (info.level === 'http' || info.level === 'error') ? info : false)(),
          fileJsonFormat
        ),
        filename: path.resolve(__dirname, '../../logs/combined.log')
      })
  ]
});

// Middleware for logging HTTP requests
export const requestLogger = (req: Request, res: Response, next: NextFunction) => {
  logger.http(`${req.method} ${req.originalUrl}`);
  next();
};