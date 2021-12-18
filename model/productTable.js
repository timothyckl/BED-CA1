const db = require('./dbConfig');
const productTB = db.getConn();

module.exports = {
    selectOne: (productid, callback) => {
        productTB.connect(err => {
            if (err) return callback(err);
            else {
                const selectOneQuery = `
                SELECT 
                    p.name, 
                    p.description, 
                    p.categoryid, 
                    c.categoryname, 
                    p.brand, 
                    p.price 
                FROM 
                    product as p, 
                    category as c 
                WHERE 
                    p.productid = ? 
                AND 
                    p.categoryid = c.categoryid;
                `;

                productTB.query(selectOneQuery, productid, (err, productInfo) => {
                    if (err) return callback(err);
                    else return callback(null, productInfo);
                });
            }
        });
    },
    createOne: ({
        name,
        description,
        categoryid,
        brand,
        price
    }, callback) => {
        productTB.connect(err => {
            if (err) return callback(err, null);
            else {
                const createOneQuery = `
                INSERT INTO
                    product
                    (name, description, categoryid, brand, price)
                VALUES 
                    (?, ?, ?, ?, ?);
                `;
                const values = [name, description, categoryid, brand, price];
                productTB.query(createOneQuery, values, (err, affectedRows) => {
                    if (err) return callback(err, null);
                    else {
                        const selectQuery = `
                        SELECT 
                            productid
                        FROM 
                            product
                        ORDER BY 
                            productid
                        DESC LIMIT 1;
                        `;
                        productTB.query(selectQuery, (err, productid) => {
                            const pid = productid[0].productid;
                            if (err) return callback(err, null);
                            else return callback(null, pid);
                        });
                    };
                });
            }
        });
    },
    deleteOne: (productid, callback) => {
        productTB.connect(err => {
            if (err) return callback(err, null);
            else {
                const deleteQuery = `
                DELETE FROM
                    product
                WHERE
                    productid = ?;
                `;

                productTB.query(deleteQuery, productid, (err, data) => {
                    if (err) return callback(err, null);
                    else return callback(null, data);
                });
            }
        });
    }
};