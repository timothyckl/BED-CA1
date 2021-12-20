const express = require('express');
const categoryRouter = express.Router();
const categoryTB = require('../model/categoryTable');

categoryRouter.route('/')
    .get((req, res) => {
        // GET /category/

        // Success Code: 200
        // Content: Array of all the users (subset of users’ data) in the database, who may be admin or customer type
        //[
        //  {
        //       “category": "1",
        //       “category": "Laptops",
        //       “description”: “Light and high performance laptops for school”

        //  },
        //  …
        // ]


        // Error Code: 500
        // Condition: Unknown error
        categoryTB.selectAll((err, allCategories) => {
            if (err) res.status(500).json({ error: err });
            else res.status(200).json(allCategories);
        });
    })
    .post((req, res) => {
        // POST /category/

        // Request body schema:
        // {
        //     “category ": "Laptops",
        //     “description”: “Light and high performance laptops for school”
        // }

        // Success Code: 204
        // Content: N/A

        // Error Code: 422
        // Condition: The category name provided already exists.
        // Error Code: 500
        // Condition: Unknown error
        categoryTB.validate(req.body, (err, duplicates) => {
            if (err) return callback(err, null);
            else if (duplicates > 0) res.status(422).json({ error: 'Category already exists. Try again.' });
            else {
                categoryTB.createOne(req.body, (err, affectedRows) => {
                    if (err) res.status(500).json({ error: err });
                    else res.status(200).json({ "Affected rows": affectedRows });
                });
            }
        });
    });

module.exports = categoryRouter;