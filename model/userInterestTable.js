const db = require('./dbConfig');
const userIntTB = db.getConn();

module.exports = {
    addInterests: (userid, { categoryids }, callback) => {
        userIntTB.connect(err => {
            if (err) callback(err, null);
            else {
                categoryids = categoryids.split(',');
                const insertQuery = `
                INSERT INTO 
                    user_interest
                    (userid, categoryid)
                VALUES
                    (?, ?);
                `;

                for (n in categoryids) {
                    userIntTB.query(insertQuery, [userid, categoryids[n]], (err, affectedRows) => {
                        if (err) return callback(err, null);
                        else return callback(null, affectedRows.affectedRows);
                    });
                }
            }
        });
    }
};