const express = require('express');
const productRouter = express.Router();
const productTB = require('../model/productTable');

productRouter.route('/')
    .post((req, res) => {
        productTB.createOne(req.body, (err, productid) => {
            if (err) res.status(500).json({ error: "Internal Server Error" });
            else res.status(201).json({ productid: productid });
        });
    });

productRouter.route('/:id')
    .get((req, res) => {
        const { id } = req.params;
        if (!isNaN(id)) {
            productTB.selectOne(id, (err, productInfo) => {
                if (err) res.status(500).json({ error: "Internal Server Error" });
                else if (productInfo.length == 0) res.status(404).json({ error: "Resource Not Found" })
                else res.status(200).json(productInfo);
            });
        } else res.status(500).json({ error: "Internal Server Error" });
    })
    .delete((req, res) => {
        const { id } = req.params;
        if (!isNaN(id)) {

        } else res.status(500).json({ error: "Internal Server Error" });
    });

productRouter.route('/:id/review')
    .post((req, res) => {

    });

module.exports = productRouter;