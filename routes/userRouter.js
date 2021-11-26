const express = require('express');
const userRouter = express.Router();
const userTB = require('../model/userTable');

userRouter.route('/')
    .get((req, res) => {
        userTB.selectAll((err, data) => {
            if (err) res.status(500).json({ error: err });
            else res.status(200).json({ data: data });
        });
    })
    .post((req, res) => {
        const {
            username,
            email
        } = req.body;

        userTB.validateData({
            newUsername: username,
            newEmail: email
        }, (err, data) => {
            if (err) res.status(500).json({ err: err });
            else if (data > 0) res.status(422).json({ error: 'Username/Email already exists. Try again.' }); // does not execute... instead throws err object at line 19
            else {
                userTB.createOne(req.body, (err, data) => {
                    if (err) res.status(500).json({ error: err });
                    else res.status(201).json({ msg: `Success! Rows affected: ${data}` });
                });
            }
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
        userTB.validateData(req.body, (err, data) => {
            if (err) res.status(500).json({ error: err });
            // if duplicates are found, data will be > 0
            else if (data > 0) res.status(422).json({ err: 'Username/Email already exists. Try again.' });
            else {
                userTB.updateOne(id, req.body, (err, data) => {
                    if (err) res.status(500).json({ error: err });
                    else res.status(204).json();
                });
            };
        });
    });

module.exports = userRouter;

// if (err) res.status(500).json({ error: err });
//             // if duplicates are found, data will be > 0
//             else if (data > 0) res.status(422).json({ error: 'Username/Email already exists. Try again.' }); // does not execute... instead throws err object at line 19
//             else {
//                 userTB.createOne(req.body, (err, data) => {
//                     if (err) res.status(500).json({ error: err });
//                     else res.status(201).json({ msg: `Success! Rows affected: ${data}` });
//                 });
//             }