import { RequestHandler } from 'express';

export interface IMiddlewareSchema {
  all: RequestHandler[];
  find: RequestHandler[];
  get: RequestHandler[];
  create: RequestHandler[];
  update: RequestHandler[];
  delete: RequestHandler[];
}

export interface IMiddlewaresSchema {
  before: IMiddlewareSchema;
  after: IMiddlewareSchema;
}
