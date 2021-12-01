const express = require('express');
const fileUpload = require('express-fileupload');
const image = require('../middleware/image');

const userRouter = express.Router();
const userTB = require('../model/userTable');

userRouter.use(fileUpload());

userRouter.route('/')
    .get((req, res) => {
        userTB.selectAll((err, allUsers) => {
            if (err) res.status(500).json({ error: err });
            else res.status(200).json(allUsers);
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
                image.validateFile(profilePic, err => {
                    if (err) res.status(500).json({ error: err.message });
                    else {
                        const filePath = image.getFilePath(profilePic)
                        userTB.createOne(req.body, filePath, (err, affectedRows) => {
                            if (err) res.status(500).json({ error: err });
                            else res.status(201).json({ "Affected rows": affectedRows });
                        });
                    }
                });
            }
        });
    });

userRouter.route('/:id')
    .get((req, res) => {
        const { id } = req.params;
        if (isNaN(id)) res.status(500).json({ err: 'User ID is not a number. Try again.' });
        else {
            userTB.selectOne(id, (err, userData) => {
                if (err) res.status(500).json({ error: err });
                else if (userData.length == 0) res.status(404).json({ err: 'User not found.Try again' });
                else res.status(200).json(userData);
            });
        }
    })
    .put((req, res) => {
        const { id } = req.params;
        if (isNaN(id)) res.status(500).json({ err: 'User ID is not a number. Try again.' });
        else {
            userTB.validateData(req.body, (err, data) => {
                if (err) res.status(500).json({ error: err });
                // if duplicates are found, data will be > 0
                else if (data > 0) res.status(422).json({ err: 'Username/Email already exists. Try again.' });
                else {
                    userTB.updateOne(id, req.body, (err, affectedRows) => {
                        if (err) res.status(500).json({ error: err });
                        else res.status(204).json({ "Affected rows": affectedRows });
                    });
                };
            });
        }
    });

module.exports = userRouter;