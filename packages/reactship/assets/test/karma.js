const appPaths = require('@easyship/ship-core/paths/app');
const path = require('path');
const bootstrapFilePath = path.join(appPaths.get().test, 'index.js');
const react16EnzymeFilePath = path.join(appPaths.get().test, 'react-16-enzyme.js');

module.exports = {
    basePath: '.',
    frameworks: [
        'jasmine'
    ],
    files: [
        bootstrapFilePath,
        react16EnzymeFilePath
    ],
    preprocessors: {
        [bootstrapFilePath]: [
            'webpack'
        ],
        [react16EnzymeFilePath]: [
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
    webpack: require('./../webpack')({
        type: 'test'
    }),
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
