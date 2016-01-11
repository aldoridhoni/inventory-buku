'use strict';
/*
 * CRUD application using express and mongodb
 * Book Inventory
 */

// Express init
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const port = 3000;
const bodyParser = require('body-parser');
const config = require('./config.js');

var hbs = require('express-handlebars').create({
	layoutsDir: './app/views/layouts/',
	defaultLayout: 'main',
	extname: '.hbs',
	helpers: require('./helpers.js'),
	compilerOptions: {}
});

// Env
app.set('x-powered-by', false)
app.set('views', __dirname + '/app/views');
app.use(express.static('public/'));
app.engine('.hbs', hbs.engine);
app.set('view engine', '.hbs');
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

// Import Models
require('./app/models/authors');
require('./app/models/books');
require('./app/models/publishers');

// Routes
var books = require('./app/routes/books');
var publishers = require('./app/routes/publishers');
var authors = require('./app/routes/authors');
app.use('/book', books);
app.use('/publisher', publishers);
app.use('/author', authors);

app.get('/', function (req, res) {
	res.render('home');
});
app.get('/favicon.ico', function (req, res) {
    res.send('\n');
});

// Main loop
connect()
  .on('error', console.log)
  .on('disconnected', connect)
  .once('open', listen);

function listen () {
  app.listen(port);
  console.log('Express app started on port ' + port);
}

function connect () {
  var options = {server: {socketOptions: {keepAlive: 1}}};
  return mongoose.connect(config.db, options).connection;
}
