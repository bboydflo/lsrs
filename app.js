var express = require('express');
var path = require('path');
// var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var app = express();

// New Code
// var mongo = require('mongodb');
// var monk = require('monk');
// var db = monk('localhost:27017/couchsurfing');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

/*// Make our db accessible to our router
app.use(function(req,res,next){
    req.db = db;
    next();
});*/

app.get('/', function (req, res) {
  // res.send('Hello World!');
  res.sendfile(__dirname + '/public/index.html');
});

app.get('/acasa', function (req, res) {
  // res.send('Hello World!');
  res.sendfile(__dirname + '/public/index.html');
});

app.get('/exploreaza', function (req, res) {
  // res.send('Hello World!');
  res.sendfile(__dirname + '/public/exploreaza.html');
});

app.get('/contact', function (req, res) {
  // res.send('Hello World!');
  res.sendfile(__dirname + '/public/contact.html');
});

/* GET Userlist page. */
app.get('/users', function(req, res) {
    var db = req.db;
    var collection = db.get('userCollection');
    collection.find({},{},function(e, docs){
        res.render('userlist', {
            'userlist' : docs
        });
    });
});

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
    next = null;
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
  next = null;
});


module.exports = app;