var express = require('express');
var router = express.Router();


router.get('/', function(req,res, next) {
  res.render('ShoppingCart', {title:'Shopping Cart'});
});

module.exports = router;