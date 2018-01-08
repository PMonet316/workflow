'use strict';

const express = require('express');
const path = require('path');
const volleyball = require('volleyball');
const bodyParser = require('body-parser');
const apiRouter = require('./api')
var session = require('express-session');
const app = express();

//logging middleware
app.use(volleyball);

//body parsing middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({
  secret: 'nature has no conscience no kindness or ill will',
  resave: false,
  saveUnitialized: false
}))

app.use('/api', (req, res, next) => {
  if (!req.session.counter) req.session.counter = 0;
  console.log('counter', ++req.session.counter);
  next();
});

// place right after the session setup middleware
app.use('/api', function (req, res, next) {
  console.log('session', req.session);
  next();
});

//static middleware
app.use(express.static(path.join(__dirname, '../public')));

app.use('/api', apiRouter); // include our routes!


app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
}); // Send index.html for any other requests

//error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).send(err.message || 'Internal server error');
});

module.exports = app;
