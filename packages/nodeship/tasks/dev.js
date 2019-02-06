const logger = require('@easyship/ship-core/logger');
const define = require('@easyship/ship-core/task/define');
const Runner = require('@easyship/ship-core/task/runner');
const appPaths = require('@easyship/ship-core/paths/app');
const scriptPaths = require('@easyship/ship-core/paths/script');
const path = require('path');
const gulp = require('gulp');
const babel = require('gulp-babel');
const watch = require('gulp-watch');
const spawn = require('child_process').spawn;

module.exports = () => {
    logger.info('Configuring dev...');

    require('./build')();

    define(
        'dev:nodemon',
        done => {
            const command = path.join(
                scriptPaths.get().nodeModules,
                'nodemon/bin/nodemon.js'
            );

            const main = require(appPaths.get().packageJson).main;
            const indexJs = main ?
                path.join(appPaths.get().root, main) :
                appPaths.get().defaultIndexJs;

            const nodemonProc = spawn('node', [
                command,
                '--delay', '1000ms',
                '--watch', appPaths.get().build,
                indexJs
            ]);

            nodemonProc.stdout.pipe(process.stdout);
            nodemonProc.stderr.pipe(process.stderr);

            done();
        }
    );

    define(
        'dev:watch',
        () => watch(path.join(appPaths.get().src, '**/*.js'), async () => {
            const runner = new Runner();
            runner.parallelTasks('build:babel');
            await runner.startAsync();
        })
    );

    define(
        'dev',
        async done => {
            const runner = new Runner();
            runner.parallelTasks('build:create');
            runner.parallelTasks('build:clean');
            runner.parallelTasks('build:babel');
            runner.parallelTasks('dev:nodemon');
            runner.parallelTasks('dev:watch');
            await runner.startAsync();
            done();
        }
    );
};
