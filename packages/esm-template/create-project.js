const path = require('path');
const fs = require('fs-extra');

module.exports = async (
    projectPath
) => {
    await fs.copy(path.join(__dirname, 'template'), projectPath);
};
