const through2 = require('through2');

const modifyContent = fn => through2.obj((file, enc, cb) => {
    const contents = fn(String(file.contents), file.path, file);

    if (file.isBuffer() === true) {
        file.contents = new Buffer(contents);
    }

    cb(null, file);
});

module.exports = modifyContent;
