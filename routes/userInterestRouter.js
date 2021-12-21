const express = require('express');
const userIntRouter = express.Router();
const userIntTB = require('../model/userInterestTable');

userIntRouter.post('/:userid', (req, res) => {
    // POST /interest/:userid

    // Request body schema:
    // One or more category ids separated by “,” 
    // {
    // 	categoryids:1,2,4
    // }

    // Success code: 201

    // Error code: 500
    // Condition: Unknown error
    const { userid } = req.params;
    if (isNaN(userid)) res.status(500).json({ error: "Internal Server Error" });
    else {
        userIntTB.addInterests(userid, req.body, (err) => {
            if (err) res.status(500).json({ error: "Internal Server Error" });
            else res.status(201).json();
        });
    }
});

module.exports = userIntRouter;