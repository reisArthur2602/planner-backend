import { NextFunction, Response, Request } from 'express';
import { AplicationError } from '../helpers/error';
import { ZodError } from 'zod';

export const hasError = (
  error: Error & Partial<AplicationError>,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (error instanceof ZodError) {
    const validationErrors = error.errors.map((err) => ({
      path: err.path[0],
      message: err.message,
    }));
    console.error(validationErrors);
    return res.status(400).json(validationErrors);
  } else {
    const statusCode = error.statusCode ?? 500;
    const message = error.message ?? 'Internal Server Error';
    console.error({ message });
    return res.status(statusCode).json({ message });
  }
};
