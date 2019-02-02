const configure = require('@easyship/ship-core/task/configure');
const argv = require('@easyship/ship-core/command/argv');
const Runner = require('@easyship/ship-core/task/runner');
const logger = require('@easyship/ship-core/logger');
const scriptPaths = require('@easyship/ship-core/paths/script');
const appPaths = require('@easyship/ship-core/paths/app');

module.exports = async () => {
    logger.info('Configuring tasks...');

    scriptPaths.configure({
        root: __dirname,
        testAssets: 'assets/test',
        nodeModules: 'node_modules'
    });

    appPaths.configure({
        root: process.cwd(),
        test: 'test',
        src: 'src',
        build: 'build',
        public: 'public',
        html: 'public/index.html',
        indexJs: 'src/index.js',
        packageJson: 'package.json',
        nodeModules: 'node_modules',
        localWebpack: 'webpack.local.js'
    });

    configure();

    const tasks = [];

    argv.command && tasks.push(argv.command);

    const runner = new Runner();
    for (let task of tasks) {
        require(`./tasks/${task}`)();
        runner.parallelTasks(task);
    }

    logger.info('Starting execution...');

    await runner.startAsync();

    logger.info('Script finished successfully...');
};
