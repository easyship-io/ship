const path = require('path');
const { forEach } = require('lodash');

const app = {

};

module.exports = {
    configure(
        {
            root,
            ...args
        }) {
        app.root = path.resolve(root);

        forEach(args, (value, key) => {
            app[key] = path.join(app.root, value);
        });
    },
    get: () => app
};
