export class BadRequest extends Error {
  public code: number;
  constructor(message: string[] | any = 'Bad Request') {
    super(message);
    this.name = 'BadRequest';
    this.code = 400;
  }
}

export class NotFound extends Error {
  public code: number;
  constructor(message: string = 'Not Found') {
    super(message);
    this.name = 'NotFound';
    this.code = 404;
  }
}

export class Unauthorized extends Error {
  public code: number;
  constructor(message: string = 'Unauthorized') {
    super(message);
    this.name = 'Unauthorized';
    this.code = 403;
  }
}

export class InternalError extends Error {
  public code: number;
  constructor(message: string = 'Internal Error') {
    super(message);
    this.name = 'InternalError';
    this.code = 500;
  }
}
