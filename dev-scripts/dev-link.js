const exec = require('@easyship/ship-core/command/exec');
const logger = require('@easyship/ship-core/logger');
const os = require('os');
const fsExtra = require('fs-extra');
const path = require('path');
const { forEach } = require('lodash');
const fs = require('fs');

const toolsPaths = {
    reactship: path.join(process.cwd(), 'packages/reactship/bin/reactship.js'),
    nodeship: path.join(process.cwd(), 'packages/nodeship/bin/nodeship.js')
};

if (os.platform() !== 'win32') {
    const modulesPath = '/usr/local/bin';

    forEach(toolsPaths, (toolPath, tool) => {
        const installPath = path.join(modulesPath, `${tool}`);
        logger.info(`Removing "${installPath}".`);
        fsExtra.removeSync(installPath);
        logger.info(`Linking "${installPath}" to "${toolPath}".`);
        exec(
            [`ln -s "${toolPath}" "${installPath}"`, {silent: true}],
            {errorMessage: `"ln -s "${toolPath}" "${installPath}"" command failed.`}
        );
    });

    return;
}

const npmConfig = exec(
    ['npm config ls -l', {silent: true}],
    {errorMessage: '"npm config ls -l" command failed.'}
);
const prefixRegEx = /^prefix = .*$/m;
const prefixConfig = npmConfig.match(prefixRegEx);
let modulesPath = prefixConfig && prefixConfig[0] && prefixConfig[0].split(' = ')[1];
modulesPath = modulesPath.replace(/"/g, '');

if(!modulesPath) {
    logger.error('Global node modules path not found.');
    process.exit(1);
}

logger.info(`Global node modules path: ${modulesPath}`);

forEach(toolsPaths, (toolPath, tool) => {
    const command = `node "${toolPath}" %*`;
    const installPath = path.join(modulesPath, `${tool}.cmd`);
    logger.info(`Writing "${installPath}" content: "${command}"`);
    fsExtra.ensureFileSync(installPath);
    fs.writeFileSync(
        installPath,
        command
    );
});
