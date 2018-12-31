const logger = require('@easyship/ship-core/logger');
const define = require('@easyship/ship-core/task/define');
const Runner = require('@easyship/ship-core/task/runner');
const checkRequiredFiles = require('react-dev-utils/checkRequiredFiles');
const appPaths = require('@easyship/ship-core/paths/app');
const {
    choosePort,
    createCompiler,
    prepareUrls,
    prepareProxy
} = require('react-dev-utils/WebpackDevServerUtils');
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const createDevServerConfig = require('../assets/dev-server.config');
const clearConsole = require('react-dev-utils/clearConsole');
const openBrowser = require('react-dev-utils/openBrowser');

module.exports = () => {
    logger.info('Configuring dev...');

    const defaultPort = parseInt(process.env.PORT, 10) || 3000;
    const host = process.env.HOST || '0.0.0.0';
    const isInteractive = process.stdout.isTTY;
    let port;
    let protocol;
    let appName;
    let urls;
    let compiler;
    let proxyConfig;
    let devServer;
    let webpackConfig;

    if (process.env.HOST) {
        logger.warn(`Attempting to bind to HOST environment variable: ${process.env.HOST}`);
        logger.warn('If this was unintentional, check that you haven\'t mistakenly set it in your shell.');
        logger.warn('Learn more here: http://bit.ly/2mwWSwH');
    }

    define(
        'dev:configure-environment',
        done => {
            process.env.BABEL_ENV = 'development';
            process.env.NODE_ENV = 'development';
            done();
        }
    );

    define(
        'dev:ensure-required-files',
        done => {
            if (!checkRequiredFiles([appPaths.get().html, appPaths.get().indexJs])) {
                process.exit(1);
            }

            done();
        }
    );

    define(
        'dev:port',
        async done => {
            port = await choosePort(host, defaultPort);

            if (!port) {
                logger.error('Port to serve an app was not found.');
                process.exit(1);
            }

            done();
        }
    );

    define(
        'dev:protocol',
        done => {
            protocol = process.env.HTTPS === 'true' ? 'https' : 'http';
            done();
        }
    );

    define(
        'dev:app-name',
        done => {
            appName = require(appPaths.get().packageJson).name;
            done();
        }
    );

    define(
        'dev:webpack-config',
        done => {
            webpackConfig = require('./../assets/webpack')({
                type: 'dev'
            });
            done();
        }
    );

    define(
        'dev:urls',
        done => {
            urls = prepareUrls(protocol, host, port);
            done();
        }
    );

    define(
        'dev:webpack',
        done => {
            compiler = createCompiler(webpack, webpackConfig, appName, urls);
            done();
        }
    );

    define(
        'dev:proxy-config',
        done => {
            const proxySetting = require(appPaths.get().packageJson).proxy;
            proxyConfig = prepareProxy(proxySetting, appPaths.get().public);
            done();
        }
    );

    define(
        'dev:dev-server',
        done => {
            const serverConfig = createDevServerConfig({
                proxy: proxyConfig,
                allowedHost: urls.lanUrlForConfig,
                protocol,
                host,
                webpackConfig
            });

            devServer = new WebpackDevServer(compiler, serverConfig);
            devServer.listen(port, host, err => {
                if (err) {
                    logger.error(err);
                    process.exit(1);
                }

                if (isInteractive) {
                    clearConsole();
                }

                logger.log('Starting the development server...');
                openBrowser(urls.localUrlForBrowser);

                done();
            });
        }
    );

    define(
        'dev:signals',
        done => {
            ['SIGINT', 'SIGTERM'].forEach(sig => {
                process.on(sig, () => {
                    devServer && devServer.close();
                    process.exit();
                });
            });

            done();
        }
    );

    define(
        'dev',
        async done => {
            const runner = new Runner();
            runner.parallelTasks('dev:configure-environment');
            runner.parallelTasks('dev:ensure-required-files');
            runner.parallelTasks(
                'dev:port',
                'dev:protocol',
                'dev:app-name',
                'dev:webpack-config'
            );
            runner.parallelTasks('dev:urls');
            runner.parallelTasks(
                'dev:webpack',
                'dev:proxy-config'
            );
            runner.parallelTasks(
                'dev:dev-server',
                'dev:signals'
            );
            await runner.startAsync();
            done();
        }
    );
};
