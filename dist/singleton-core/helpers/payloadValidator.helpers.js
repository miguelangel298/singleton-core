"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const util_1 = require("util");
class PayloadValidator {
    constructor(req) {
        this.messages = [];
        this.req = req;
        this.validations = [];
    }
    validate(params) {
        this.validations = params.map((item) => {
            return { property: item, message: `${item} is required` };
        });
    }
    getErrorsArray(key) {
        this.req.body[key].forEach((item) => {
            this.invalidProperties = this.validations
                .filter(e => util_1.isUndefined(item[e.property]));
            this.invalidProperties.forEach(prop => this.messages.push(prop.message));
        });
        return this.messages.length && [...new Set(this.messages)];
    }
    getErrors(isArray) {
        if (isArray) {
            for (const data of this.req.body) {
                this.invalidProperties = this.validations
                    .filter(e => util_1.isUndefined(data[e.property]));
                this.messages = this.invalidProperties.map(prop => prop.message);
            }
        }
        else {
            this.invalidProperties = this.validations
                .filter(e => util_1.isUndefined(this.req.body[e.property])
                || this.req.query[e.property]
                || this.req.params[e.property]);
            this.messages = this.invalidProperties.map(prop => prop.message);
        }
        return this.messages.length && [...new Set(this.messages)];
    }
}
exports.default = PayloadValidator;
//# sourceMappingURL=payloadValidator.helpers.js.map