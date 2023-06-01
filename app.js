var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var layouts=require('express-ejs-layouts');
var dotenv = require('dotenv');
const session = require ('express-session');

//establishing connectivity
dotenv.config();
const mariadb = require('mariadb/callback'); //calling new package and asking for the package to be part of our application
const db = mariadb.createConnection({host: process.env.DB_HOST,
user: process.env.DB_USER, 
password: process.env.DB_PASSWORD, 
database: process.env.DB_DATABASE,
port: process.env.DB_PORT});
// now after this build above connect to database
db.connect((err) => {
if (err) {
console.log("Unable to connect to database due to error: " + err);
} else {
console.log("Connected to DB");
}
});
global.db=db;//all connections are recognized under db

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var contactRouter = require('./routes/contact');
var aboutRouter = require('./routes/about');
var helpRouter=require('./routes/help');
var privacyRouter=require('./routes/privacy');
var productRouter=require('./routes/product');
var customerRoute=require('./routes/customer');
var employeeRoute=require('./routes/employees');
var locationRouter=require('./routes/locations');
var saleorderRouter=require('./routes/saleorder');
var orderdetailRouter=require('./routes/orderdetail');
var supplierRoute=require('./routes/supplier');
var reviewRoute=require('./routes/review');
var policiesRoute=require('./routes/policies');
var searchRoute=require('./routes/search');
var promotionRouter=require('./routes/promotion');
var reportRouter = require("./routes/report");
var catalogRouter = require('./routes/catalog.js');

var app = express();

app.use(session({secret: 'stockshopsecret'})); //instead of hardcoding the name you could use a token that would add extra security
app.use(function(req,res,next){//taking the request session object so that we can reference the session variables
res.locals.session = req.session;
next();
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(layouts);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/contact', contactRouter);
app.use('/about', aboutRouter);
app.use('/help',helpRouter);
app.use('/privacy',privacyRouter);
app.use('/product',productRouter);
app.use('/customer', customerRoute);
app.use('/employees', employeeRoute);
app.use('/locations',locationRouter);
app.use('/saleorder', saleorderRouter);
app.use('/orderdetail', orderdetailRouter);
app.use('/supplier', supplierRoute);
app.use('/review', reviewRoute);
app.use('/policies', policiesRoute);
app.use('/search', searchRoute);
app.use('/promotion', promotionRouter);
app.use('/report', reportRouter);
app.use('/catalog', catalogRouter);


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
