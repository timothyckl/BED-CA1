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
    validateFile: (profilePic, callback) => {

        // size is in bytes, 1000000 = 1MB
        const size = profilePic.size;

        // check file format
        // FOC Chapter 4: Digital Representation
        // Decimal => Hexidecimal => ASCII
        const allowedFormats = ['JFIF', 'PNG'];

        // check file size
        const lessThan1MB = size < 1000000;

        // retrieve first 16 bytes of buffer data
        // copy values into array (values are in decimal/base-10) 
        // using  spread operator
        const decimalRepresentation = [...profilePic.data.slice(0, 16)];
        const hexRepresentation = decimalRepresentation.map(n => n.toString(16));

        // maps each decimal value in bufferData to
        // corresponding hexidecimal values
        // console.log('buffer (hex.): ', hexRepresentation);

        const hexToASCII = hexValue => {
            var result = '';
            for (var i = 0; i < hexValue.length; i += 2)
                result += String.fromCharCode(parseInt(hexValue.substr(i, 2), 16));
            return result;
        }

        // maps each hexidecimal values to
        // corresponding ASCII characters
        const asciiRepresentation = hexRepresentation.map(n => hexToASCII(n)).join("")

        if (lessThan1MB) {
            for (n in allowedFormats) {
                if (asciiRepresentation.includes(allowedFormats[n])) return callback(null);
            }
            return callback(Error('Only JPEG/PNG file formats allowed. Try again.'));
        } else return callback(Error('Image file must be less than 1MB. Try again.'));
    }
};