var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const hbs = require('hbs');

var indexRouter = require('./app_server/routes/index');
var usersRouter = require('./app_server/routes/users');
const travelRouter = require('./app_server/routes/travel'); // NEW
const ContactRouter = require('./app_server/routes/contact'); // NEW
const AboutRouter = require('./app_server/routes/about'); // NEW
const MealsRouter = require('./app_server/routes/meals'); // NEW
const RoomsRouter = require('./app_server/routes/rooms'); // NEW
const NewsRouter = require('./app_server/routes/news'); // NEW


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'app_server', 'views'));

app.set('view engine', 'hbs');
// register handlebars partials (https://www.npmjs.com/package/hbs)
hbs.registerPartials(path.join(__dirname, 'app_server', 'views/partials')); 


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/travel', travelRouter); 
app.use('/index', indexRouter); 
app.use('/contact', ContactRouter); 
app.use('/about', AboutRouter); 
app.use('/meals', MealsRouter); 
app.use('/rooms', RoomsRouter);
app.use('/news', NewsRouter);



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
