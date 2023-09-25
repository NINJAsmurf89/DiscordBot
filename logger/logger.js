import { appendFile } from 'fs';

export default class Logger {
  static level = Object.freeze({
    ERROR: 'error',
    INFO: 'info',
    SYSTEM: 'system',
    WARN: 'warn',
  });

  static logfile = 'log.log';

  static Error(...args) {
    this.#log(this.level.ERROR, ...args);
  }

  static Info(...args) {
    this.#log(this.level.INFO, ...args);
  }

  static Warn(...args) {
    this.#log(this.level.WARN, ...args);
  }

  static #appendFile(string) {
    appendFile(this.logfile, string, 'utf-8', () => { });
  }

  static #log(level, ...args) {
    const formattedArgs = args.map((arg) => {
      if (typeof arg === 'object') {
        if (arg instanceof Error) {
          return arg.stack;
        }
        return JSON.stringify(arg);
      }
      return String(arg);
    });

    const message = formattedArgs.join(' ');
    const timestamp = new Date().toISOString();

    this.#appendFile(`${timestamp} [${level}] ${message}\n`);
  }
}
