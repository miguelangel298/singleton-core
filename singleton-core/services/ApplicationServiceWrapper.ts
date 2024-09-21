import { NextFunction, Request, Response } from 'express';
import { IApplicationService } from './utils';
import { IAppProvider } from './IAppProvider';

/**
 *
 */
export default class ApplicationServiceWrapper<T> {
  constructor(
    protected app: IAppProvider,
    protected service: IApplicationService<T>,
  ) {}

  /**
   *
   * @returns {(req: e.Request, res: e.Response) => void}
   */
  find() {
    return async (req: Request, res: Response, next: NextFunction) => {
      const result = await this.service.find(req.query, this.app);
      res['result'] = { data: result };
      next();
    };
  }

  /**
   *
   * @returns {(req: e.Request, res: e.Response) => void}
   */
  get() {
    return async (req: Request, res: Response, next: NextFunction) => {
      const result = await this.service.get(req.params.id, req.query, this.app);
      res['result'] = { data: result };
      next();
    };
  }

  /**
   *
   * @returns {(req: e.Request, res: e.Response) => void}
   */
  create() {

    return async (req: Request, res: Response, next: NextFunction) => {
      const result = await this.service.create(req.body, req.query, this.app);
      res['result'] = { data: result };
      next();
    };
  }

  /**
   *
   * @returns {(req: e.Request, res: e.Response) => void}
   */
  update() {
    return async (req: Request, res: Response, next: NextFunction) => {
      const result =  await this.service.update(
        req.params.id,
        req.body,
        req.query,
        this.app,
      );
      res['result'] = { data: result };
      next();
    };
  }

  /**
   *
   * @returns {(req: e.Request, res: e.Response) => void}
   */
  delete() {
    return async (req: Request, res: Response, next: NextFunction) => {
      const result = await this.service.delete(req.params.id, req.query, this.app);
      res['result'] = { data: result };
      next();
    };
  }
}
