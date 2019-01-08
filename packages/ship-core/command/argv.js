const argv = require('yargs').argv;

const command = argv._ && argv._[0] || null;

const args = { ...argv };

delete args['_'];

module.exports = {
    command,
    args,
    script: argv.$ || null
};
