const express = require('express');
const categoryRouter = express.Router();
const categoryTB = require('../model/categoryTable');

categoryRouter.route('/')
    .get((req, res) => {
        // categoryTB.selectAll();
    })
    .post((req, res) => {
        // categoryTB.createOne();
    });



module.exports = categoryRouter;