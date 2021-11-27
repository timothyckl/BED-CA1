const db = require('./dbConfig');
const userTB = db.getConn();

module.exports = {
    selectAll: (callback) => {
        userTB.connect(err => {
            if (err) {
                return callback(err);
            } else {
                const selectAllQuery = `
                SELECT userid,
                username,
                email,
                contact,
                password,
                type,
                profile_pic_url,
                created_at
                FROM user;
                `;
                userTB.query(selectAllQuery, (err, data) => {
                    if (err) return callback(err);
                    else return callback(null, data);
                });
            }
        });
    },
    selectOne: (userid, callback) => {
        userTB.connect(err => {
            if (err) {
                return callback(err);
            } else {
                const selectOneQuery = `
                SELECT userid,
                username,
                email,
                contact,
                password,
                type,
                profile_pic_url,
                created_at
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
    updateOne: (id, {
        newUsername,
        newEmail,
        newContact,
        newPassword,
        newType,
        new_profile_pic_url
    }, callback) => {
        // once validated, update user data
        const selectOneQuery = `
                    SELECT username,
                    email,
                    contact,
                    password,
                    type, 
                    profile_pic_url
                    FROM user
                    WHERE userid = ?;
                    `;
        userTB.query(selectOneQuery, id, (err, data) => {
            if (err) {
                return callback(err);
            } else {

                // old user data
                let {
                    username,
                    email,
                    contact,
                    password,
                    type,
                    profile_pic_url
                } = data[0];

                // if new user data is defined, overwrite old user data
                if (newUsername) username = newUsername;
                if (newEmail) email = newEmail;
                if (newContact) contact = newContact;
                if (newPassword) password = newPassword;
                if (newType) type = newType;
                if (new_profile_pic_url) profile_pic_url = new_profile_pic_url;

                const updateOneQuery = `
                            UPDATE user
                            SET username = ?,
                            email = ?,
                            contact = ?,
                            password = ?,
                            type = ?,
                            profile_pic_url = ?
                            WHERE userid = ?;
                            `;
                const values = [username, email, contact, password, type, profile_pic_url, id];

                userTB.query(updateOneQuery, values, (err, data) => {
                    if (err) return callback(err);
                    else return callback(null, data);
                });
            }
        });
    },
    createOne: ({
            username,
            email,
            contact,
            password,
            type
        },
        profile_pic_url, callback) => {
        userTB.connect(err => {
            if (err) {
                return callback(err);
            } else {
                const createOneQuery = `
                INSERT INTO user (username, email, contact, password, type, profile_pic_url)
                VALUES (?, ?, ?, ?, ?, ?);
                `;
                const values = [username, email, contact, password, type, profile_pic_url];
                userTB.query(createOneQuery, values, (err, data) => {
                    if (err) return callback(err);
                    else return callback(null, data.affectedRows);
                });
            }
        });
    },
    validateData: ({
        newUsername,
        newEmail
    }, callback) => {
        userTB.connect(err => {
            if (err) {
                return callback(err);
            } else {
                // check for username/email duplicates in db
                const countQuery = `
                SELECT COUNT(u.username) as duplicates
                FROM user as u
                WHERE u.username = ?
                OR u.email = ?;
                `;

                userTB.query(countQuery, [newUsername, newEmail], (err, data) => {
                    if (err) {
                        return callback(err);
                    } else {
                        const duplicates = data[0].duplicates
                        return callback(null, duplicates);
                    }
                });
            }
        });
    }

};