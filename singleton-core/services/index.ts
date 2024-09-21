import { Router } from 'express';
import ApplicationServiceWrapper from './ApplicationServiceWrapper';
import {
  asyncRoute,
  IApplicationService,
  IRegisteringServiceOptions,
} from './utils';
import { BaseEntity, getRepository, ObjectType } from 'typeorm';
import { GenericService } from './GenericService';
import { IAppProvider } from './IAppProvider';
import { setMethod } from '../middlewares';

/**
 *
 * @param {ObjectType<T>} entity
 * @returns {IApplicationService<T>}
 */
export function createService<T extends BaseEntity>(
  entity: ObjectType<T>,
): IApplicationService<T> {
  const repository = getRepository(entity);
  return new GenericService<T>(repository);
}

/**
 * Register a service into an express app
 * @returns {(app: e.Application) => void}
 * @param getOptions
 */
export function registerService<T>(
  getOptions: (app: IAppProvider) => IRegisteringServiceOptions<T>,
) {
  return {
    register: (app: IAppProvider) => {
      const options = getOptions(app);
      const service = options.service;
      service.entity = options.entity;
      const router = Router();

      const wrapper = new ApplicationServiceWrapper<T>(app, service);
      const middlewareBefore = options.middlewares.before;
      const middlewareAfter = options.middlewares.after;

      // All (before)
      if (app.get('appMiddlewares')['before']['all'].length) {
        router.use(
          ...app.get('appMiddlewares')['before']['all'].map(asyncRoute),
        );
      }
      if (middlewareBefore['all'].length) {
        router.use(...middlewareBefore['all'].map(asyncRoute));
      }

      // Find
      router.get(
        '/',
        setMethod('find'),
        ...app.get('appMiddlewares')['before']['find'].map(asyncRoute),
        ...middlewareBefore['find'].map(asyncRoute),
        asyncRoute(wrapper.find()),
        ...middlewareAfter['find'].map(asyncRoute),
        ...app.get('appMiddlewares')['after']['find'].map(asyncRoute),
      );

      // Create
      router.post(
        '/',
        setMethod('create'),
        ...app.get('appMiddlewares')['before']['create'].map(asyncRoute),
        ...middlewareBefore['create'].map(asyncRoute),
        asyncRoute(wrapper.create()),
        ...middlewareAfter['create'].map(asyncRoute),
        ...app.get('appMiddlewares')['after']['create'].map(asyncRoute),
      );

      // Get
      router.get(
        '/:id',
        setMethod('get'),
        ...app.get('appMiddlewares')['before']['get'].map(asyncRoute),
        ...middlewareBefore['get'].map(asyncRoute),
        asyncRoute(wrapper.get()),
        ...middlewareAfter['get'].map(asyncRoute),
        ...app.get('appMiddlewares')['after']['get'].map(asyncRoute),
      );

      // Update
      router.put(
        '/:id',
        setMethod('update'),
        ...app.get('appMiddlewares')['before']['update'].map(asyncRoute),
        ...middlewareBefore['update'].map(asyncRoute),
        asyncRoute(wrapper.update()),
        ...middlewareAfter['update'].map(asyncRoute),
        ...app.get('appMiddlewares')['after']['update'].map(asyncRoute),
      );

      // Delete
      router.delete(
        '/:id',
        setMethod('delete'),
        ...app.get('appMiddlewares')['before']['delete'].map(asyncRoute),
        ...middlewareBefore['delete'].map(asyncRoute),
        asyncRoute(wrapper.delete()),
        ...middlewareAfter['delete'].map(asyncRoute),
        ...app.get('appMiddlewares')['after']['delete'].map(asyncRoute),
      );

      // All (after)
      if (middlewareAfter['all'].length) {
        router.use(...middlewareAfter['all'].map(asyncRoute));
      }
      if (app.get('appMiddlewares')['after']['all'].length) {
        router.use(
          ...app.get('appMiddlewares')['after']['all'].map(asyncRoute),
        );
      }
      // Register route in app
      app.use(`/${options.name}`, router);
      // Register the service into the app so we can get it by app.service(name)
      app.useService(options.entity, service);
    },
  };
}
