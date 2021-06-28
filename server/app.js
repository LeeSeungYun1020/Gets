const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const sassMiddleware = require('node-sass-middleware');

const indexRouter = require('./routes/index');
const apiRouter = require('./routes/api');
const inputRouter = require('./routes/input');
const accountRouter = require('./routes/account');
const closetRouter = require('./routes/closet');
const productRouter = require('./routes/product');
const cartRouter = require('./routes/cart');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile)

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(sassMiddleware({
	src: path.join(__dirname, 'public'),
	dest: path.join(__dirname, 'public'),
	indentedSyntax: false, // true = .sass and false = .scss
	sourceMap: true
}));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/node_modules', express.static(path.join(__dirname, 'node_modules')))
app.use(express.static(path.join(__dirname, 'node_modules')))

app.use('/', indexRouter)
app.use('/api', apiRouter)
app.use('/input', inputRouter)
app.use('/closet', closetRouter)
app.use('/product', productRouter)
app.use('/account', accountRouter)
app.use('/cart', cartRouter)

app.get('/*.html', (req, res) => {
	res.render(req.params[0] + '.html')
})
app.get('/*.ejs', (req, res) => {
	res.render(req.params[0] + '.ejs')
})

// catch 404 and forward to error handler
app.use(function (req, res, next) {
	next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};
	
	// render the error page
	res.status(err.status || 500);
	res.render('error');
});

module.exports = app;
