class WebpackBailPlugin {
    apply(compiler) {
        compiler.hooks.emit.tapAsync(
            'WebpackBailPlugin',
            (compilation, callback) => {
                if (compilation.warnings.length) {
                    throw new Error(compilation.warnings.toString());
                }

                callback();
            }
        );
    }
}

module.exports = WebpackBailPlugin;
