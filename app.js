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

// var client = new cassandra.Client({contactPoints: ['ec2-54-165-49-48.compute-1.amazonaws.com'], keyspace: 'demo'});
// client.connect(function(err){
//     console.log(err);
// });

var routes = require('./routes/index');
var users = require('./routes/users');

var router = express.Router();

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

app.use('/', routes);
app.use('/users', users);

// ROUTES FOR OUR API
//+++++++++++++++++++++++++++++++
var router = express.Router();  // get an instance of the express Router

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

// on routes Users
router.route('/users')
    .post(function(req, res){
        var user = new User();

        res

    });


// REGISTER OUR ROUTES
// all routes will be prefixed with /api
app.use('/api',router);


// var query = 'SELECT * FROM users';
// client.execute(query, '', function(err, result) {
//   assert.ifError(err);
//   console.log('got user profile with email ' + result.rows[0].email);
// });


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