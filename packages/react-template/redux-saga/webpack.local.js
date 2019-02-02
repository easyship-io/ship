const path = require('path');

module.exports = {
    resolve: {
        alias: {
            '@modules': path.join(__dirname, 'src/modules'),
            '@redux': path.join(__dirname, 'src/modules/redux'),
            '@app/app.config': path.join(__dirname, 'src/app.config'),
            '@assets': path.join(__dirname, 'src/assets')
        }
    }
};
