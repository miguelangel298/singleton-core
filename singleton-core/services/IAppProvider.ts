import { Application } from 'express';
import { IApplicationService } from './utils';

/**
 *
 */
export interface IAppProvider extends Application {
  service: <T>(name: string) => IApplicationService<T>;
  registeredServices: any;
  useService: <T>(name: string, service: IApplicationService<T>) => void;
}
