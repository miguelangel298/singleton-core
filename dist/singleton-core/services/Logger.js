"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Logger {
    static isEnv(env) {
        return process.env.NODE_ENV === env;
    }
    static log(method, message, error) {
        console.log({
            method,
            message,
            date: new Date().toISOString(),
            error: error.message,
            stack: error.stack,
        });
    }
    static debug(method, message, error) {
        if (this.isEnv('test') || this.isEnv('debug')) {
            this.log(method, message, error);
        }
    }
}
exports.default = Logger;
//# sourceMappingURL=Logger.js.map