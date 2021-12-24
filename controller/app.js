const express = require('express');
const morgan = require('morgan');
const fs = require('fs');
const path = require('path');
const app = express();

const userRouter = require('../routes/userRouter');
const categoryRouter = require('../routes/categoryRouter');
const productRouter = require('../routes/productRouter');
const userIntRouter = require('../routes/userInterestRouter');
const promoCodeRouter = require('../routes/promoCodeRouter');

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(morgan('tiny', {
    stream: fs.createWriteStream(path.join(process.cwd(), 'access.log'), { flags: 'a' })
}));

// Use routers here
app.use('/users', userRouter);
app.use('/category', categoryRouter);
app.use('/product', productRouter);
app.use('/interest', userIntRouter);
app.use('/promotion', promoCodeRouter);

app.all('*', (req, res) => {
    res.status(405).json({ error: 'Target resource does not support this method' });
});

module.exports = app;