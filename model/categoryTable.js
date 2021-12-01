const db = require('./dbConfig');
const categoryTB = db.getConn();

module.exports = {
    selectAll: (callback) => {
        categoryTB.connect(err => {
            if (err) return callback(err, null);
            else {
                const selectAllQuery = `
                SELECT c.categoryid, c.categoryname as category, c.description
                FROM category as c;
                `;
                categoryTB.query(selectAllQuery, (err, data) => {
                    if (err) return callback(err, null);
                    else return callback(null, data);
                });
            }
        });
    },
    createOne: ({ categoryName, description }, callback) => {

        categoryTB.connect(err => {
            if (err) return callback(err, null);
            else {
                const createOneQuery = `
                INSERT INTO
                    category (categoryname, description)
                VALUES
                    (?, ?);
                `;
                const values = [categoryName, description];
                categoryTB.query(createOneQuery, values, (err, data) => {
                    if (err) return callback(err, null);
                    else return callback(null, data.affectedRows);
                });
            }
        });
    },
    validate: ({ categoryName }, callback) => {

        categoryTB.connect(err => {
            if (err) return callback(err, null);
            else {
                const countQuery = `
                SELECT COUNT(c.categoryname) as duplicates
                FROM category as c
                WHERE c.categoryname = ?;
                `;
                const values = [categoryName];
                categoryTB.query(countQuery, values, (err, count) => {
                    if (err) return callback(err, null);
                    else {
                        const duplicates = count[0].duplicates;
                        return callback(null, duplicates);
                    };
                });
            }
        });
    }
};