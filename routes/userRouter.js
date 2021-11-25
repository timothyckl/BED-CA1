const express = require('express');
const userRouter = express.Router();
const userTB = require('../model/userTable');

userRouter.route('/')
    .get((req, res) => {
        userTB.selectAll((err, data) => {
            if (err) res.status(500).json({ error: err });
            else res.status(200).json({ data: data })
        });
    });

module.exports = userRouter;

