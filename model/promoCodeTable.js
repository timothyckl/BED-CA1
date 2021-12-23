const db = require('./dbConfig');

module.exports = {
    selectAllPromos: callback => {
        const promoTB = db.getConn();

        promoTB.connect(err => {
            if (err) return callback(err, null);
            else {
                const selectQuery = `
                SELECT
                    p1.productid,
                    p2.name,
                    p1.startDate,
                    p1.endDate,
                    p1.discountAmount
                FROM 
                    promo_codes AS p1,
                    product AS p2
                WHERE 
                    p1.productid = p2.productid;
                `;

                promoTB.query(selectQuery, (err, allPromoInfo) => {
                    promoTB.end();
                    if (err) return callback(err, null);
                    else return callback(null, allPromoInfo);
                });
            }
        });
    },
    selectProductPromo: (productid, callback) => {
        const promoTB = db.getConn();

        promoTB.connect(err => {
            if (err) return callback(err, null);
            else {
                const selectQuery = `
                SELECT
                    p1.productid,
                    p2.name,
                    p1.startDate,
                    p1.endDate,
                    p1.discountAmount
                FROM 
                    promo_codes AS p1,
                    product AS p2
                WHERE 
                    p1.productid = p2.productid
                AND 
                    p1.productid = ?;
                `;

                promoTB.query(selectQuery, productid, (err, promoInfo) => {
                    promoTB.end();
                    if (err) return callback(err, null);
                    else return callback(null, promoInfo);
                });
            }
        });
    },
    createPromo: ({ productid, startDate, endDate, discountAmount }, callback) => {
        const promoTB = db.getConn();

        promoTB.connect(err => {
            if (err) return callback(err, null);
            else {
                const insertQuery = `
                INSERT INTO
                    promo_codes
                    (productid, startDate, endDate, discountAmount)
                VALUES 
                    (?, ?, ?, ?);
                `;
                const values = [productid, startDate, endDate, discountAmount];

                promoTB.query(insertQuery, values, (err, data) => {
                    promoTB.end();
                    if (err) return callback(err, null);
                    else return callback(null, data.affectedRows);
                });
            }
        });
    },
    deletePromo: (promoID, callback) => {
        const promoTB = db.getConn();

        promoTB.connect(err => {
            if (err) return callback(err, null);
            else {
                const deleteQuery = `
                DELETE FROM 
                    promo_codes
                WHERE
                    promoid = ?;
                `;

                promoTB.query(deleteQuery, promoID, (err, data) => {
                    promoTB.end();
                    if (err) return callback(err, null);
                    else return callback(null, data);
                });
            }
        });
    }
}