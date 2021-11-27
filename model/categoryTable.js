const db = require('./dbConfig');
const categoryTB = db.getConn();

module.exports = {
    selectAll: (callback) => {
        const selectAllQuery = `
        SELECT c.categoryname, c.description
        FROM category as c;
        `;
        categoryTB.query(selectAllQuery, (err, data) => {
            if (err) return callback(err);
            else return callback(null, data);
        });
    },
    createOne: ({ categoryName, description }, callback) => {

    }
};