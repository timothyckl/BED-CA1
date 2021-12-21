const express = require('express');
const app = express();
const userRouter = require('../routes/userRouter');
const categoryRouter = require('../routes/categoryRouter');
const productRouter = require('../routes/productRouter');
const userIntRouter = require('../routes/userInterestRouter');

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Use routers here
app.use('/users', userRouter);
app.use('/category', categoryRouter);
app.use('/product', productRouter);
app.use('/interest', userIntRouter);

app.all('*', (req, res) => {
    res.status(405).json({ error: 'Target resource does not support this method' });
});

module.exports = app;