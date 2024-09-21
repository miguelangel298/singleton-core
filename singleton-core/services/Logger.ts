/**
 * Console log wrapper
 */
export default class Logger {
  static isEnv(env: string): boolean {
    return process.env.NODE_ENV === env;
  }

  static log(method: string, message: string, error: Error) {
    console.log({
      method,
      message,
      date: new Date().toISOString(),
      error: error.message,
      stack: error.stack,
    });
  }

  static debug(method: string, message: string, error: Error) {
    if (this.isEnv('test') || this.isEnv('debug')) {
      this.log(method, message, error);
    }
  }
}
