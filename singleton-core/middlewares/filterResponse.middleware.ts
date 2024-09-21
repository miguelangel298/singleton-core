import { Request, Response, NextFunction } from 'express';
import { omit } from 'lodash';

/**
 * Remove the fields that were received by { omitableFields }
 * from the response to return to the client
 * @param omitableFields
 */
export const filterResponse = (omitableFields: string[]) =>
  async (req: Request, res: Response, next: NextFunction) => {
    // We capture the data.
    const item = res['result'];
    let result;

    if (req['service'].method === 'find') {
      result = { data: item.data.map(entry => omit(entry, omitableFields)) };
    } else {
      result = { data: omit(item, omitableFields) };
    }

    // Set data to { result } in request.
    res['result'] = result;

    next();
  };
