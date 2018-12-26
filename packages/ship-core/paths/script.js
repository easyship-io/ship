const path = require('path');
const { forEach } = require('lodash');

const script = {

};

module.exports = {
    configure(
        {
            root,
            ...args
        }) {
        script.root = path.resolve(root);

        forEach(args, (value, key) => {
            script[key] = path.join(script.root, value);
        });
    },
    get: () => script
};
