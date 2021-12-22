const db = require('./dbConfig');


module.exports = {
    addInterests: (userid, { categoryids }, callback) => {
        const userIntTB = db.getConn();
        userIntTB.connect(err => {
            if (err) callback(err, null);
            else {
                categoryids = categoryids.split(',');

                const insertQuery = `
                INSERT INTO 
                    user_interest (userid, categoryid)
                SELECT 
                    ? as userid, 
                    ? as categoryid
                WHERE NOT EXISTS (
                    SELECT 
                        userid, 
                        categoryid 
                    FROM
                        user_interest 
                    WHERE
                        userid = ? AND categoryid = ?
                );
                `;

                for (catID in categoryids) {
                    const values = [userid, categoryids[catID], userid, categoryids[catID]];
                    userIntTB.query(insertQuery, values, (err, result) => {
                        userIntTB.end();
                        if (err) return callback(err, null);
                        else return callback(null, result);
                    });
                }
            }
        });
    }
};