'use strict';

const {application} = require('express');
const express = require('express');
const app = express();
const port = 3000;

let requestCounter = 0;

app.use(express.static('public'));
app.set('view engine', 'pug');

// app.get('/', (req, res) => {
//    res.send('Hello World!')
// });

// app.get('/catinfo', (req, res) => {
//   const cat = {
//     name: "Frank \'the cat\'",
//     birthdate: "2021-12-02",
//     weight: 25,
//   };
//   res.json(cat);
// });

app.get('/catinfo', (req, res) => {
  console.log('Trying to get catinfo');
 
  res.render('catinfo', {
    title:  "Frank \'the cat\'",
    header1: "Frank \'the cat\'",
    birthday: "birthday : 2021-12-02",
    weight: "weight : 20",
  });

});


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});