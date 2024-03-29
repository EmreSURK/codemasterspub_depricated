var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');

var indexPage = require('./routes/index');
//var users = require('./routes/users');
//var ajax = require('./routes/ajax');

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(function (req, res, next) {
	res.locals.req = req;
	next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({secret: 'gasytaGSFyasg5SAFS5f1s'}));

app.use('/',require('./sources/Helpers/SessionHelper'));
app.use('/login', require('./routes/login.js'));
app.use('/register', require('./routes/register.js'));
app.use('/logout', require('./routes/logout.js'));
app.use('/post', require('./routes/post.js'));
app.use('/user', require('./routes/user.js'));
app.use('/', indexPage);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
	var err = new Error('Not Found');
	err.status = 404;
	next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
	app.use(function (err, req, res, next) {
		res.status(err.status || 500);
		res.render('error', {
			message: err.message,
			error: err
		});
	});
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
	res.status(err.status || 500);
	res.render('error', {
		message: err.message,
		error: {}
	});
});


module.exports = app;
