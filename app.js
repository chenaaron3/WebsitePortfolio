var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var sassMiddleware = require('node-sass-middleware');
require('dotenv').config();

var indexRouter = require('./routes/index');
var aboutRouter = require('./routes/about');
var experienceRouter = require('./routes/experience');
var projectsRouter = require('./routes/projects');
var contactRouter = require('./routes/contact');
var webhooksRouter = require('./routes/webhooks');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(sassMiddleware({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  indentedSyntax: true, // true = .sass and false = .scss
  sourceMap: true
}));
app.use(express.static(path.join(__dirname, 'client/build')));
app.use(express.static("public"));

app.use('/', indexRouter)
app.use('/about', aboutRouter);
app.use('/experience', experienceRouter);
app.use('/projects', projectsRouter);
app.use('/contact', contactRouter);
app.use('/webhooks', webhooksRouter);

app.get('*', function(req, res) {
  res.sendFile('index.html', {root: path.join(__dirname, 'client/build/')});
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
