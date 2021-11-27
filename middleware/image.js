const path = require('path');

module.exports = {
    getFilePath: (profilePic) => {
        // save current working directory to cwd
        const cwd = process.cwd();
        let filePath = `${cwd}/img/${profilePic.name}`;
        filePath = (path.relative(cwd, filePath)).split('\\').join('/');
        return filePath;
    },
    validateFile: ({ size, mimetype }, callback) => {
        const imageFormat = mimetype.split('/')[1];
        // size is in bytes, 1000000 = 1MB
        const lessThan1MB = size < 1000000;
        const correctFormat = imageFormat == ('jpg' || 'png');

        if (!lessThan1MB) {
            return callback('Image file must be less than 1MB. Try again.');
        } else if (!correctFormat) {
            return callback('Image file must be in jpg/png format. Try again.');
        }
    }
};