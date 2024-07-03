import { NextFunction, Response, Request } from 'express';
import { AplicationError } from '../helpers/error';

export const erroMiddlaware = (
  error: Error & Partial<AplicationError>,
  req: Request,
  res: Response,
  next: NextFunction
) => {

  const statusCode = error.statusCode ?? 500;
  const message = error.statusCode ? error.message : 'Internal Server Error';
  return res.status(statusCode).json({ message });
};
