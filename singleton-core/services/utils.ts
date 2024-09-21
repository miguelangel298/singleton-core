import { IAppProvider } from './IAppProvider';
import { IMiddlewaresSchema } from './IMiddlewaresSchema';
import { NextFunction, Request, Response } from 'express';

/**
 *
 */
export type EntityID = number | string;

/**
 *
 */
export interface IApplicationService<T> {
  entity?: string;
  find(query: any, app?: IAppProvider): Promise<T[]>;
  get(id: EntityID, query?: any, app?: IAppProvider): Promise<T>;
  create(data: Partial<T>, query?: any, app?: IAppProvider): Promise<T>;
  update(id: EntityID, data: Partial<T>, query?: any, app?: IAppProvider): Promise<T>;
  delete(id: EntityID, query?: any, app?: IAppProvider): Promise<any>;
}

/**
 *
 */
export interface IRegisteringServiceOptions<T> {
  name: string;
  service: IApplicationService<T>;
  entity: string;
  middlewares: IMiddlewaresSchema;
}

/**
 *
 */
export type AsyncRequestHandler = (
  req: Request,
  res: Response,
  next: NextFunction,
) => Promise<any>;

/**
 *
 * @param {Error} err
 */
export const getResponseFromException = (err: Error) => {
  return {
    code: err['code'] || 500,
    name: err.name || 'Internal Error',
    message: err.message,
  };
};

/**
 *
 * @param route
 * @returns {(req, res, next?: (message?: any, ...optionalParams: any[])
 * => void) => Promise<any | void>}
 */
export const asyncRoute = (route: AsyncRequestHandler) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(route(req, res, next)).catch(err => {
      res.status(err.code || 500);
      res.json(getResponseFromException(err));
    });
  };
};
