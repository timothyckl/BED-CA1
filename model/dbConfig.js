const mysql = require('mysql2');

module.exports = {
    getConn: () => {
        return mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: 'root',
            database: 'sp_it',
            dateStrings: true
        });
    }
};