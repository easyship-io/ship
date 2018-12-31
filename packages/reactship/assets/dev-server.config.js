const errorOverlayMiddleware = require('react-dev-utils/errorOverlayMiddleware');
const noopServiceWorkerMiddleware = require('react-dev-utils/noopServiceWorkerMiddleware');
const ignoredFiles = require('react-dev-utils/ignoredFiles');
const appPaths = require('@easyship/ship-core/paths/app');

module.exports = (
    {
        proxy,
        allowedHost,
        protocol,
        host,
        webpackConfig
    }) => {
    return {
        disableHostCheck: !proxy || process.env.DANGEROUSLY_DISABLE_HOST_CHECK === 'true',
        compress: true,
        clientLogLevel: 'none',
        contentBase: appPaths.get().public,
        watchContentBase: true,
        hot: true,
        publicPath: webpackConfig.output.publicPath,
        quiet: true,
        watchOptions: {
            ignored: ignoredFiles(appPaths.get().src)
        },
        https: protocol === 'https',
        host: host,
        overlay: false,
        historyApiFallback: {
            disableDotRule: true
        },
        public: allowedHost,
        proxy,
        before: app => {
            app.use(errorOverlayMiddleware());
            app.use(noopServiceWorkerMiddleware());
        }
    };
};
