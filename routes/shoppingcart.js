const express = require('express');
const router = express.Router();
const products = require("../controllers/ProductsController.js");


router.get('/', function(req,res, next) {
  res.render('ShoppingCart', {title:'Shopping Cart'});
});

// router.patch('/', products.updateQuantity);


module.exports = router;