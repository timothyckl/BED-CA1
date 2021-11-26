const db = require('./dbConfig');
const productTB = db.getConn();

module.exports = {
    selectOne: (product_id, callback) => {
        productTB.connect(err => {
            if (err) return callback(err);
            else {
                const selectOneQuery = `
                table join product and category table
                `;
                const values = product_id;

                productTB.query(selectOneQuery, values, (err, data) => {
                    if (err) return callback(err);
                    else return callback(null, err);
                });
            }
        });
    },


};