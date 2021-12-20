const path = require('path');

module.exports = {
    getFilePath: (profilePic) => {
        // save current working directory to cwd
        const cwd = process.cwd();
        // absolute path
        const filePath = `${cwd}/img/${profilePic.name}`;
        // relative path
        const relativePath = (path.relative(cwd, filePath)).split('\\').join('/');

        profilePic.mv(relativePath, err => {
            if (err) return err;
        });

        return relativePath;
    },
    // REDO VALIDATION
    // SHOULD CHECK FILES HEXCODE AND FILE EXT TO VERIFY FILE TYPE
    // e.g. gifs renamed as jpg/png should NOT pass
    validateFile: ({ size, mimetype }, callback) => {
        const [type, subtype] = mimetype.split('/');

        const allowedTypes = ['image'];
        const allowedSubtypes = ['jpeg', 'png'];

        // size is in bytes, 1000000 = 1MB
        const lessThan1MB = size < 1000000;

        if (type != allowedTypes) return callback(new Error('Only image files are allowed. Try again.'));
        else if (!allowedSubtypes.includes(subtype)) return callback(new Error('Image file must be in jpg/png format. Try again.'));
        else if (!lessThan1MB) return callback(new Error('Image file must be less than 1MB. Try again.'));
        else return callback(null);
    }
};