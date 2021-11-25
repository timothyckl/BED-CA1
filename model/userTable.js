const db = require('./dbConfig');
const userTB = db.getConn();

// const errorHandler = (err, data) => {
//     if (err) return callback(err);
//     else return callback(null, data);
// };

module.exports = {
    selectAll: (callback) => {
        userTB.connect(err => {
            if (err) return callback(err);
            else {
                const selectAllQuery = `
                SELECT userid, username, contact, password, type, profile_pic_url, created_at
                FROM user;
                `;
                // userTB.end();
                userTB.query(selectAllQuery, (err, data) => {
                    if (err) return callback(err);
                    else return callback(null, data);
                });
            }
        });
    },
    selectOne: (userid, callback) => {
        userTB.connect(err => {
            if (err) return callback(err);
            else {
                const selectOneQuery = `
                SELECT userid, username, email, contact, password, type, profile_pic_url, created_at
                FROM user
                WHERE userid = ?;
                `;
                const values = userid;
                userTB.query(selectOneQuery, values, (err, data) => {
                    if (err) return callback(err);
                    else return callback(null, data);
                });
            }
        });
    },
    createOne: (username, email, contact, password, type, profile_pic_url, callback) => {
        userTB.connect(err => {
            if (err) return callback(err);
            else {
                const createOneQuery = `
                INSERT INTO user (username, email, contact, password, type, profile_pic_url)
                VALUES (?, ?, ?, ?, ?, ?);
                `;
                const values = [username, email, contact, password, type, profile_pic_url];
                userTB.query(createOneQuery, values, (err, data) => {
                    if (err) return callback(err);
                    else return callback(null, data);
                });
            }
        });
    }

};