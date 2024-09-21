"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ApplicationServiceWrapper_1 = require("./ApplicationServiceWrapper");
const utils_1 = require("./utils");
const typeorm_1 = require("typeorm");
const GenericService_1 = require("./GenericService");
const middlewares_1 = require("../middlewares");
function createService(entity) {
    const repository = typeorm_1.getRepository(entity);
    return new GenericService_1.GenericService(repository);
}
exports.createService = createService;
function registerService(getOptions) {
    return {
        register: (app) => {
            const options = getOptions(app);
            const service = options.service;
            service.entity = options.entity;
            const router = express_1.Router();
            const wrapper = new ApplicationServiceWrapper_1.default(app, service);
            const middlewareBefore = options.middlewares.before;
            const middlewareAfter = options.middlewares.after;
            if (app.get('appMiddlewares')['before']['all'].length) {
                router.use(...app.get('appMiddlewares')['before']['all'].map(utils_1.asyncRoute));
            }
            if (middlewareBefore['all'].length) {
                router.use(...middlewareBefore['all'].map(utils_1.asyncRoute));
            }
            router.get('/', middlewares_1.setMethod('find'), ...app.get('appMiddlewares')['before']['find'].map(utils_1.asyncRoute), ...middlewareBefore['find'].map(utils_1.asyncRoute), utils_1.asyncRoute(wrapper.find()), ...middlewareAfter['find'].map(utils_1.asyncRoute), ...app.get('appMiddlewares')['after']['find'].map(utils_1.asyncRoute));
            router.post('/', middlewares_1.setMethod('create'), ...app.get('appMiddlewares')['before']['create'].map(utils_1.asyncRoute), ...middlewareBefore['create'].map(utils_1.asyncRoute), utils_1.asyncRoute(wrapper.create()), ...middlewareAfter['create'].map(utils_1.asyncRoute), ...app.get('appMiddlewares')['after']['create'].map(utils_1.asyncRoute));
            router.get('/:id', middlewares_1.setMethod('get'), ...app.get('appMiddlewares')['before']['get'].map(utils_1.asyncRoute), ...middlewareBefore['get'].map(utils_1.asyncRoute), utils_1.asyncRoute(wrapper.get()), ...middlewareAfter['get'].map(utils_1.asyncRoute), ...app.get('appMiddlewares')['after']['get'].map(utils_1.asyncRoute));
            router.put('/:id', middlewares_1.setMethod('update'), ...app.get('appMiddlewares')['before']['update'].map(utils_1.asyncRoute), ...middlewareBefore['update'].map(utils_1.asyncRoute), utils_1.asyncRoute(wrapper.update()), ...middlewareAfter['update'].map(utils_1.asyncRoute), ...app.get('appMiddlewares')['after']['update'].map(utils_1.asyncRoute));
            router.delete('/:id', middlewares_1.setMethod('delete'), ...app.get('appMiddlewares')['before']['delete'].map(utils_1.asyncRoute), ...middlewareBefore['delete'].map(utils_1.asyncRoute), utils_1.asyncRoute(wrapper.delete()), ...middlewareAfter['delete'].map(utils_1.asyncRoute), ...app.get('appMiddlewares')['after']['delete'].map(utils_1.asyncRoute));
            if (middlewareAfter['all'].length) {
                router.use(...middlewareAfter['all'].map(utils_1.asyncRoute));
            }
            if (app.get('appMiddlewares')['after']['all'].length) {
                router.use(...app.get('appMiddlewares')['after']['all'].map(utils_1.asyncRoute));
            }
            app.use(`/${options.name}`, router);
            app.useService(options.entity, service);
        },
    };
}
exports.registerService = registerService;
//# sourceMappingURL=index.js.map