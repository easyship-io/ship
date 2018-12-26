const chalk = require('chalk');

module.exports = {
    log(...params) {
        console.log(...params);
    },
    info(...params) {
        params[0] = chalk.blue(params[0]);
        this.log(...params);
    },
    warn(...params) {
        params[0] = chalk.yellow(params[0]);
        this.log(...params);
    },
    error(...params) {
        params[0] = chalk.bold.red(params[0]);
        this.log(...params);
    }
};
