const logger = require('@easyship/ship-core/logger');
const define = require('@easyship/ship-core/task/define');
const Runner = require('@easyship/ship-core/task/runner');
const FileSizeReporter = require('react-dev-utils/FileSizeReporter');
const appPaths = require('@easyship/ship-core/paths/app');
const fs = require('fs-extra');
const webpack = require('webpack');
const formatWebpackMessages = require('react-dev-utils/formatWebpackMessages');
const printHostingInstructions = require('react-dev-utils/printHostingInstructions');
const getPublicUrl = require('../util/get-public-url');

module.exports = () => {
    logger.info('Configuring build...');

    let previousFileSizes;
    let webpackStats;
    let webpackWarnings;
    let webpackConfig;

    define(
        'build:create',
        done => {
            !fs.existsSync(appPaths.get().build) && fs.mkdirSync(appPaths.get().build);
            done();
        }
    );

    define(
        'build:configure-environment',
        done => {
            process.env.BABEL_ENV = 'production';
            process.env.NODE_ENV = 'production';
            done();
        }
    );

    define(
        'build:measure-previous-build-size',
        async done => {
            previousFileSizes = await FileSizeReporter.measureFileSizesBeforeBuild(appPaths.get().build);
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
        'build:copy-public',
        done => {
            fs.copySync(appPaths.get().public, appPaths.get().build, {
                dereference: true,
                filter: file => file !== appPaths.get().html,
            });
            done();
        }
    );

    define(
        'build:webpack',
        done => {
            webpackConfig = require('./../assets/webpack')({
                type: 'prod'
            });
            const compiler = webpack(webpackConfig);
            compiler.run((err, stats) => {
                if (err) {
                    logger.error(err);
                    process.exit(1);
                }

                const messages = formatWebpackMessages(stats.toJson({}, true));
                if (messages.errors.length) {
                    if (messages.errors.length > 1) {
                        messages.errors.length = 1;
                    }

                    logger.error(messages.errors.join('\n\n'));
                    process.exit(1);
                }

                if (process.env.CI &&
                    (typeof process.env.CI !== 'string' || process.env.CI.toLowerCase() !== 'false') &&
                    messages.warnings.length
                ) {
                    logger.warn(
                        '\nTreating warnings as errors because process.env.CI = true.\n' +
                        'Most CI servers set it automatically.\n'
                    );
                    logger.error(messages.warnings.join('\n\n'));
                    process.exit(1);
                }

                webpackStats = stats;
                webpackWarnings = messages.warnings;

                done();
            });
        }
    );

    define(
        'build:build-stats',
        done => {
            if (webpackWarnings.length) {
                logger.warn('Compiled with warnings.');
                logger.warn(webpackWarnings.join('\n\n'));
            } else {
                logger.info('Compiled successfully.');
            }

            logger.info('File sizes after gzip:');

            const WARN_AFTER_BUNDLE_GZIP_SIZE = 512 * 1024;
            const WARN_AFTER_CHUNK_GZIP_SIZE = 1024 * 1024;

            FileSizeReporter.printFileSizesAfterBuild(
                webpackStats,
                previousFileSizes,
                appPaths.get().build,
                WARN_AFTER_BUNDLE_GZIP_SIZE,
                WARN_AFTER_CHUNK_GZIP_SIZE
            );

            const appPackage = require(appPaths.get().packageJson);
            const publicUrl = getPublicUrl();
            const publicPath = webpackConfig.output.publicPath;
            const buildFolder = appPaths.get().build;
            printHostingInstructions(
                appPackage,
                publicUrl,
                publicPath,
                buildFolder,
                !!'useYarn'
            );

            done();
        }
    );

    define(
        'build',
        async done => {
            const runner = new Runner();
            runner.parallelTasks(
                'build:create',
                'build:configure-environment'
            );
            runner.parallelTasks('build:measure-previous-build-size');
            runner.parallelTasks('build:clean');
            runner.parallelTasks(
                'build:copy-public',
                'build:webpack'
            );
            runner.parallelTasks('build:build-stats');
            await runner.startAsync();
            done();
        }
    );
};
