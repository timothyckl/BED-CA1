const express = require('express');
const productRouter = express.Router();
const productTB = require('../model/productTable');

productRouter.route('/')
    .post((req, res) => {

    });

productRouter.route('/:id')
    .get((req, res) => {

    })
    .delete((req, res) => {

    });

productRouter.route('/:id/review')
    .post((req, res) => {

    });

module.exports = productRouter;