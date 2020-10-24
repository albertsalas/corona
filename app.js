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
const ordersRouter = require('./routes/OrdersRouter');
const productDetailsRouter = require('./routes/productDetails');
const shoppingCartRouter = require('./routes/shoppingcart');
const registerRouter = require('./routes/register');
const errorRouter = require('./routes/error');
const app = express();

// view engine setup
app.set("view engine", "ejs");
app.set('views', path.join(__dirname, 'views'));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
    secret: 'secret-key',
    path: '/',
    resave: false,
    saveUninitialized: true,
}));

app.use(function (req, res, next) {
    res.locals.loggedin = req.session.loggedin;
    res.locals.username = req.session.username;
    next();
});

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/products', productsRouter);
app.use('/orders', ordersRouter);
app.use('/productDetails', productDetailsRouter);
app.use('/shoppingcart', shoppingCartRouter);
app.use('/register', registerRouter);
app.use('/error', errorRouter);

module.exports = app;
