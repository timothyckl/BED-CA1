const express = require('express');
const app = express();
const userRouter = require('../routes/userRouter');

app.use(express.urlencoded({ extended: false }));
app.use(express.json());


// Use routers here
app.use('/users', userRouter);

module.exports = app;