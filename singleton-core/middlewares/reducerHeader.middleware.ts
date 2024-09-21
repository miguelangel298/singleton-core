/**
 * Handler the payload response proceed to map in array
 * and call mapper(payload, fields)
 * to build new object with keys present in fields from header
 */
import { NextFunction } from 'express';

export const reducerHeader = (): any => (
  req: Request,
  res: Response | any,
  next: NextFunction,
) => {

  // check header is available with field to build response
  const fields: false | string[] = req.headers['payload-reducer']
    ? JSON.parse(req.headers['payload-reducer'])
    : false;

  if (fields) {
    // Check if have data to work and if have multiple object
    if (res.result.data.length === 0 && res.result.data.length) {
      next();
      // Check if have one object (object dont have length) so is true
    }else if (res.result.data.length === undefined) {
      // Convert result data in array
      res.result.data = [res.result.data];
      // Call mapper to process data
      mapper(res.result.data, fields);
      // Revert result data from array to object for maintain the integrity of response
      res.result.data = res.result.data.shift();
      next();
    }else {
      // Call mapper to process data
      mapper(res.result.data, fields);
    }

  }
  next();
};

/**
 * This function use objectNodes: object[] and fields to create new object
 * and return the object[] with keys present in fields
 * this function is recursive until it moves through all nodes
 *
 * @param objectNodes
 * @param fields
 * @param count
 */
const mapper = (objectNodes: object[], fields: string[], count = 0) => {
  let jsonReduced: any;
  // Count times executed
  const countRecall = count + 1;
  // Helper to check object
  const checkObject = (object: any | object) => typeof object === 'object';

  // Move for all node of this object
  for (const node in objectNodes) {

    // Check if current node is a object
    const check = checkObject(node);

    // If have object in current position call again to enter in object keys
    if (!check) {

      for (const field of fields) {
        // Split fields with address
        const index = field.split('.');

        /** Check if field is field address
         * and if have object valid to build
         * and if current position object match with first fields address
         * (for nodes after processing  base)
         */
        if (index.length >= 2 && objectNodes[index[0]] && node === index[0]) {
          // Build object new from node objects
          jsonReduced = { ...jsonReduced, [index[1]]: objectNodes[node][index[1]] };
          // check is the first time
        }else if (countRecall <= 1) {
          // Build object new from base object
          jsonReduced = { ...jsonReduced, [index[0]]: objectNodes[node][index[0]] };
        }
      }
      /** Check if jsonReduced dont is undefined
       * and check objectNodes [node] at the current position
       * of the loop is valid to add a new compiled object
       */
      if (jsonReduced && objectNodes[node]) {
        // Assign new object
        objectNodes[node] = jsonReduced;
      }
    }
    /** Check if the current node is an object and call itself
     * again until all the nodes are exhausted
     */
    if (checkObject(jsonReduced)) {
      mapper(jsonReduced, fields, countRecall);
    }
  }
};
