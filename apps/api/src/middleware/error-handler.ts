import type { ErrorRequestHandler, RequestHandler } from 'express';
import { AppError } from '../lib/app-error';
import { sendError } from '../lib/api-response';

export const notFoundHandler: RequestHandler = (request, _response, next) => {
  next(new AppError(404, `Route ${request.method} ${request.originalUrl} was not found.`));
};

export const errorHandler: ErrorRequestHandler = (error, _request, response, _next) => {
  if (error instanceof AppError) {
    sendError(response, error.statusCode, error.message, error.errors);
    return;
  }

  console.error(error);
  sendError(response, 500, 'An unexpected error occurred.');
};
