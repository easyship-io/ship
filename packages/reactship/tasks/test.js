const logger = require('@easyship/ship-core/logger');
const define = require('@easyship/ship-core/task/define');
const scriptPaths = require('@easyship/ship-core/paths/script');
const appPaths = require('@easyship/ship-core/paths/app');
const modifyContent = require('@easyship/ship-core/file/gulp-modify-content');
const Server = require('karma').Server;
const gulp = require('gulp');
const path = require('path');
const del = require('del');
const vinylPaths = require('vinyl-paths');
const fs = require('fs-extra');
const Runner = require('@easyship/ship-core/task/runner');

module.exports = () => {
    logger.info('Configuring tests...');

    define(
        'test:create',
        done => {
            !fs.existsSync(appPaths.get().test) && fs.mkdirSync(appPaths.get().test);
            done();
        }
    );

    define(
        'test:clean',
        () => gulp.src(appPaths.get().test)
            .pipe(vinylPaths(del))
    );

    define(
        'test:configure-environment',
        done => {
            process.env.BABEL_ENV = 'test';
            process.env.NODE_ENV = 'test';
            done();
        }
    );

    define(
        'test:copy-bootstrap',
        () =>
            gulp.src(path.join(scriptPaths.get().testAssets, 'index.js'))
                .pipe(
                    modifyContent(
                        content =>
                            content
                                .replace('${INIT_TESTS}', path.join(appPaths.get().src, 'init-tests'))
                                .replace('${SRC}', appPaths.get().src)
                    )
                )
                .pipe(gulp.dest(appPaths.get().test))
    );

    define(
        'test:copy-enzyme',
        () =>
            gulp.src(path.join(scriptPaths.get().testAssets, 'enzyme.js'))
                .pipe(
                    modifyContent(
                        content =>
                            content
                                .replace(/\${JASMINE_ENZYME}/g, path.join(scriptPaths.get().nodeModules, 'jasmine-enzyme'))
                                .replace(/\${REACT_ENZYME_ADAPTER}/g, path.join(scriptPaths.get().nodeModules, 'enzyme-adapter-react-16'))
                    )
                )
                .pipe(gulp.dest(appPaths.get().test))
    );

    define(
        'test:start-karma',
        done => {
            const karmaConfigPath = path.join(scriptPaths.get().testAssets, 'karma');
            const karmaConfig = require(karmaConfigPath);

            const server = new Server(karmaConfig, function(exitCode) {
                console.log(`Karma has exited with ${exitCode}`);
                exitCode && process.exit(exitCode);
                done();
            });

            server.start();
        }
    );

    define(
        'test',
        async done => {
            const runner = new Runner();
            runner.parallelTasks('test:create');
            runner.parallelTasks(
                'test:clean',
                'test:configure-environment'
            );
            runner.parallelTasks('test:create');
            runner.parallelTasks(
                'test:copy-bootstrap',
                'test:copy-enzyme'
            );
            runner.parallelTasks('test:start-karma');
            await runner.startAsync();
            done();
        }
    );
};
