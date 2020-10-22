const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
// setup DB environment variables
const dotenv = require("dotenv");
dotenv.config();

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/UsersRouter');
const productsRouter = require('./routes/ProductsRouter');
const productDetailsRouter = require('./routes/productDetails');
const shoppingCartRouter = require('./routes/shoppingcart');
const registerRouter = require('./routes/register');
const loginRouter = require('./routes/login');
const app = express();

// view engine setup
app.set("view engine", "ejs");
app.set('views', path.join(__dirname, 'views'));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));


app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/products', productsRouter);
app.use('/productDetails', productDetailsRouter);
app.use('/shoppingcart', shoppingCartRouter);
app.use('/register', registerRouter);
app.use('/login', loginRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
