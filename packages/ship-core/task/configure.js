const gulp = require('gulp');
const prettyTime = require('pretty-hrtime');
const chalk = require('chalk');
const logger = require('../logger');

const configure = (
    {
        logTaskStart = true,
        logTaskEnd = true
    } = {}) => {
    logTaskStart && gulp.on('start', e => !e.branch && logger.info(`Starting '${chalk.cyan(e.name)}'...`));
    logTaskEnd && gulp.on('stop', e => !e.branch && logger.info(`Finished '${chalk.cyan(e.name)}' after ${chalk.magenta(prettyTime(e.duration))}...`));
};

module.exports = configure;
