const appPaths = require('@easyship/ship-core/paths/app');
const path = require('path');
const bootstrapFilePath = path.join(appPaths.get().test, 'index.js');

module.exports = {
    basePath: '.',
    frameworks: [
        'jasmine'
    ],
    files: [
        bootstrapFilePath
    ],
    preprocessors: {
        [bootstrapFilePath]: [
            'webpack'
        ]
    },
    browsers: [
        'ChromeHeadless'
    ],
    reporters: [
        'spec',
        'coverage-istanbul'
    ],
    singleRun: true,
    port: 9876,
    colors: true,
    webpack: require('./webpack'),
    webpackMiddleware: {
        stats: 'errors-only'
    },
    client: {
        jasmine: {
            random: false
        }
    },
    coverageIstanbulReporter: {
        dir: 'coverage',
        reports: [
            'html',
            'lcovonly',
            'json',
            'text-summary'
        ],
        'report-config': {
            html: {
                subdir: 'report-html'
            },
            lcovonly: {
                subdir: '.',
                file: 'lcovonly.txt'
            },
            json: {
                subdir: '.',
                file: 'report.json'
            }
        },
        fixWebpackSourcePaths: true
    }
};
