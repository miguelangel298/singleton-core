import { Request, Response, NextFunction } from 'express';
import PayloadValidator from '../helpers/payloadValidator.helpers';
import { BadRequest } from '../services/errors';

/**
 * Validate the fields expected in the request.
 * @param params
 * @param key
 * @param isArray
 */
export const validateRequest = (params: string[], key?: string, isArray?: boolean) =>
  async (req: Request, _res: Response, next: NextFunction) => {
    const payloadValidate = new PayloadValidator(req);

    payloadValidate.validate(params);
    const errors = key ? payloadValidate.getErrorsArray(key) : payloadValidate.getErrors(isArray);

    // Verify if exist errors.
    if (errors) {
      throw new BadRequest(errors);
      return;
    }

    next();
  };
