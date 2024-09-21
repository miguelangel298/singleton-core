"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class BadRequest extends Error {
    constructor(message = 'Bad Request') {
        super(message);
        this.name = 'BadRequest';
        this.code = 400;
    }
}
exports.BadRequest = BadRequest;
class NotFound extends Error {
    constructor(message = 'Not Found') {
        super(message);
        this.name = 'NotFound';
        this.code = 404;
    }
}
exports.NotFound = NotFound;
class Unauthorized extends Error {
    constructor(message = 'Unauthorized') {
        super(message);
        this.name = 'Unauthorized';
        this.code = 403;
    }
}
exports.Unauthorized = Unauthorized;
class InternalError extends Error {
    constructor(message = 'Internal Error') {
        super(message);
        this.name = 'InternalError';
        this.code = 500;
    }
}
exports.InternalError = InternalError;
//# sourceMappingURL=errors.js.map