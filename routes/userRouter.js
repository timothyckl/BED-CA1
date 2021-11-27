const express = require('express');
const fileUpload = require('express-fileupload');
const image = require('../middleware/image');

const userRouter = express.Router();
const userTB = require('../model/userTable');

userRouter.use(fileUpload({}));

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
            else if (data > 0) res.status(422).json({ error: 'Username/Email already exists. Try again.' });
            else {
                const { profilePic } = req.files;
                const { size } = profilePic;
                const lessThan1MB = size < 1000000;
                const imageFormat = profilePic.mimetype.split('/')[1];
                const correctFormat = imageFormat == ('jpg' || 'png');
                if (lessThan1MB) {
                    if (correctFormat) {
                        profilePic.mv(filePath, err => {
                            if (err) res.status(500).json(err);
                            else userTB.createOne(req.body, filePath, (err, data) => {
                                if (err) res.status(500).json({ error: err });
                                else res.status(201).json({ msg: `Success! Rows affected: ${data}` });
                            });
                        });
                    } else res.status(500).json({ error: `File must be in jpg/png format. Try again.` });
                } else res.status(500).json({ error: `File must be less than 1MB. Try again.` });
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