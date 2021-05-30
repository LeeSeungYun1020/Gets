const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const sassMiddleware = require('node-sass-middleware');

const indexRouter = require('./routes/index');
const apiRouter = require('./routes/api');
const inputRouter = require('./routes/input');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile)

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
app.use(express.static(path.join(__dirname, 'public')));
app.use('/node_modules', express.static(path.join(__dirname, 'node_modules')))
app.use(express.static(path.join(__dirname, 'node_modules')))

app.use('/', indexRouter);
app.use('/api', apiRouter);
app.use('/input', inputRouter);
app.get('/category', (req, res) => {
  res.send("카테고리 기능 구현")
})
app.get('/closet', (req, res) => {
  res.send("옷장 기능 구현")
})
app.get('/coordination', (req, res) => {
  res.send("코디 기능 구현")
})
app.get('/*.html', (req, res) => {
  res.render(req.params[0] + '.html')
})
app.get('/*.ejs', (req, res) => {
  res.render(req.params[0] + '.ejs')
})

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
