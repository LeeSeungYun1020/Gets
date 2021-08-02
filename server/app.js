const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const sassMiddleware = require('node-sass-middleware');
const connection = require('./lib/mysql');
const session = require('express-session');
const sessionMySQLStore = require('express-mysql-session')(session)
const cors = require("cors")

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile)

app.use(express.static('product/image'))
app.use(logger('dev'));
app.use(cors({
	credentials: true,
	origin: true
}))
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

app.use(function (req, res, next) {
	let locale = req.acceptsLanguages()[0].substr(0, 2)
	if (locale !== 'ko' && locale !== 'en')
		locale = 'en'
	req.body.locale = locale
	next();
});

const sessionStore = new sessionMySQLStore({
	host: 'localhost',
	port: 3306,
	user: 'leeseungyun',
	password: 'lsy1020',
	database: 'session'
})

app.use(session({
	key: "session",
	secret: '6W-b6w5CG-X84m9',
	resave: false,
	saveUninitialized: true,
	store: sessionStore
}))
const passport = require('./lib/passport.js')(app, connection)

const indexRouter = require('./routes/index');
const apiRouter = require('./routes/api')(passport)
const homeRouter = require('./routes/home')(passport)
const inputRouter = require('./routes/input');
const accountRouter = require('./routes/account')(passport);
const closetRouter = require('./routes/closet');
const productRouter = require('./routes/product')(passport);
const cartRouter = require('./routes/cart');
const articleRouter = require('./routes/article');
const aboutRouter = require('./routes/about');

app.use('/', indexRouter)
app.use('/api', apiRouter)
app.use('/home', homeRouter)
app.use('/input', inputRouter)
app.use('/closet', closetRouter)
app.use('/product', productRouter)
app.use('/account', accountRouter)
app.use('/cart', cartRouter)
app.use('/article', articleRouter)
app.use('/about', aboutRouter)

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
