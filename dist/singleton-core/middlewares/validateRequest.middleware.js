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
const payloadValidator_helpers_1 = require("../helpers/payloadValidator.helpers");
const errors_1 = require("../services/errors");
exports.validateRequest = (params, key, isArray) => (req, _res, next) => __awaiter(this, void 0, void 0, function* () {
    const payloadValidate = new payloadValidator_helpers_1.default(req);
    payloadValidate.validate(params);
    const errors = key ? payloadValidate.getErrorsArray(key) : payloadValidate.getErrors(isArray);
    if (errors) {
        throw new errors_1.BadRequest(errors);
        return;
    }
    next();
});
//# sourceMappingURL=validateRequest.middleware.js.map