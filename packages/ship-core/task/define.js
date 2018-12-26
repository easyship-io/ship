const { task } = require('gulp');

const define = (name, callback) => task(name, callback);

module.exports = define;
