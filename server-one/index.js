'use strict';

const express = require('express');
const app = express();
const port = 3000;

app.use(express.static('public'));

app.get('/', (req, res) => {
   res.send('Hello World!')
});

app.get('/catinfo', (req, res) => {
  const cat = {
    name: "Frank the cat",
    birthdate: "2021-12-01",
    weight: 19,
  };
  res.json(cat);
});


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});