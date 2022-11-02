'use strict';
const express = require('express');
const router = require('./routes/catRoute');
const app = express();
const catRouter = require('./routes/catRoute');
const userRouter = require ('./routes/userRouter')
const port = 3000;

app.use('/cat', catRouter);
app.use('/user', userRouter);

app.get('/user', (req, res) => {
  res.send('From this endpoint you can get cats.')
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
