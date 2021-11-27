const express = require('express');
const categoryRouter = express.Router();
const categoryTB = require('../model/categoryTable');

categoryRouter.route('/')
    .get((req, res) => {
        // res.send('pogs!');
        categoryTB.selectAll((err, data) => {
            if (err) res.status(500).json({ error: err });
            else res.status(200).json({ data: data });
        });
    })
    .post((req, res) => {
        // categoryTB.createOne();
    });

module.exports = categoryRouter;