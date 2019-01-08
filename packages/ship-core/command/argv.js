const argv = require('yargs').argv;

const command = argv._ && argv._[0] || null;

const uargs = argv._ && argv._ && [ ...argv._  ] || null;
uargs && uargs.shift();

const nargs = { ...argv };
delete nargs['_'];
delete nargs['$0'];

module.exports = {
    command,
    uargs,
    nargs,
    script: argv.$0 || null
};
