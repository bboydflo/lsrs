var express = require('express');
var exphbs  = require('express-handlebars');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var app = express();

// get an instance of router
var router = express.Router();

// set default views directory
app.set('views', path.join(__dirname, 'views'));

// set express view engine
app.engine('.hbs', exphbs({extname: '.hbs', defaultLayout: 'main'}));
app.set('view engine', '.hbs');

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public/images/icons/', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// home page route (http://localhost:8080)
router.get('/', function(req, res) {
    // log
    console.log('index');
    // send static page
    res.sendFile(__dirname + '/public/index.html');
    // res.render('home', {'acasa': true, 'page-title': 'Acasa', 'path': 'index'});
    // res.send('im the home page!'); 
});

// about page route (http://localhost:8080/about)
router.get('/exploreaza', function(req, res) {
    res.render('exploreaza', {'acasa': false, 'page-title': 'Exploreaza', 'path': 'exploreaza'});
});

// route with parameters (http://localhost:8080/hello/:name)
router.get('/exploreaza/:filter', function(req, res) {
    // local vars
    var path = '', all = false, filter = req.params.filter;
    // options
    var options = {
        root: __dirname + '/public/',
        dotfiles: 'deny',
        headers: {
            'x-timestamp': Date.now(),
            'x-sent': true
        }
    };
    // log
    console.log('exploreaza -> ' + filter);
    // log path
    // console.log(req);
    // check filter
    if(filter && filter === 'all') {
        // all -> true
        all = true;
    }
    res.render('locatii', {'acasa': false, 'page-title': 'Exploreaza', 'path': 'locatii', 'all': all, 'filter': filter});
    // res.send('hello ' + req.params.filter + '!');
});

app.get('/contact', function (req, res) {
  res.sendfile(__dirname + '/public/contact.html');
});

// apply the routes to our application
app.use('/', router);

// default public directory serving static files
app.use(express.static(path.join(__dirname, 'public')));
// app.use('/css',express.static(__dirname+'/public/css'));
// app.use('/images',express.static(__dirname+'/public/imgages'));
// app.use('/js',express.static(__dirname+'/public/js'));

/*
app.get('/full', function(req, res) {
    // res.sendfile(__dirname + '/public/full-page.html');
    res.sendfile('./public/full-page.html');
});
*/

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