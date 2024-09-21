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
const lodash_1 = require("lodash");
exports.filterResponse = (omitableFields) => (req, res, next) => __awaiter(this, void 0, void 0, function* () {
    const item = res['result'];
    let result;
    if (req['service'].method === 'find') {
        result = { data: item.data.map(entry => lodash_1.omit(entry, omitableFields)) };
    }
    else {
        result = { data: lodash_1.omit(item, omitableFields) };
    }
    res['result'] = result;
    next();
});
//# sourceMappingURL=filterResponse.middleware.js.map