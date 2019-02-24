const fs = require('fs-extra');
const path = require('path');
const logger = require('@easyship/ship-core/logger');
const define = require('@easyship/ship-core/task/define');
const Runner = require('@easyship/ship-core/task/runner');
const argv = require('@easyship/ship-core/command/argv');
const createProjectAsync = require('@easyship/esm-template/create-project');

module.exports = () => {
    logger.info('Configuring new project creation...');

    const projectName = argv.uargs[0];
    const projectPath = path.join(process.cwd(), projectName);

    define(
        'create:check-dir',
        done => {
            if (fs.existsSync(projectPath)) {
                logger.error(`Directory ${projectName} already exists!`);
                process.exit(1);
            }

            done();
        }
    );

    define(
        'create:new-project',
        async done => {
            await createProjectAsync(projectPath);
            done();
        }
    );

    define(
        'create:output-instructions',
        done => {
            logger.info('');
            logger.info('-------- NEXT STEPS --------');
            logger.info('');
            logger.info(`  1. cd ${projectName}`);
            logger.info('  2. npm install');
            logger.info('  3. esmship build');
            logger.info('');
            logger.info('----------------------------');
            logger.info('');
            done();
        }
    );

    define(
        'create',
        async done => {
            const runner = new Runner();
            runner.parallelTasks('create:check-dir');
            runner.parallelTasks('create:new-project');
            runner.parallelTasks('create:output-instructions');
            await runner.startAsync();
            done();
        }
    );
};
