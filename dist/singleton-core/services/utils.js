"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getResponseFromException = (err) => {
    return {
        code: err['code'] || 500,
        name: err.name || 'Internal Error',
        message: err.message,
    };
};
exports.asyncRoute = (route) => {
    return (req, res, next) => {
        Promise.resolve(route(req, res, next)).catch(err => {
            res.status(err.code || 500);
            res.json(exports.getResponseFromException(err));
        });
    };
};
//# sourceMappingURL=utils.js.map