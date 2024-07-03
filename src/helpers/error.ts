export class AplicationError extends Error {
  public readonly statusCode: number;
  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
  }
}

export class BadRequestError extends AplicationError {
  constructor(message: string) {
    super(message, 400);
  }
}

export class NotFoundError extends AplicationError {
  constructor(message: string) {
    super(message, 404);
  }
}

export class UnauthorizedError extends AplicationError {
  constructor(message: string) {
    super(message, 401);
  }
}
export class ConflictError extends AplicationError {
  constructor(message: string) {
    super(message, 409);
  }
}
