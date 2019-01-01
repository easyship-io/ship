const logger = require('../logger');
const shell = require('shelljs');

module.exports = (
    args,
    {
        errorMessage = ''
    } = {}) => {
    logger.info(`Exec: ${args[0]}`);

    const result = shell.exec(...args);

    if (!result || result.code !== 0) {
        errorMessage && logger.error(errorMessage);
        process.exit(1);
    }

    return result;
};
