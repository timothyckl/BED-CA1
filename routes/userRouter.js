const express = require('express');
const fileUpload = require('express-fileupload');
const image = require('../middleware/image');

const userRouter = express.Router();
const userTB = require('../model/userTable');

userRouter.use(fileUpload());

userRouter.route('/')
    .get((req, res) => {
        // GET /users/

        // Success Code: 200
        // Content: Array of all the users (subset of users’ data) in the database, who may be admin or customer type
        // [
        //     {
        //         "userid": 1,
        //         "username": "Terry Tan",
        //         “email”: “terry@gmail.com”,
        //         "contact": "91234567",
        //         "type": "Customer",
        //         "profile_pic_url": "https://www.abc.com/terry.jpg",
        //         "created_at": "2021-11-02 17:54:57"
        //     },
        //     ...
        // ]

        // Error Code: 500
        // Condition: Unknown error
        userTB.selectAll((err, allUsers) => {
            if (err) res.status(500).json({ error: err });
            else res.status(200).json(allUsers);
        });
    })
    .post((req, res) => {
        // POST /users/

        // Success Code: 201
        // Content: ID of the newly created user
        // {
        //  "userid": 1
        // }

        // Error Code: 422
        // Condition: The new username OR new email provided already exists.
        // Error Code: 500
        // Condition: Unknown error

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
                let profilePic;

                if (req.files) profilePic = req.files.profilePic;
                else profilePic = null;

                image.validateFile(profilePic, err => {
                    if (err) res.status(500).json({ error: err.message });
                    else {
                        const filePath = image.getFilePath(profilePic)
                        console.log(filePath);
                        userTB.createOne(req.body, filePath, (err, affectedRows) => {
                            if (err) res.status(500).json({ error: err });
                            else res.status(201).json({ "Affected rows": affectedRows });
                        });
                    };
                });
            }
        });
    });

userRouter.route('/:id')
    .get((req, res) => {
        // GET /users/:id/

        // Success Code: 200
        // Content: Subset of the data of the matching single user
        // {
        //      "userid": 1,
        //      "username": "Terry Tan",
        //      “email”: “terry@gmail.com”,
        //      "contact": "91234567",
        //      "type": "Customer",
        //      "profile_pic_url": "https://www.abc.com/terry.jpg",
        //      "created_at": "2021-11-02 17:54:57"
        // }

        // Error Code: 500
        // Condition: Unknown error
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
        // PUT /users/:id/

        // Success Code: 204
        // Content:Refer to the request body schema for the POST /users endpoint.

        // Error Code: 422
        // Condition: The new username OR new email provided already exists.
        // Error Code: 500
        // Condition: Unknown error
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