const appPaths = require('@easyship/ship-core/paths/app');

const getPublicUrl = () => process.env.PUBLIC_URL || require(appPaths.get().packageJson).homepage;

module.exports = getPublicUrl;
