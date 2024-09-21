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
class ApplicationServiceWrapper {
    constructor(app, service) {
        this.app = app;
        this.service = service;
    }
    find() {
        return (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const result = yield this.service.find(req.query, this.app);
            res['result'] = { data: result };
            next();
        });
    }
    get() {
        return (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const result = yield this.service.get(req.params.id, req.query, this.app);
            res['result'] = { data: result };
            next();
        });
    }
    create() {
        return (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const result = yield this.service.create(req.body, req.query, this.app);
            res['result'] = { data: result };
            next();
        });
    }
    update() {
        return (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const result = yield this.service.update(req.params.id, req.body, req.query, this.app);
            res['result'] = { data: result };
            next();
        });
    }
    delete() {
        return (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const result = yield this.service.delete(req.params.id, req.query, this.app);
            res['result'] = { data: result };
            next();
        });
    }
}
exports.default = ApplicationServiceWrapper;
//# sourceMappingURL=ApplicationServiceWrapper.js.map