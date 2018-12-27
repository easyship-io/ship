const gulp = require('gulp');
const prettyTime = require('pretty-hrtime');
const chalk = require('chalk');
const logger = require('../logger');

const configure = (
    {
        logTaskStart = true,
        logTaskEnd = true
    } = {}) => {
    logTaskStart && gulp.on(
        'start',
        e => !e.branch && logger.info(`Starting '${chalk.cyan(e.name)}'...`)
    );

    logTaskEnd && gulp.on(
        'stop',
        e => !e.branch && logger.info(`Finished '${chalk.cyan(e.name)}' after ${chalk.magenta(prettyTime(e.duration))}...`)
    );

    gulp.on('error', e => {
        if (e.branch) {
            return;
        }

        let error = e.error || e;
        error = error.stack || error.message || error.toString() || error;

        logger.error(error);
    });
};

module.exports = configure;
