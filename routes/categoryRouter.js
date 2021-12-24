const express = require('express');
const categoryRouter = express.Router();
const categoryTB = require('../model/categoryTable');

categoryRouter.route('/')
    .get((req, res) => {
        categoryTB.selectAll((err, allCategories) => {
            if (err) res.status(500).json({ error: err });
            else res.status(200).json(allCategories);
        });
    })
    .post((req, res) => {
        categoryTB.validate(req.body, (err, duplicates) => {
            if (err) return callback(err, null);
            else if (duplicates > 0) res.status(422).json({ error: 'Category already exists. Try again.' });
            else {
                categoryTB.createOne(req.body, (err, affectedRows) => {
                    if (err) res.status(500).json({ error: err });
                    else res.status(204).json({ "Affected rows": affectedRows });
                });
            }
        });
    });

module.exports = categoryRouter;