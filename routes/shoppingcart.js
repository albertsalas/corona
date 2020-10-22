var express = require('express');
var router = express.Router();
const products = require("../controllers/ProductsController.js");
const sc = require("../controllers/searchController.js");


router.get('/', function(req,res, next) {
  res.render('ShoppingCart', {title:'Shopping Cart'});
});

router.patch('/:name', sc.update);

module.exports = router;