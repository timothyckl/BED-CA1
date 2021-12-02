const express = require('express');
const app = express();
const userRouter = require('../routes/userRouter');
const categoryRouter = require('../routes/categoryRouter');
const productRouter = require('../routes/productRouter');

app.use(express.urlencoded({ extended: false }));
app.use(express.json());


// Use routers here
app.use('/users', userRouter);
app.use('/category', categoryRouter);
app.use('/product', productRouter);

module.exports = app;