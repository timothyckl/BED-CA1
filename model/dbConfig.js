require('dotenv').config({ path: '../.env' });
const mysql = require('mysql2');

module.exports = {
    getConn: () => {
        return mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASS,
            database: 'sp_it',
            dateStrings: true
        });
    }
};