const path = require('path');

module.exports = {
    getFilePath: (profilePic) => {
        const cwd = process.cwd();
        let filePath = `${cwd}/img/${profilePic.name}`;
        filePath = (path.relative(cwd, filePath)).split('\\').join('/');
        return filePath;
    }
};