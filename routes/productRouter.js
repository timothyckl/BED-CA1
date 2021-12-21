const express = require('express');
const productRouter = express.Router();
const productTB = require('../model/productTable');

productRouter.route('/')
    .post((req, res) => {
        // POST /product/
        // Request body schema:
        // {
        //      "name": "SP AMD Ryzen 3600 Laptop",
        //      "description": "Best Laptop",
        //      “categoryid”: 1,
        //      “brand”: “SP IT!”
        //      "price”:”1855.50”
        // }

        // Success Code: 201
        // Content: ID of the newly created listing
        // {
        //      "productid": 1
        // }

        // Error Code: 500
        // Condition: Unknown Error
        productTB.createOne(req.body, (err, productid) => {
            if (err) res.status(500).json({ error: "Internal Server Error" });
            else res.status(201).json({ productid: productid });
        });
    });

productRouter.route('/:id')
    .get((req, res) => {
        // GET /product/:id/
        // Request body schema: N/A

        // Success Code: 200
        // Content: Info of the matching product (including category name)
        // {
        //     "name": " SP AMD Ryzen 3600 Laptop",
        //     "description": "Best Laptop",
        //      “categoryid”: 1,
        //      “categoryname”,“Laptop”,
        //      “brand”: “SP IT!”
        //     "price”:”1855.50”
        // },

        // Error Code: 500
        // Condition: Unknown Error
        const { id } = req.params;
        if (isNaN(id)) res.status(500).json({ error: "Internal Server Error" })
        else {
            productTB.selectOne(id, (err, productInfo) => {
                if (err) res.status(500).json({ error: "Internal Server Error" });
                else if (productInfo.length == 0) res.status(404).json({ error: "Resource Not Found" })
                else res.status(200).json(productInfo);
            });
        };
    })
    .delete((req, res) => {
        // DELETE /product/:id/
        // Request body schema: N/A

        // Success Code: 204
        // Content: N/A

        // Error Code: 500
        // Condition: Unknown Error
        const { id } = req.params;
        if (isNaN(id)) res.status(500).json({ error: "Internal Server Error" });
        else {
            productTB.deleteOne(id, (err) => {
                if (err) res.status(500).json({ error: "Internal Server Error" });
                else res.status(204).json();
            });
        }
    });

productRouter.post('/:id/review', (req, res) => {
    // POST /product/:id/review/
    // Request body schema:
    // {
    //     “userid”:1,
    //     “rating”:5,
    //     "review": “Good Laptop, super fast and can play game in class!”
    // }

    // Success Code: 201
    // Content: ID of the newly created listing
    // {
    //     "reviewid": 1
    // }

    // Error Code: 500
    // Condition: Unknown Error
    const { id } = req.params;
    if (isNaN(id)) res.status(500).json({ error: "Internal Server Error" });
    else {
        productTB.createReview(id, req.body, (err, reviewid) => {
            if (err) res.status(500).json({ error: "Internal Server Error" });
            else res.status(201).json(reviewid);
        });
    }
});

productRouter.get('/:id/reviews', (req, res) => {
    // GET /product/:id/reviews/
    // Request body schema: N/A

    // Success Code: 200
    // Content: Retrieves all the reviews of a particular product, including the username of the reviewer (tables join required).
    // [
    //     {
    //        "productid":1,
    //         “userid”:1,
    //          “username”:”Terry Tan”,
    //         “rating”:5
    //         "review": “Good Laptop, love gaming in school!”,
    //         "created_at": "2021-11-15 18:54:57"
    //     },
    //     ...
    // ]

    // Error Code: 500
    // Condition: Unknown Error
    const { id } = req.params;
    if (isNaN(id)) res.status(500).json({ error: "Internal Server Error" });
    else {
        productTB.selectReview(id, (err, reviews) => {
            if (err) res.status(500).json({ error: "Internal Server Error" });
            else res.status(200).json(reviews);
        });
    }
});

module.exports = productRouter;