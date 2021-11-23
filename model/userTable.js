const db = require('./dbConfig');
const userTB = db.getConn();

module.exports = {
    selectAll: (callback) => {
        userTB.connect(err => {
            if (err) callback(err);
            else {
                const selectAllQuery = `
                SELECT userid, username, email, contact, password, type, profile_pic_url, created_at
                FROM user;
                `;

                userTB.query(selectAllQuery, (err, data) => { // err handler should be declared elsewhere and reused
                    if (err) callback(err);
                    else callback(null, err);
                });
            }
        })
    },
    selectOne: (userid, callback) => {

    },
    createOne: (username, email, contact, password, type, profile_pic_url, callback) => {

    }

};