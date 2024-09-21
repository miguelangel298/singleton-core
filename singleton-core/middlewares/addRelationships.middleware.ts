import { Request, Response, NextFunction } from 'express';

/**
 * Set the `query` object of the request,
 * to be used in the repository method
 * @param relations
 */
export const addRelationships = (relations: string[]) =>
  async (req: Request, _res: Response, next: NextFunction) => {

    // build relations and where from query and the service can return them.
    req.query = { relations, where: req.query };

    next();
  };
