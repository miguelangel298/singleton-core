import { NextFunction, Request, Response } from 'express';
import { BadRequest, NotFound } from '../services/errors';
import { getResponseFromException } from '../services/utils';

export { filterResponse } from './filterResponse.middleware';
export { reducerHeader } from './reducerHeader.middleware';
export { addRelationships } from './addRelationships.middleware';
export { validateRequest } from './validateRequest.middleware';
/**
 *
 * @returns {(_req: e.Request, _res: e.Response) => Promise<void>}
 */
export const disallow = () => async (_req: Request, _res: Response) => {
  throw new BadRequest('This action is not supported');
};

/**
 *
 * @returns {Promise<void>}
 */
export const sendResponse = () => async (_req: Request, res: Response) => {
  if (res['result']) {
    res.json(res['result']);
    return;
  }

  res.status(404);
  res.json(getResponseFromException(new NotFound()));
};

/**
 *
 * @returns {(req: e.Request, _res: e.Response, next: e.NextFunction) => Promise<void>}
 */
export const setMethod = (method: string) =>
  async (req: Request, _res: Response, next: NextFunction) => {
    req['service'] = {
      method,
    };
    next();
  };
