const logger = require('@easyship/ship-core/logger');
const define = require('@easyship/ship-core/task/define');
const Runner = require('@easyship/ship-core/task/runner');
const appPaths = require('@easyship/ship-core/paths/app');
const path = require('path');
const gulp = require('gulp');
const babel = require('gulp-babel');
const fs = require('fs-extra');

module.exports = () => {
    logger.info('Configuring build...');

    define(
        'build:create',
        done => {
            !fs.existsSync(appPaths.get().build) && fs.mkdirSync(appPaths.get().build);
            done();
        }
    );

    define(
        'build:clean',
        done => {
            fs.emptyDirSync(appPaths.get().build);
            done();
        }
    );

    define(
        'build:copy-assets',
        () => gulp.src([
            path.join(appPaths.get().src, '**/*'),
            `!${path.join(appPaths.get().src, '**/*.js')}`
        ]).pipe(gulp.dest(appPaths.get().build))
    );

    define(
        'build:babel',
        () => gulp.src(path.join(appPaths.get().src, '**/*.js'))
            .pipe(babel({
                presets: [
                    require.resolve('@babel/preset-react'),
                    require.resolve('@babel/preset-env')
                ],
                plugins: [
                    [
                        require.resolve('@babel/plugin-proposal-class-properties'),
                        {
                            loose: true
                        }
                    ]
                ]
            }))
            .pipe(gulp.dest(appPaths.get().build))
    );

    define(
        'build',
        async done => {
            const runner = new Runner();
            runner.parallelTasks('build:create');
            runner.parallelTasks('build:clean');
            runner.parallelTasks('build:copy-assets');
            runner.parallelTasks('build:babel');
            await runner.startAsync();
            done();
        }
    );
};
