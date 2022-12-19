require('dotenv').config()


var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var outletsRouter = require('./routes/outlets')
var bookingsRouter = require('./routes/bookings')
var transactionsRouter = require ('./routes/transactions')
require('./models/connection');

var app = express();

const cors = require('cors');
app.use(cors());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/outlets', outletsRouter)
app.use('/bookings', bookingsRouter)
app.use('/transactions', transactionsRouter)

module.exports = app;
