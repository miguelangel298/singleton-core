"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const errors_1 = require("../services/errors");
const utils_1 = require("../services/utils");
var filterResponse_middleware_1 = require("./filterResponse.middleware");
exports.filterResponse = filterResponse_middleware_1.filterResponse;
var reducerHeader_middleware_1 = require("./reducerHeader.middleware");
exports.reducerHeader = reducerHeader_middleware_1.reducerHeader;
var addRelationships_middleware_1 = require("./addRelationships.middleware");
exports.addRelationships = addRelationships_middleware_1.addRelationships;
var validateRequest_middleware_1 = require("./validateRequest.middleware");
exports.validateRequest = validateRequest_middleware_1.validateRequest;
exports.disallow = () => (_req, _res) => __awaiter(this, void 0, void 0, function* () {
    throw new errors_1.BadRequest('This action is not supported');
});
exports.sendResponse = () => (_req, res) => __awaiter(this, void 0, void 0, function* () {
    if (res['result']) {
        res.json(res['result']);
        return;
    }
    res.status(404);
    res.json(utils_1.getResponseFromException(new errors_1.NotFound()));
});
exports.setMethod = (method) => (req, _res, next) => __awaiter(this, void 0, void 0, function* () {
    req['service'] = {
        method,
    };
    next();
});
//# sourceMappingURL=index.js.map