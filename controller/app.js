const express = require('express');
const app = express();
const userRouter = require('../routes/userRouter');
const categoryRouter = require('../routes/categoryRouter');

app.use(express.urlencoded({ extended: false }));
app.use(express.json());


// Use routers here
app.use('/users', userRouter);
app.use('/category', categoryRouter);

module.exports = app;