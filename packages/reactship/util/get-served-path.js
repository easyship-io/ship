const getPublicUrl = require('./get-public-url');

const ensureSlash = (path, needsSlash) => {
    const hasSlash = path.endsWith('/');

    if (hasSlash && !needsSlash) {
        return path.substr(path, path.length - 1);
    } else if (!hasSlash && needsSlash) {
        return `${path}/`;
    }

    return path;
};

const getServedPath = () => {
    const publicUrl = getPublicUrl();
    const servedUrl = process.env.PUBLIC_URL || (publicUrl ? url.parse(publicUrl).pathname : '/');
    return ensureSlash(servedUrl, true);
};

module.exports = getServedPath;
