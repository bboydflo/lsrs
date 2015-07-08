var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var app = express();

// set express view engine
app.set('view engine', 'hbs');
// set default views directory
app.set('views', path.join(__dirname, 'views'));

// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public/images/icons/', 'favicon.ico')));
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// static files
app.use('/assets', express.static(__dirname + '/public/assets'));
app.use('/css', express.static(__dirname + '/public/css'));
app.use('/images', express.static(__dirname + '/public/images'));
app.use('/js', express.static(__dirname + '/public/js'));
app.use('/pages-js', express.static(__dirname + '/public/js/pages-js'));

// website route
app.get('/', function(req, res) {
    // log
    console.log('index');
    // send static page
    res.sendFile(__dirname + '/public/index.html');
    // res.render('home', {'acasa': true, 'page-title': 'Acasa', 'path': 'index'});
    // res.send('im the home page!'); 
});

// login route
app.get('/login', function(req, res) {
    // render login page
    res.render('login', {'path': 'login'});
});

// register route
app.get('/register', function(req, res) {
    // render login page
    res.render('register', {'path': 'register', 'register': true});
});

var routeExploreaza = express.Router();

// exploreaza route
routeExploreaza.get('/', function(req, res) {
    // get query filter
    var filter = req.query.filter;

    if(typeof filter === 'string' && filter.length) {
        res.render('locatii', {
            'acasa': false,
            'page-title': 'Exploreaza',
            'path': 'locatii',
            'filter': filter
        });
    } else {
        res.render('exploreaza', {
            'acasa': false,
            'page-title': 'Exploreaza',
            'path': 'exploreaza',
            'src': '../public'
        });
    }
});

// exploreaza route with parameter
/*routeExploreaza.get('/:filter', function(req, res) {
    // local vars
    var all = false, filter = req.params.filter;
    // check filter
    if(filter && filter === 'all') {
        // all -> true
        all = true;
    }
    res.render('locatii', {
        'acasa': false,
        'page-title': 'Exploreaza',
        'path': 'locatii',
        'all': all,
        'filter': filter
    });
    // res.send('hello ' + req.params.filter + '!');
});*/

app.get('/full', function(req, res) {
    // res.sendfile(__dirname + '/public/full-page.html');
    res.sendfile('./public/full-page.html');
});

app.use('/exploreaza', routeExploreaza);

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