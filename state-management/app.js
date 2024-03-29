'use strict';
const express = require('express');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const app = express();
const port = 3000;

const user = {
  username: 'foo',
  password: 'bar'
};

//dont do this
let loggedIn = false;

app.set('views', './views');
app.set('view engine', 'pug');
app.use(cookieParser());
app.use(express.json());   //for parsing application 
app.use(express.urlencoded({extended: true}));   //for form data
app.use(session({
  secret: 'kjsdaöklfnajsadfg34ttVAga',
  saveUninitialized: false,
  resave: true,
  cookie: {maxAge: 60000}
}))

app.get('/', (req, res) => {
  res.render('home');
});

app.get('/form', (req, res) => {
  res.render('form');
});

app.get('/secret', (req, res) => {
  if(req.session.loggedIn){
    res.render('secret');
  }else{
    res.redirect('/form');
  }
});

app.post('/login', (req,res) =>{
  console.log(req.body);
  if(req.body.username == user.username && req.body.password == user.password){
    req.session.loggedIn = true;
  }
  res.redirect('/secret');
  
});

app.get('/logout', (req, res) => {
  req.session.loggedIn = false;
  res.redirect('/');
})

app.get('/getCookie', (req, res) => {
  console.log(req.cookies);
  res.send('Your color of choice was : ' + req.cookies.color );
});

app.get('/deleteCookie', (req, res) => {
  res.clearCookie('color');
  res.send('Color cookie deleted' );
});

app.get('/setcookie/:color', (req, res) => {
  console.log(req.params.color);
  res.cookie('color', req.params.color);
  res.send('cookie set');
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
