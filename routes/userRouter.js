const express = require('express');
const userRouter = express.Router();
const userTB = require('../model/userTable');

userRouter.route('/')
    .get((req, res) => {
        userTB.selectAll((err, data) => {
            if (err) res.status(500).json({ error: err });
            else res.status(200).json({ data: data });
        });
    });

userRouter.route('/:id')
    .get((req, res) => {
        const { id } = req.params;
        userTB.selectOne(id, (err, data) => {
            if (err) res.status(500).json({ error: err });
            else res.status(200).json({ data: data });
        });
    })
    .put((req, res) => {
        const { id } = req.params;
        userTB.updateOne(id, req.body, (err, data) => {
            if (err) res.status(500).json({ error: err });
            else res.status(204).send(`Success! Rows updated: ${data}`);
        });
    })
    .post();

module.exports = userRouter;