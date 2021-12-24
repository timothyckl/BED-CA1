const db = require('./dbConfig');


module.exports = {
    selectAll: (callback) => {
        const userTB = db.getConn();
        userTB.connect(err => {
            if (err) {
                return callback(err, null);
            } else {
                const selectAllQuery = `
                SELECT
                    userid,
                    username,
                    email,
                    contact,
                    password,
                    type,
                    profile_pic_url,
                    created_at
                FROM
                    user;
                `;
                userTB.query(selectAllQuery, (err, data) => {
                    userTB.end();
                    if (err) return callback(err, null);
                    else return callback(null, data);
                });
            }
        });
    },
    selectOne: (userid, callback) => {
        const userTB = db.getConn();
        userTB.connect(err => {
            if (err) {
                return callback(err, null);
            } else {
                const selectOneQuery = `
                SELECT
                    userid,
                    username,
                    email,
                    contact,
                    password,
                    type,
                    profile_pic_url,
                    created_at
                FROM
                    user
                WHERE
                    userid = ?;
                `;

                userTB.query(selectOneQuery, userid, (err, data) => {
                    userTB.end();
                    if (err) return callback(err, null);
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
        const userTB = db.getConn();

        // once validated, update user data
        const selectOneQuery = `
                    SELECT
                        username,
                        email,
                        contact,
                        password,
                        type, 
                        profile_pic_url
                    FROM
                        user
                    WHERE
                        userid = ?;
                    `;
        userTB.query(selectOneQuery, id, (err, data) => {
            if (err) {
                return callback(err, null);
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
                            UPDATE
                                user
                            SET
                                username = ?,
                                email = ?,
                                contact = ?,
                                password = ?,
                                type = ?,
                                profile_pic_url = ?
                            WHERE
                                userid = ?;
                            `;
                const values = [username, email, contact, password, type, profile_pic_url, id];

                userTB.query(updateOneQuery, values, (err, data) => {
                    userTB.end();
                    if (err) return callback(err, null);
                    else return callback(null, data.affectedRows);
                });
            }
        });
    },
    createOne: ({
            username,
            email,
            contact,
            type
        },
        password, profile_pic_url, callback) => {
        const userTB = db.getConn();
        userTB.connect(err => {
            if (err) {
                return callback(err, null);
            } else {
                const createOneQuery = `
                INSERT INTO
                    user
                    (username, email, contact, password, type, profile_pic_url)
                VALUES
                    (?, ?, ?, ?, ?, ?);
                `;
                const values = [username, email, contact, password, type, profile_pic_url];
                userTB.query(createOneQuery, values, (err, data) => {
                    userTB.end();
                    if (err) return callback(err, null);
                    else return callback(null, data.affectedRows);
                });
            }
        });
    },
    validateData: ({
        newUsername,
        newEmail
    }, callback) => {
        const userTB = db.getConn();
        userTB.connect(err => {
            if (err) {
                return callback(err, null);
            } else {
                // check for username/email duplicates in db
                const countQuery = `
                SELECT
                    COUNT(username) as duplicates
                FROM
                    user
                WHERE
                    username = ?
                OR
                    email = ?;
                `;
                const values = [newUsername, newEmail];

                userTB.query(countQuery, values, (err, data) => {
                    userTB.end();
                    if (err) return callback(err, null);
                    else {
                        const duplicates = data[0].duplicates
                        return callback(null, duplicates);
                    }
                });
            }
        });
    }

};