var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var assert = require('assert');
var cassandra = require('cassandra-driver');
var async = require('async');


// var authProvider = new cassandra.auth.PlainTextAuthProvider('fllamo', 'inn0W33k');
// //Set the auth provider in the clientOptions when creating the Client instance
// var client = new Client({authProvider: authProvider});

var client = new cassandra.Client({contactPoints: ['ec2-54-165-49-48.compute-1.amazonaws.com'], keyspace: 'words'});
client.connect(function(err){
    console.log(err);
});


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

var routes = require('./routes/index');
app.use('/', routes);


// ROUTES FOR OUR API
//+++++++++++++++++++++++++++++++
var router = express.Router();  // get an instance of the express Router
var user = require('./routes/user');
var submission = require('./routes/submission');
var wordOfTheDay = require('./routes/wordoftheday');

router.use(function(req, res, next){
    // do stuff
    console.log('doing stuff, YEAH!!');
    next();
});

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res){
    res.json({message: 'welcome to our api'});
});

// more routes here for API
user.attachRoutes(router, client);
submission.attachRoutes(router, client);
wordOfTheDay.attachRoutes(router, client);


// REGISTER OUR ROUTES
// all routes will be prefixed with /api
app.use('/api',router);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
