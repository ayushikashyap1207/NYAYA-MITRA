import { logger } from '../utils/logger.js';

export const errorHandler = (err, req, res, next) => {
  const isMulterError = err?.name === 'MulterError';
  const statusCode = isMulterError ? 400 : err.statusCode || 500;
  const message = err.message || 'Internal server error';

  logger.error('Error handler', { message, stack: err.stack });

  res.status(statusCode).json({
    success: false,
    error: message,
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
  });
};
