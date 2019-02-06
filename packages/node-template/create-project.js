const path = require('path');
const fs = require('fs-extra');

module.exports = async (
    projectTemplate,
    projectPath
) => {
    await fs.copy(path.join(__dirname, projectTemplate), projectPath);
};
