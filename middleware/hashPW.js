const bcrypt = require('bcrypt');
const saltRounds = 10;

module.exports = {
    getHash: (plainTextPassword) => {
        const salt = bcrypt.genSaltSync(saltRounds);
        const hash = bcrypt.hashSync(plainTextPassword, salt);

        return hash;
    },
};